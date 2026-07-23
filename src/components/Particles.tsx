"use client";

import { Sparkles } from "@react-three/drei";

interface ParticlesProps {
  isMobile?: boolean;
}

export function Particles({ isMobile = false }: ParticlesProps) {
  return (
    <group>
      {/* Brand Red Floating Light Particles */}
      <Sparkles
        count={isMobile ? 25 : 80}
        scale={[12, 8, 12]}
        size={isMobile ? 2.5 : 3.8}
        speed={0.4}
        opacity={0.65}
        color="#D91E26"
      />

      {/* Brand Blue Atmospheric Dust */}
      <Sparkles
        count={isMobile ? 25 : 80}
        scale={[12, 8, 12]}
        size={isMobile ? 2.5 : 3.8}
        speed={0.4}
        opacity={0.65}
        color="#1E56B4"
      />

      {/* Ambient Metallic Ember Sparks */}
      <Sparkles
        count={isMobile ? 30 : 110}
        scale={[16, 10, 16]}
        size={isMobile ? 1.5 : 2.2}
        speed={0.25}
        opacity={0.45}
        color="#C7CDD3"
      />
    </group>
  );
}
