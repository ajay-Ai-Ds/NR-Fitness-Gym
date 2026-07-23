"use client";

import { useMemo } from "react";
import * as THREE from "three";

interface GymEnvironmentProps {
  opacity?: number;
}

export function GymEnvironment({ opacity = 1 }: GymEnvironmentProps) {
  // Industrial Rubber Mat Floor Material
  const floorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0c0e12"),
        roughness: 0.7,
        metalness: 0.2,
        transparent: true,
        opacity: opacity,
      }),
    [opacity]
  );

  // Steel Rack Structural Material (Matte Powdercoat Steel)
  const steelRackMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a1d24"),
        roughness: 0.35,
        metalness: 0.85,
        transparent: true,
        opacity: opacity,
      }),
    [opacity]
  );

  // Metallic Chrome Safety Bars Material
  const chromeRackMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#B0B8C0"),
        roughness: 0.15,
        metalness: 0.95,
        transparent: true,
        opacity: opacity,
      }),
    [opacity]
  );

  // Gym Platform Perimeter Edging (Red Accent Steel Trim)
  const redTrimMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#D91E26"),
        roughness: 0.3,
        metalness: 0.6,
        transparent: true,
        opacity: opacity,
      }),
    [opacity]
  );

  if (opacity <= 0.01) return null;

  return (
    <group>
      {/* Heavy Rubber Gym Floor (20m x 20m) */}
      <mesh receiveShadow material={floorMaterial} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 24]} />
      </mesh>

      {/* Deadlift Lifting Platform Border Frame (Wood/Rubber Composite) */}
      <mesh receiveShadow material={redTrimMaterial} position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 3.2]} />
      </mesh>

      <mesh receiveShadow material={floorMaterial} position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.0, 3.0]} />
      </mesh>

      {/* Heavy Industrial Power Rack System (Background) */}
      <group position={[0, 0, -2.5]}>
        {/* Main Steel Vertical Pillars (4 Uprights) */}
        {[-1.2, 1.2].map((x) =>
          [-0.8, 0.8].map((z) => (
            <mesh key={`post-${x}-${z}`} castShadow receiveShadow material={steelRackMaterial} position={[x, 1.4, z]}>
              <boxGeometry args={[0.12, 2.8, 0.12]} />
            </mesh>
          ))
        )}

        {/* Top Crossbeams */}
        <mesh castShadow receiveShadow material={steelRackMaterial} position={[0, 2.75, -0.8]}>
          <boxGeometry args={[2.5, 0.1, 0.1]} />
        </mesh>
        <mesh castShadow receiveShadow material={steelRackMaterial} position={[0, 2.75, 0.8]}>
          <boxGeometry args={[2.5, 0.1, 0.1]} />
        </mesh>

        {/* Pull-Up Multi-Grip Bar */}
        <mesh castShadow receiveShadow material={chromeRackMaterial} position={[0, 2.7, 0.8]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, 2.3, 32]} />
        </mesh>

        {/* Horizontal Safety Arms */}
        {[-1.2, 1.2].map((x, i) => (
          <mesh key={`safety-${i}`} castShadow receiveShadow material={chromeRackMaterial} position={[x, 0.7, 0]}>
            <boxGeometry args={[0.08, 0.08, 1.6]} />
          </mesh>
        ))}
      </group>

      {/* Left Wall Storage Racks & Plates */}
      <group position={[-4.5, 1.2, -1]}>
        <mesh castShadow material={steelRackMaterial} position={[0, 0, 0]}>
          <boxGeometry args={[0.1, 2.4, 1.5]} />
        </mesh>
      </group>

      {/* Right Wall Storage Racks */}
      <group position={[4.5, 1.2, -1]}>
        <mesh castShadow material={steelRackMaterial} position={[0, 0, 0]}>
          <boxGeometry args={[0.1, 2.4, 1.5]} />
        </mesh>
      </group>
    </group>
  );
}
