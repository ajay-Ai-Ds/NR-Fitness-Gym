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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-center px-4"
            >
              <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white drop-shadow-2xl mb-4"
                  style={{
                    WebkitTextStroke: "1px rgba(255,255,255,0.1)",
                    textShadow: "0 0 40px rgba(217,30,38,0.5)"
                  }}
              >
                NR FITNESS GYM
              </h1>
              <p className="text-lg md:text-2xl text-[#C7CDD3] tracking-widest uppercase mb-12 font-medium">
                Transform Your Body <span className="text-[#D91E26] mx-2">/</span> 
                Forge Your Strength <span className="text-[#D91E26] mx-2">/</span> 
                Become Unstoppable
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pointer-events-auto">
                <button className="relative overflow-hidden group bg-gradient-to-b from-[#D91E26] to-[#901419] px-8 py-4 rounded-sm shadow-[0_0_20px_rgba(217,30,38,0.4)] hover:shadow-[0_0_40px_rgba(217,30,38,0.8)] transition-all duration-300 transform hover:scale-105">
                  <span className="relative z-10 text-white font-bold tracking-wider uppercase">Join Today</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </button>
                
                <button className="px-8 py-4 rounded-sm border border-[#2A2A2A] bg-[#050505]/50 backdrop-blur-sm text-[#C7CDD3] hover:text-white hover:border-[#C7CDD3] transition-all duration-300 tracking-wider uppercase font-bold">
                  View Membership
                </button>
              </div>
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
