"use client";

import { useMemo } from "react";
import * as THREE from "three";

interface BarbellProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function Barbell({ position = [0, 0.45, 0], rotation = [0, 0, 0] }: BarbellProps) {
  // PBR Materials
  const chromeShaftMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#D4D8DD",
        metalness: 0.95,
        roughness: 0.15,
        envMapIntensity: 2.5,
      }),
    []
  );

  const sleeveMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#A0A8B0",
        metalness: 0.9,
        roughness: 0.25,
      }),
    []
  );

  const redPlateMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#D91E26",
        metalness: 0.3,
        roughness: 0.2,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
      }),
    []
  );

  const bluePlateMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1E56B4",
        metalness: 0.75,
        roughness: 0.25,
      }),
    []
  );

  const collarClampMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1B1E23",
        metalness: 0.5,
        roughness: 0.4,
      }),
    []
  );

  return (
    <group position={position} rotation={rotation}>
      {/* 2.2m Main Olympic Barbell Shaft */}
      <mesh castShadow receiveShadow material={chromeShaftMaterial} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.028, 0.028, 2.2, 32]} />
      </mesh>

      {/* Left Revolving Sleeve Base */}
      <mesh castShadow receiveShadow material={sleeveMaterial} position={[-0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.42, 32]} />
      </mesh>

      {/* Right Revolving Sleeve Base */}
      <mesh castShadow receiveShadow material={sleeveMaterial} position={[0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.42, 32]} />
      </mesh>

      {/* LEFT WEIGHT STACK */}
      {/* Outer 25kg Red Bumper Plate */}
      <mesh castShadow receiveShadow material={redPlateMaterial} position={[-0.78, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.45, 0.45, 0.06, 64]} />
      </mesh>
      {/* Inner 20kg Blue Bumper Plate */}
      <mesh castShadow receiveShadow material={bluePlateMaterial} position={[-0.85, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.42, 0.42, 0.055, 64]} />
      </mesh>
      {/* 15kg Red Bumper Plate */}
      <mesh castShadow receiveShadow material={redPlateMaterial} position={[-0.91, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.38, 0.38, 0.05, 64]} />
      </mesh>
      {/* Locking Collar Clamp */}
      <mesh castShadow receiveShadow material={collarClampMaterial} position={[-0.95, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 0.03, 32]} />
      </mesh>

      {/* RIGHT WEIGHT STACK */}
      {/* Outer 25kg Red Bumper Plate */}
      <mesh castShadow receiveShadow material={redPlateMaterial} position={[0.78, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.45, 0.45, 0.06, 64]} />
      </mesh>
      {/* Inner 20kg Blue Bumper Plate */}
      <mesh castShadow receiveShadow material={bluePlateMaterial} position={[0.85, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.42, 0.42, 0.055, 64]} />
      </mesh>
      {/* 15kg Red Bumper Plate */}
      <mesh castShadow receiveShadow material={redPlateMaterial} position={[0.91, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.38, 0.38, 0.05, 64]} />
      </mesh>
      {/* Locking Collar Clamp */}
      <mesh castShadow receiveShadow material={collarClampMaterial} position={[0.95, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 0.03, 32]} />
      </mesh>
    </group>
  );
}
