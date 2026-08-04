"use client";

import { Canvas } from "@react-three/fiber";
import {
  Float,
  Icosahedron,
  MeshDistortMaterial,
  Stars,
} from "@react-three/drei";

interface Props {
  accent?: string;
  glow?: string;
}

/**
 * Khối 3D biến dạng trôi bồng bềnh giữa dải sao — điểm nhấn "immersive"
 * cho hero. Được nạp động (ssr:false) nên không ảnh hưởng tải trang đầu.
 */
export default function HeroScene({ accent = "#6366f1", glow = "#818cf8" }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1.2} />
      <pointLight position={[-4, -2, -2]} intensity={2.4} color={glow} />
      <Stars radius={40} depth={30} count={1400} factor={3} fade speed={1} />
      <Float speed={1.6} rotationIntensity={1.1} floatIntensity={1.4}>
        <Icosahedron args={[1.45, 8]}>
          <MeshDistortMaterial
            color={accent}
            emissive={glow}
            emissiveIntensity={0.25}
            roughness={0.22}
            metalness={0.45}
            distort={0.36}
            speed={1.5}
          />
        </Icosahedron>
      </Float>
    </Canvas>
  );
}
