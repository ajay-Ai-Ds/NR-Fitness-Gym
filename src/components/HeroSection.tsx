"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Sparkles, Float } from "@react-three/drei";
import { WeightPlate } from "./WeightPlate";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import * as THREE from "three";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

function CameraController() {
  const { camera } = useThree();

  useEffect(() => {
    // Initial camera position
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

// 4. Light Beams: Animated spot lights creating sweeping god-rays in the fog
function MovingLightBeams() {
  const redSpotRef = useRef<THREE.SpotLight>(null);
  const blueSpotRef = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
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
        intensity={12}
        color="#D91E26"
        angle={0.6}
        penumbra={0.9}
        distance={25}
      />
      <spotLight
        ref={blueSpotRef}
        position={[6, -6, 4]}
        intensity={12}
        color="#1E56B4"
        angle={0.6}
        penumbra={0.9}
        distance={25}
      />
    </>
  );
}

export function HeroSection() {
  return (
    <section className="relative bg-[#050505] overflow-hidden">
      {/* 
        This container defines the scrollable height for the 3D camera flight.
        130vh keeps the transition tight and removes empty gap before About Us.
      */}
      <div id="hero-scroll-container" className="h-[130vh] w-full">
        {/* Sticky container for the Canvas and UI */}
        <div 
          className="sticky top-0 left-0 w-full h-screen overflow-hidden"
          style={{
            // 2. BACKGROUND GRADIENT: Subtle dark radial gradient centered behind plate with faint red/blue tint
            background: "radial-gradient(circle at 50% 50%, #150912 0%, #0a0c16 45%, #050505 100%)",
          }}
        >
          {/* 1. AMBIENT LIGHT BLEED: Soft red & blue radial glows bleeding into space */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Center Red Light Bleed */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-[#D91E26] rounded-full blur-[160px] opacity-25 animate-pulse" />
            {/* Blue Side Bleed */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1E56B4] rounded-full blur-[180px] opacity-20" />
            {/* Ambient Chrome Center Halo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#C7CDD3] rounded-full blur-[130px] opacity-15" />
          </div>

          {/* 4. LIGHT BEAMS OVERLAY: Subtle atmospheric beam sweeps */}
          <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: "linear-gradient(45deg, transparent 40%, rgba(217,30,38,0.15) 50%, transparent 60%), linear-gradient(-45deg, transparent 40%, rgba(30,86,180,0.15) 50%, transparent 60%)",
                backgroundSize: "200% 200%",
                animation: "borderShift 8s ease-in-out infinite",
              }}
            />
          </div>

          {/* UI Layer */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2, delayChildren: 0.8 },
                },
              }}
              className="text-center px-4 relative"
            >
              {/* 5. TEXT AREA GLOW: Multi-layered soft glow halo behind heading & subheading */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-gradient-to-r from-[#D91E26]/30 via-[#1E56B4]/20 to-[#D91E26]/30 blur-[90px] rounded-full -z-10 opacity-70 pointer-events-none animate-pulse" />

              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: "easeOut" } }
                }}
                className="relative inline-block"
              >
                <h1 
                  className="text-6xl md:text-9xl font-extrabold tracking-tight mb-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #ffffff 0%, #C7CDD3 40%, #888888 50%, #ffffff 60%, #C7CDD3 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    WebkitTextStroke: "1px rgba(255,255,255,0.15)",
                  }}
                >
                  NR FITNESS GYM
                </h1>
              </motion.div>

              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="text-lg md:text-2xl text-[#C7CDD3] tracking-[0.2em] uppercase mb-12 font-medium drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]"
              >
                Transform Your Body <span className="text-[#D91E26] mx-2 drop-shadow-[0_0_12px_rgba(217,30,38,1)]">/</span> 
                Forge Your Strength <span className="text-[#D91E26] mx-2 drop-shadow-[0_0_12px_rgba(217,30,38,1)]">/</span> 
                Become Unstoppable
              </motion.p>
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6 pointer-events-auto"
              >
                {/* Join Today CTA with ripple and glow */}
                <a 
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="relative overflow-hidden group bg-gradient-to-b from-[#D91E26] to-[#901419] px-10 py-5 rounded-sm shadow-[0_0_25px_rgba(217,30,38,0.6)] hover:shadow-[0_0_45px_rgba(217,30,38,0.9)] transition-all duration-300 transform hover:-translate-y-1 inline-block text-center cursor-pointer"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.4)_0%,_transparent_60%)] opacity-0 group-hover:opacity-100 scale-[0.5] group-hover:scale-[2] transition-all duration-500 ease-out" />
                  <span className="relative z-10 text-white font-bold tracking-[0.1em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">Join Today</span>
                  {/* Metallic edge highlight */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                </a>
                
                {/* View Membership CTA with metallic border */}
                <a 
                  href="#membership"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("membership")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="relative overflow-hidden group px-10 py-5 rounded-sm border border-[#C7CDD3]/40 bg-gradient-to-b from-[#2A2A2A]/60 to-[#050505]/90 backdrop-blur-md hover:border-[#C7CDD3] transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(199,205,211,0.15)] hover:shadow-[0_0_30px_rgba(199,205,211,0.4)] inline-block text-center cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <span className="relative z-10 text-[#C7CDD3] group-hover:text-white tracking-[0.1em] uppercase font-bold transition-colors duration-300">
                    View Membership
                  </span>
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* 3D Canvas */}
          <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
            <fog attach="fog" args={["#08060a", 5, 22]} />
            
            {/* Environment and Lighting */}
            <Environment preset="studio" />
            <ambientLight intensity={0.35} />
            <directionalLight 
              position={[5, 5, 5]} 
              intensity={2.5} 
              castShadow 
              shadow-mapSize-width={1024} 
              shadow-mapSize-height={1024} 
            />

            {/* 4. LIGHT BEAMS IN 3D: Moving Red & Blue Spotlights illuminating fog */}
            <MovingLightBeams />

            <CameraController />

            {/* Central object - KEEP UNTOUCHED as requested */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
              <WeightPlate />
            </Float>

            {/* 3. FLOATING PARTICLES WITH COLOR: Red, Blue, and Chrome spark/dust layers */}
            {/* Layer A: Red Sparks caught in plate glow */}
            <Sparkles count={90} scale={14} size={3.5} speed={0.7} opacity={0.75} color="#D91E26" />
            {/* Layer B: Metallic Blue Sparks */}
            <Sparkles count={90} scale={14} size={3.5} speed={0.7} opacity={0.75} color="#1E56B4" />
            {/* Layer C: Chrome Steel Dust Particles */}
            <Sparkles count={120} scale={18} size={2} speed={0.4} opacity={0.4} color="#C7CDD3" />
          </Canvas>
        </div>
      </div>
    </section>
  );
}

