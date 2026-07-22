"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function WeightPlate() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slow rotation for ambient feel
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Red Ring (Glossy) */}
      <mesh castShadow receiveShadow>
        <torusGeometry args={[3, 1, 64, 100]} />
        <meshPhysicalMaterial
          color="#D91E26"
          metalness={0.2}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={2}
        />
      </mesh>

      {/* Inner Blue Center (Metallic) */}
      <mesh castShadow receiveShadow>
        {/* We use a cylinder with a hole, but since standard cylinder doesn't have a hole, 
            we can use a Torus with a larger tube and smaller radius to fill the gap, 
            or a RingGeometry, or ShapeGeometry. Let's use a Tube or just a flattened Cylinder for the inner part,
            with the hole being handled by just another smaller Torus or empty space.
            Wait, Torus with args [radius, tube, radialSegments, tubularSegments]
            Radius = 1.5, tube = 1 -> inner radius = 0.5. Outer radius = 2.5 (matches red ring inner radius ~2) */}
        <torusGeometry args={[1.6, 0.8, 32, 64]} />
        <meshStandardMaterial
          color="#1E56B4"
          metalness={0.8}
          roughness={0.3}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Center Chrome Hub */}
      <mesh castShadow receiveShadow>
        <torusGeometry args={[0.6, 0.2, 32, 64]} />
        <meshStandardMaterial
          color="#C7CDD3"
          metalness={1}
          roughness={0.1}
          envMapIntensity={3}
        />
      </mesh>

      {/* Plate Details / Cutouts (Fake them with smaller shapes or leave simple for now) */}
      <mesh position={[0, 2.2, 0]}>
        <boxGeometry args={[1, 0.5, 1.1]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
      <mesh position={[0, -2.2, 0]}>
        <boxGeometry args={[1, 0.5, 1.1]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
      <mesh position={[2.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[1, 0.5, 1.1]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
      <mesh position={[-2.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[1, 0.5, 1.1]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
    </group>
  );
}
