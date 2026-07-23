"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Text } from "@react-three/drei";
import * as THREE from "three";
import { Barbell } from "./Barbell";

interface DeadliftCharacterProps {
  progress?: number; // 0.0 to 1.0
  opacity?: number;
}

export function DeadliftCharacter({ progress = 0, opacity = 1 }: DeadliftCharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hasGlb, setHasGlb] = useState<boolean>(false);
  const [animLoaded, setAnimLoaded] = useState<boolean>(false);

  // Attempt to load GLB model with animations
  let gltf: any = null;
  try {
    gltf = useGLTF("/models/athlete_deadlift.glb", true);
  } catch {
    gltf = null;
  }

  const { actions, names, mixer } = useAnimations(gltf ? gltf.animations : [], groupRef);

  useEffect(() => {
    if (gltf && gltf.scene && names.length > 0) {
      setHasGlb(true);
      const actionName = names[0];
      const action = actions[actionName];
      if (action) {
        action.play();
        action.paused = true; // Controlled manually via scroll progress
        setAnimLoaded(true);
      }
    }
  }, [gltf, names, actions]);

  // Scrub animation frame based on progress
  useFrame(() => {
    if (hasGlb && animLoaded && mixer && names.length > 0) {
      const actionName = names[0];
      const action = actions[actionName];
      if (action) {
        const clipDuration = action.getClip().duration;
        mixer.setTime(Math.max(0, Math.min(1, progress)) * clipDuration);
      }
    }
  });

  // Calculate Barbell Y position synced to deadlift progress
  // Ground height = 0.23m (barbell weight plate rest), Lockout height = 0.92m
  const barbellY = useMemo(() => {
    // Smooth ease for deadlift pull trajectory
    const p = Math.max(0, Math.min(1, progress));
    const pullEase = p < 0.2 ? 0 : (p - 0.2) / 0.8;
    return 0.23 + Math.pow(pullEase, 1.2) * 0.69;
  }, [progress]);

  // Procedural Athletic Mannequin Fallback (if GLB model is not provided in /models/athlete_deadlift.glb)
  // Procedural joints interpolate position from setup hip hinge -> lockout extension
  const hipY = useMemo(() => 0.5 + Math.max(0, (progress - 0.2) / 0.8) * 0.45, [progress]);
  const spineAngle = useMemo(() => -0.8 + Math.max(0, (progress - 0.2) / 0.8) * 0.8, [progress]);

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {hasGlb ? (
        /* Real Rigged GLB Humanoid Athlete */
        <primitive object={gltf.scene} castShadow receiveShadow />
      ) : (
        /* 
           FALLBACK ARCHITECTURE:
           Displays loaded Olympic barbell & procedural high-detail athlete frame,
           with non-intrusive 3D text indicator that GLB pipeline is ready for drop-in.
        */
        <group>
          {/* Olympic Loaded Barbell attached to motion curve */}
          <Barbell position={[0, barbellY, 0.4]} />

          {/* Procedural High-Detail Athletic Silhouette Mannequin */}
          <group position={[0, hipY, 0]}>
            {/* Pelvic Core */}
            <mesh castShadow position={[0, 0, 0]}>
              <boxGeometry args={[0.34, 0.2, 0.22]} />
              <meshStandardMaterial color="#1B1E23" roughness={0.4} metalness={0.6} />
            </mesh>

            {/* Spine & Torso (Rotates as hip extends) */}
            <group rotation={[spineAngle, 0, 0]}>
              {/* Torso Chest */}
              <mesh castShadow position={[0, 0.35, 0]}>
                <boxGeometry args={[0.42, 0.45, 0.28]} />
                <meshStandardMaterial color="#D91E26" roughness={0.3} metalness={0.7} />
              </mesh>
              {/* Head & Neck */}
              <mesh castShadow position={[0, 0.7, 0.05]}>
                <sphereGeometry args={[0.13, 24, 24]} />
                <meshStandardMaterial color="#C7CDD3" roughness={0.2} metalness={0.9} />
              </mesh>
              {/* Arms extending to barbell */}
              {[-0.26, 0.26].map((x, i) => (
                <mesh key={`arm-${i}`} castShadow position={[x, 0.05, 0.2]}>
                  <cylinderGeometry args={[0.045, 0.04, 0.65, 16]} />
                  <meshStandardMaterial color="#1E56B4" roughness={0.3} metalness={0.7} />
                </mesh>
              ))}
            </group>
          </group>

          {/* Clearly mark missing asset pipeline indicator */}
          <Text
            position={[0, 2.2, 0]}
            fontSize={0.16}
            color="#D91E26"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff"
          >
            [ ATHLETE GLB PIPELINE READY: Drop athlete_deadlift.glb into /public/models/ ]
          </Text>
        </group>
      )}
    </group>
  );
}

// Preload GLB if present
try {
  useGLTF.preload("/models/athlete_deadlift.glb");
} catch {
  // Graceful fallback
}
