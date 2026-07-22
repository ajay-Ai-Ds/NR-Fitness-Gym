"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Sparkles, Float } from "@react-three/drei";
import { WeightPlate } from "./WeightPlate";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

function CameraController() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 12);
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    tl.to(camera.position, {
      z: -2,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [camera]);

  return null;
}

function MovingLightBeams({ isLowPower }: { isLowPower: boolean }) {
  const redSpotRef = useRef<THREE.SpotLight>(null);
  const blueSpotRef = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    if (isLowPower) return; // Skip per-frame spotlight updates on low power mobile
    const t = state.clock.getElapsedTime();
    if (redSpotRef.current) {
      redSpotRef.current.position.x = Math.sin(t * 0.5) * 6 - 3;
      redSpotRef.current.position.y = Math.cos(t * 0.3) * 4 + 2;
    }
    if (blueSpotRef.current) {
      blueSpotRef.current.position.x = Math.cos(t * 0.4) * 6 + 3;
      blueSpotRef.current.position.y = Math.sin(t * 0.6) * 4 - 2;
    }
  });

  return (
    <>
      <spotLight
        ref={redSpotRef}
        position={[-6, 6, 4]}
        intensity={isLowPower ? 6 : 12}
        color="#D91E26"
        angle={0.6}
        penumbra={0.9}
        distance={25}
      />
      <spotLight
        ref={blueSpotRef}
        position={[6, -6, 4]}
        intensity={isLowPower ? 6 : 12}
        color="#1E56B4"
        angle={0.6}
        penumbra={0.9}
        distance={25}
      />
    </>
  );
}

export default function HeroCanvas() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkLowPower = () => {
      const isMobileDevice = window.innerWidth < 768 || (typeof navigator !== "undefined" && navigator.hardwareConcurrency <= 4);
      setIsMobile(isMobileDevice);
    };
    checkLowPower();
    window.addEventListener("resize", checkLowPower);
    return () => window.removeEventListener("resize", checkLowPower);
  }, []);

  return (
    <Canvas
      shadows={!isMobile}
      dpr={isMobile ? [1, 1] : [1, 2]}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
    >
      <fog attach="fog" args={["#08060a", 5, 22]} />
      
      <Environment preset="studio" />
      <ambientLight intensity={0.35} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={2} 
        castShadow={!isMobile} 
        shadow-mapSize-width={isMobile ? 256 : 1024} 
        shadow-mapSize-height={isMobile ? 256 : 1024} 
      />

      <MovingLightBeams isLowPower={isMobile} />
      <CameraController />

      <Float speed={isMobile ? 1 : 2} rotationIntensity={0.2} floatIntensity={0.5}>
        <WeightPlate />
      </Float>

      {/* Optimized particle counts for mobile to prevent main thread blocking */}
      <Sparkles count={isMobile ? 25 : 90} scale={14} size={isMobile ? 2.5 : 3.5} speed={0.5} opacity={0.7} color="#D91E26" />
      <Sparkles count={isMobile ? 25 : 90} scale={14} size={isMobile ? 2.5 : 3.5} speed={0.5} opacity={0.7} color="#1E56B4" />
      <Sparkles count={isMobile ? 30 : 120} scale={18} size={2} speed={0.3} opacity={0.4} color="#C7CDD3" />
    </Canvas>
  );
}
