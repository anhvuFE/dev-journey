"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// Tỉ lệ khối & bán kính hình cầu bao (bất biến khi xoay) — để fit camera.
const SCALE = 0.82;
// bán kính cầu bao = (nửa cạnh khối) * căn 3, nhân scale và thêm 12% lề
const FIT_RADIUS = 1.485 * Math.sqrt(3) * SCALE * 1.12;

/** Tự đặt camera sao cho hình cầu bao khối luôn nằm trọn trong canvas,
 *  kể cả khi canvas dạng đứng (chiều ngang hẹp). Tính lại khi resize. */
function FitView({ radius }: { radius: number }) {
  const { camera, size } = useThree();
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const vFov = THREE.MathUtils.degToRad(cam.fov);
    const aspect = size.width / Math.max(size.height, 1);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
    const fovMin = Math.min(vFov, hFov); // chiều bị hạn chế nhất
    const dist = radius / Math.sin(fovMin / 2);
    cam.position.set(0, 0, dist);
    cam.near = 0.1;
    cam.far = dist + radius * 4;
    cam.updateProjectionMatrix();
  }, [camera, size, radius]);
  return null;
}

// Màu 6 mặt Rubik
const FACE = {
  px: "#e5352b", nx: "#ff7a1a", py: "#f5f5f0",
  ny: "#ffd23f", pz: "#2fbf5f", nz: "#2f6bff",
};

type Axis = "x" | "y" | "z";
interface Move { axis: Axis; layer: number; dir: number }

const AXES: Record<Axis, THREE.Vector3> = {
  x: new THREE.Vector3(1, 0, 0),
  y: new THREE.Vector3(0, 1, 0),
  z: new THREE.Vector3(0, 0, 1),
};
const MOVE_DUR = 0.26; // giây / một lượt xoay lớp
const REST = 2.4; // nghỉ trước khi xáo lại

function stickers(x: number, y: number, z: number) {
  const off = 0.49;
  const s: { p: [number, number, number]; r: [number, number, number]; c: string }[] = [];
  if (x === 1) s.push({ p: [off, 0, 0], r: [0, Math.PI / 2, 0], c: FACE.px });
  if (x === -1) s.push({ p: [-off, 0, 0], r: [0, -Math.PI / 2, 0], c: FACE.nx });
  if (y === 1) s.push({ p: [0, off, 0], r: [-Math.PI / 2, 0, 0], c: FACE.py });
  if (y === -1) s.push({ p: [0, -off, 0], r: [Math.PI / 2, 0, 0], c: FACE.ny });
  if (z === 1) s.push({ p: [0, 0, off], r: [0, 0, 0], c: FACE.pz });
  if (z === -1) s.push({ p: [0, 0, -off], r: [0, Math.PI, 0], c: FACE.nz });
  return s;
}

const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

function randomMoves(n: number, seedStart: number): Move[] {
  const axes: Axis[] = ["x", "y", "z"];
  const out: Move[] = [];
  for (let i = 0; i < n; i++) {
    const r = Math.abs(Math.sin((seedStart + i) * 12.9898) * 43758.5453);
    const axis = axes[Math.floor(r * 3) % 3];
    const layer = (Math.floor(r * 10) % 3) - 1;
    const dir = Math.floor(r * 100) % 2 === 0 ? 1 : -1;
    out.push({ axis, layer, dir });
  }
  return out;
}

function Rubik({ accent }: { accent: string }) {
  const root = useRef<THREE.Group>(null);
  const refs = useRef<(THREE.Group | null)[]>([]);

  const cubies = useMemo(() => {
    const list: [number, number, number][] = [];
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) list.push([x, y, z]);
    return list;
  }, []);

  const st = useRef({
    inited: false,
    reduce: false,
    phase: "solving" as "solving" | "rest",
    queue: [] as Move[],
    mi: 0,
    moving: false,
    t: 0,
    restT: 0,
    round: 0,
    axisV: new THREE.Vector3(),
    dir: 1,
    starts: [] as { g: THREE.Group; pos: THREE.Vector3; quat: THREE.Quaternion }[],
  });

  const applyInstant = (m: Move) => {
    const axisV = AXES[m.axis];
    const angle = (m.dir * Math.PI) / 2;
    const q = new THREE.Quaternion().setFromAxisAngle(axisV, angle);
    refs.current.forEach((g) => {
      if (!g) return;
      if (Math.round(g.position.getComponent("xyz".indexOf(m.axis))) !== m.layer) return;
      g.position.applyAxisAngle(axisV, angle);
      g.position.set(
        Math.round(g.position.x),
        Math.round(g.position.y),
        Math.round(g.position.z),
      );
      g.quaternion.premultiply(q);
    });
  };

  const startMove = (m: Move) => {
    const s = st.current;
    s.axisV = AXES[m.axis];
    s.dir = m.dir;
    s.t = 0;
    s.moving = true;
    const idx = "xyz".indexOf(m.axis);
    s.starts = [];
    refs.current.forEach((g) => {
      if (!g) return;
      if (Math.round(g.position.getComponent(idx)) !== m.layer) return;
      s.starts.push({
        g,
        pos: g.position.clone(),
        quat: g.quaternion.clone(),
      });
    });
  };

  useFrame((state, delta) => {
    const s = st.current;
    const dt = Math.min(delta, 0.05);

    // Khởi tạo: xáo tức thì rồi dựng hàng đợi giải (đảo ngược scramble)
    if (!s.inited) {
      s.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!s.reduce) {
        const scr = randomMoves(20, 1);
        scr.forEach(applyInstant);
        s.queue = scr
          .slice()
          .reverse()
          .map((m) => ({ ...m, dir: -m.dir }));
      }
      s.inited = true;
    }

    // Giữ hướng 3/4 ổn định, chỉ nghiêng nhẹ theo chuột.
    // (KHÔNG tự xoay tròn -> khối không còn "phình/thu" theo góc nhìn)
    if (root.current) {
      root.current.rotation.x = THREE.MathUtils.lerp(
        root.current.rotation.x,
        0.35 + state.pointer.y * 0.22,
        0.05,
      );
      root.current.rotation.y = THREE.MathUtils.lerp(
        root.current.rotation.y,
        0.6 + state.pointer.x * 0.35,
        0.05,
      );
    }

    if (s.reduce) return;

    if (s.phase === "solving") {
      if (!s.moving) {
        if (s.mi < s.queue.length) {
          startMove(s.queue[s.mi]);
        } else {
          s.phase = "rest";
          s.restT = 0;
        }
      } else {
        s.t += dt / MOVE_DUR;
        const done = s.t >= 1;
        const e = easeInOut(Math.min(s.t, 1));
        const theta = s.dir * (Math.PI / 2) * e;
        const q = new THREE.Quaternion();
        s.starts.forEach(({ g, pos, quat }) => {
          g.position.copy(pos).applyAxisAngle(s.axisV, theta);
          q.setFromAxisAngle(s.axisV, theta);
          g.quaternion.copy(q).multiply(quat);
        });
        if (done) {
          // chốt vị trí về số nguyên
          s.starts.forEach(({ g }) => {
            g.position.set(
              Math.round(g.position.x),
              Math.round(g.position.y),
              Math.round(g.position.z),
            );
          });
          s.moving = false;
          s.mi += 1;
        }
      }
    } else {
      s.restT += dt;
      if (s.restT > REST) {
        s.round += 1;
        const scr = randomMoves(20, s.round * 50 + 3);
        scr.forEach(applyInstant);
        s.queue = scr
          .slice()
          .reverse()
          .map((m) => ({ ...m, dir: -m.dir }));
        s.mi = 0;
        s.phase = "solving";
      }
    }
  });

  return (
    <group ref={root} scale={SCALE} rotation={[0.32, 0.6, 0]}>
      {cubies.map(([x, y, z], i) => (
        <group
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={[x, y, z]}
        >
          <RoundedBox args={[0.97, 0.97, 0.97]} radius={0.04} smoothness={3}>
            <meshStandardMaterial color="#0b0b0b" metalness={0.4} roughness={0.5} />
          </RoundedBox>
          {stickers(x, y, z).map((sk, j) => (
            <mesh key={j} position={sk.p} rotation={sk.r}>
              <planeGeometry args={[0.86, 0.86]} />
              <meshStandardMaterial color={sk.c} roughness={0.35} metalness={0.1} />
            </mesh>
          ))}
        </group>
      ))}
      <pointLight position={[-3, -2, 3]} intensity={40} color={accent} />
    </group>
  );
}

export default function HeroScene({ accent = "#c6ff3d" }: { accent?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    // Tạm dừng render 3D khi hero cuộn khuất -> tiết kiệm GPU
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), {
      threshold: 0.02,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <FitView radius={FIT_RADIUS} />
        <ambientLight intensity={0.75} />
        <directionalLight position={[5, 6, 4]} intensity={2.2} />
        <directionalLight position={[-4, -2, -3]} intensity={0.8} />
        <Rubik accent={accent} />
      </Canvas>
    </div>
  );
}
