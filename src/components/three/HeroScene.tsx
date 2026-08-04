"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Sparkles, Stars } from "@react-three/drei";

interface Props {
  accent?: string;
  glow?: string;
}

/**
 * Hero 3D tinh tế: một khối đa diện dạng khung dây mờ trôi nhẹ, hạt sáng
 * lấp lánh và dải sao — tạo chiều sâu "immersive" mà không lấn át nội dung.
 * Nạp động (ssr:false) nên không ảnh hưởng tải trang đầu.
 */
export default function HeroScene({ accent = "#818cf8", glow = "#a855f7" }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />

      {/* Khung dây hình học — cấu trúc tinh tế thay cho quả cầu đặc */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.7}>
        <mesh scale={2.6}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color={accent} wireframe transparent opacity={0.14} />
        </mesh>
      </Float>

      {/* Hạt sáng lấp lánh trôi trong không gian */}
      <Sparkles
        count={140}
        scale={[14, 9, 6]}
        size={2.4}
        speed={0.35}
        color={glow}
        opacity={0.7}
      />

      {/* Dải sao nền */}
      <Stars radius={60} depth={40} count={1200} factor={3} fade speed={0.5} />
    </Canvas>
  );
}
