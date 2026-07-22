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
    
    // We animate the camera's Z position to fly through the center hole (Z approaches 0 or negative)
    // The hole has a radius of 0.4 based on the torus geometries, so the camera must pass exactly through the center.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing
      },
    });

    tl.to(camera.position, {
      z: -2, // Fly through the hole (0 is center of plate)
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [camera]);

  return null;
}

export function HeroSection() {
  return (
    <section className="relative bg-[#050505]">
      {/* 
        This container defines the scrollable height. 
        As the user scrolls through this 300vh container, the camera moves.
      */}
      <div id="hero-scroll-container" className="h-[300vh] w-full">
        {/* Sticky container for the Canvas and UI */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          
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
              className="text-center px-4"
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: "easeOut" } }
                }}
                className="relative inline-block"
              >
                {/* Text Red Glow Background */}
                <div className="absolute inset-0 bg-[#D91E26] blur-[60px] opacity-40 rounded-full scale-150 -z-10" />
                <h1 
                  className="text-6xl md:text-9xl font-extrabold tracking-tight mb-4 drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #ffffff 0%, #C7CDD3 40%, #888888 50%, #ffffff 60%, #C7CDD3 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    WebkitTextStroke: "1px rgba(255,255,255,0.1)",
                  }}
                >
                  NR GYM
                </h1>
              </motion.div>

              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="text-lg md:text-2xl text-[#C7CDD3] tracking-[0.2em] uppercase mb-12 font-medium"
              >
                Transform Your Body <span className="text-[#D91E26] mx-2 drop-shadow-[0_0_8px_rgba(217,30,38,1)]">/</span> 
                Forge Your Strength <span className="text-[#D91E26] mx-2 drop-shadow-[0_0_8px_rgba(217,30,38,1)]">/</span> 
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
                  className="relative overflow-hidden group bg-gradient-to-b from-[#D91E26] to-[#901419] px-10 py-5 rounded-sm shadow-[0_0_20px_rgba(217,30,38,0.5)] hover:shadow-[0_0_40px_rgba(217,30,38,0.9)] transition-all duration-300 transform hover:-translate-y-1 inline-block text-center cursor-pointer"
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
                  className="relative overflow-hidden group px-10 py-5 rounded-sm border border-[#C7CDD3]/30 bg-gradient-to-b from-[#2A2A2A]/50 to-[#050505]/80 backdrop-blur-md hover:border-[#C7CDD3] transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_15px_rgba(199,205,211,0.1)] hover:shadow-[0_0_25px_rgba(199,205,211,0.3)] inline-block text-center cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <span className="relative z-10 text-[#C7CDD3] group-hover:text-white tracking-[0.1em] uppercase font-bold transition-colors duration-300">
                    View Membership
                  </span>
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* 3D Canvas */}
          <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
            <color attach="background" args={["#050505"]} />
            <fog attach="fog" args={["#050505", 5, 20]} />
            
            {/* Environment and Lighting */}
            <Environment preset="studio" />
            <ambientLight intensity={0.2} />
            <directionalLight 
              position={[5, 5, 5]} 
              intensity={2} 
              castShadow 
              shadow-mapSize-width={1024} 
              shadow-mapSize-height={1024} 
            />
            <spotLight position={[-5, 5, -5]} intensity={5} color="#D91E26" angle={0.5} penumbra={1} />
            <spotLight position={[5, -5, -5]} intensity={5} color="#1E56B4" angle={0.5} penumbra={1} />

            <CameraController />

            {/* Central object */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
              <WeightPlate />
            </Float>

            {/* Ambient particles (sparks/dust) */}
            <Sparkles count={150} scale={15} size={2} speed={0.4} opacity={0.3} color="#C7CDD3" />
            <Sparkles count={50} scale={10} size={3} speed={0.8} opacity={0.5} color="#D91E26" />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
