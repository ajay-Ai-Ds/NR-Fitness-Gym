"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface WeightPlateProps {
  opacity?: number;
  scale?: number;
  rotationSpeed?: number;
}

export function WeightPlate({ opacity = 1, scale = 1, rotationSpeed = 1 }: WeightPlateProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Attempt to load GLB asset if present in public directory
  let glbModel = null;
  try {
    // Note: useGLTF handles suspension internally if asset exists
    const gltf = useGLTF("/models/weight_plate.glb", true);
    if (gltf && gltf.scene) {
      glbModel = gltf.scene;
    }
  } catch {
    glbModel = null;
  }

  // Materials for procedural fallback
  const redMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#D91E26"),
        metalness: 0.35,
        roughness: 0.15,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: opacity,
        reflectivity: 0.9,
      }),
    [opacity]
  );

  const blueMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1E56B4"),
        metalness: 0.85,
        roughness: 0.25,
        transparent: true,
        opacity: opacity,
      }),
    [opacity]
  );

  const chromeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#C7CDD3"),
        metalness: 0.95,
        roughness: 0.08,
        transparent: true,
        opacity: opacity,
      }),
    [opacity]
  );

  const rubberDarkMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#111317"),
        metalness: 0.1,
        roughness: 0.6,
        transparent: true,
        opacity: opacity,
      }),
    [opacity]
  );

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.4 * rotationSpeed;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15 * rotationSpeed;
    }
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {glbModel ? (
        <primitive object={glbModel.clone()} castShadow receiveShadow />
      ) : (
        /* Realistic PBR Olympic Bumper Weight Plate (High Precision) */
        <group>
          {/* Outer Heavy Rubber Ring */}
          <mesh castShadow receiveShadow material={rubberDarkMaterial}>
            <torusGeometry args={[3.2, 0.4, 32, 96]} />
          </mesh>

          {/* Red Branded Outer Rim */}
          <mesh castShadow receiveShadow material={redMaterial}>
            <torusGeometry args={[2.8, 0.45, 32, 96]} />
          </mesh>

          {/* Blue Metallic Ring Insert */}
          <mesh castShadow receiveShadow material={blueMaterial}>
            <torusGeometry args={[1.9, 0.5, 32, 96]} />
          </mesh>

          {/* Inner Chrome Sleeve Bushing Hub with Precision Hole */}
          <mesh castShadow receiveShadow material={chromeMaterial}>
            <torusGeometry args={[0.95, 0.45, 32, 96]} />
          </mesh>

          {/* Steel Center Collar Rim (Center hole radius ~0.5 units) */}
          <mesh castShadow receiveShadow material={chromeMaterial} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.55, 0.55, 0.9, 48, 1, true]} />
          </mesh>

          {/* Plate Embossed Brand Handles Cutouts */}
          {[-2.2, 2.2].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]} material={rubberDarkMaterial}>
              <boxGeometry args={[0.6, 1.4, 0.8]} />
            </mesh>
          ))}
          {[ -2.2, 2.2].map((y, i) => (
            <mesh key={i} position={[0, y, 0]} material={rubberDarkMaterial}>
              <boxGeometry args={[1.4, 0.6, 0.8]} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}

// Preload GLB if available
try {
  useGLTF.preload("/models/weight_plate.glb");
} catch {
  // Graceful fallback when static GLB not yet present
}
