"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { AnimationController } from "./AnimationController";
import { WeightPlate } from "./WeightPlate";
import { GymEnvironment } from "./GymEnvironment";
import { DeadliftCharacter } from "./DeadliftCharacter";
import { Particles } from "./Particles";
import { Lighting } from "./Lighting";

interface HeroSceneProps {
  scrollProgress: number; // 0.0 to 1.0
}

function SceneContent({ scrollProgress, isMobile }: { scrollProgress: number; isMobile: boolean }) {
  const { camera } = useThree();
  const currentTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Frame update: sync 3D camera & scene parameters to GSAP scroll progress
  useFrame(() => {
    const animState = AnimationController.getFrame(scrollProgress);

    // Smoothly lerp camera position
    camera.position.lerp(animState.cameraPos, 0.2);

    // Smoothly lerp lookAt target
    currentTargetRef.current.lerp(animState.cameraTarget, 0.2);
    camera.lookAt(currentTargetRef.current);

    // Sync FOV if perspective camera
    if ((camera as THREE.PerspectiveCamera).fov) {
      const pCam = camera as THREE.PerspectiveCamera;
      pCam.fov = THREE.MathUtils.lerp(pCam.fov, animState.cameraFov, 0.1);
      pCam.updateProjectionMatrix();
    }
  });

  const animState = AnimationController.getFrame(scrollProgress);

  return (
    <>
      <Lighting isMobile={isMobile} />
      <Particles isMobile={isMobile} />

      {/* 0% -> 40%: Weight Plate sequence */}
      <group position={[0, 0, 0]}>
        <WeightPlate
          opacity={animState.plateOpacity}
          scale={animState.plateScale}
          rotationSpeed={animState.plateRotationSpeed}
        />
      </group>

      {/* 40% -> 100%: Gym Environment & Athlete sequence */}
      <group>
        <GymEnvironment opacity={animState.gymOpacity} />
        <DeadliftCharacter progress={animState.athleteProgress} opacity={animState.gymOpacity} />
      </group>
    </>
  );
}

export default function HeroScene({ scrollProgress }: HeroSceneProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobileDevice =
        window.innerWidth < 768 || (typeof navigator !== "undefined" && navigator.hardwareConcurrency <= 4);
      setIsMobile(mobileDevice);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <Canvas
      shadows={!isMobile}
      dpr={isMobile ? [1, 1] : [1, 2]}
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0, 10], fov: 45 }}
    >
      <SceneContent scrollProgress={scrollProgress} isMobile={isMobile} />
    </Canvas>
  );
}
