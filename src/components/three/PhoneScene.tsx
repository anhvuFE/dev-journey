"use client";

import { Canvas } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";

interface Props {
  accent?: string;
  glow?: string;
}

/** Mockup điện thoại 3D trôi bồng bềnh — điểm nhấn cho chương Mobile. */
export default function PhoneScene({ accent = "#60a5fa", glow = "#818cf8" }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      dpr={[1, 1.8]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 3]} intensity={1.4} />
      <pointLight position={[-4, -2, 2]} intensity={2.2} color={glow} />
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
        <group rotation={[0.12, -0.5, 0]}>
          {/* Thân máy */}
          <RoundedBox args={[2, 4, 0.25]} radius={0.18} smoothness={8}>
            <meshStandardMaterial color="#0b0b10" roughness={0.4} metalness={0.7} />
          </RoundedBox>
          {/* Màn hình phát sáng */}
          <mesh position={[0, 0, 0.14]}>
            <planeGeometry args={[1.7, 3.6]} />
            <meshStandardMaterial
              color={accent}
              emissive={glow}
              emissiveIntensity={0.55}
              roughness={0.2}
            />
          </mesh>
          {/* "Tai thỏ" */}
          <mesh position={[0, 1.55, 0.15]}>
            <boxGeometry args={[0.6, 0.18, 0.02]} />
            <meshStandardMaterial color="#0b0b10" />
          </mesh>
        </group>
      </Float>
    </Canvas>
  );
}
