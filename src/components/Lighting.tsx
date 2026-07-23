"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

interface LightingProps {
  isMobile?: boolean;
}

export function Lighting({ isMobile = false }: LightingProps) {
  const redSpotRef = useRef<THREE.SpotLight>(null);
  const blueSpotRef = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    if (isMobile) return;
    const t = state.clock.getElapsedTime();
    if (redSpotRef.current) {
      redSpotRef.current.position.x = Math.sin(t * 0.4) * 4 - 2;
      redSpotRef.current.position.y = 5 + Math.cos(t * 0.2) * 1;
    }
    if (blueSpotRef.current) {
      blueSpotRef.current.position.x = Math.cos(t * 0.3) * 4 + 2;
      blueSpotRef.current.position.y = 5 + Math.sin(t * 0.3) * 1;
    }
  });

  return (
    <>
      {/* Studio HDRI Environment reflections */}
      <Environment preset="studio" environmentIntensity={0.8} />

      {/* Atmospheric Fog */}
      <fog attach="fog" args={["#07080b", 4, 20]} />

      {/* Base Industrial Ambient Light */}
      <ambientLight intensity={0.45} />

      {/* Key Overhead Directional Light with Shadow Casting */}
      <directionalLight
        position={[4, 8, 4]}
        intensity={2.2}
        castShadow={!isMobile}
        shadow-mapSize-width={isMobile ? 512 : 2048}
        shadow-mapSize-height={isMobile ? 512 : 2048}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0005}
      />

      {/* Rim Light for Athlete Silhouette */}
      <directionalLight position={[0, 4, -6]} intensity={1.5} color="#C7CDD3" />

      {/* Red Volumetric Spotlight */}
      <spotLight
        ref={redSpotRef}
        position={[-5, 6, 3]}
        target-position={[0, 0.5, 0]}
        intensity={isMobile ? 8 : 14}
        color="#D91E26"
        angle={0.55}
        penumbra={0.8}
        distance={22}
        castShadow={!isMobile}
      />

      {/* Blue Volumetric Spotlight */}
      <spotLight
        ref={blueSpotRef}
        position={[5, 6, 3]}
        target-position={[0, 0.5, 0]}
        intensity={isMobile ? 8 : 14}
        color="#1E56B4"
        angle={0.55}
        penumbra={0.8}
        distance={22}
        castShadow={!isMobile}
      />
    </>
  );
}
