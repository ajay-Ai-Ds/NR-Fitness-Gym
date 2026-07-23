"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { initHeroScrollTimeline } from "./ScrollTimeline";
import { AnimationController } from "./AnimationController";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#050505]" />,
});

export function HeroSection() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timeline = initHeroScrollTimeline({
      triggerId: "hero-scroll-container",
      onUpdate: (progress) => {
        setScrollProgress(progress);
      },
    });

    return () => {
      timeline?.kill();
    };
  }, []);

  const animState = AnimationController.getFrame(scrollProgress);

  return (
    <section className="relative bg-[#050505] overflow-hidden">
      {/* 
        Scrollable container height: 140vh keeps the transition tight and removes empty gap before About Us
      */}
      <div id="hero-scroll-container" className="h-[140vh] w-full">
        {/* Sticky full-screen viewport */}
        <div
          className="sticky top-0 left-0 w-full h-screen overflow-hidden"
          style={{
            background: "radial-gradient(circle at 50% 50%, #150912 0%, #0a0c16 45%, #050505 100%)",
          }}
        >
          {/* Ambient Lighting Bleed Overlay */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[850px] sm:h-[850px] bg-[#D91E26] rounded-full blur-[170px] opacity-25 animate-pulse" />
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#1E56B4] rounded-full blur-[190px] opacity-20" />
          </div>

          {/* HTML UI Story Overlays */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4">
            <AnimatePresence mode="wait">
              {/* Phase 1: 0% -> 30% Initial Branding */}
              {animState.textPhase === "hero" && (
                <motion.div
                  key="hero-text"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                  transition={{ duration: 0.6 }}
                  className="text-center max-w-5xl"
                >
                  <div className="relative inline-block">
                    <h1
                      className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tight mb-4 drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #ffffff 0%, #C7CDD3 40%, #888888 50%, #ffffff 60%, #C7CDD3 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      NR FITNESS GYM
                    </h1>
                  </div>

                  <p className="text-base sm:text-xl md:text-2xl text-[#C7CDD3] tracking-[0.25em] uppercase mb-10 font-medium">
                    Transform Your Body <span className="text-[#D91E26] mx-2">/</span> Forge Your Strength{" "}
                    <span className="text-[#D91E26] mx-2">/</span> Become Unstoppable
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pointer-events-auto">
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="relative overflow-hidden bg-gradient-to-b from-[#D91E26] to-[#901419] px-10 py-4 rounded-sm shadow-[0_0_25px_rgba(217,30,38,0.6)] hover:shadow-[0_0_45px_rgba(217,30,38,0.9)] transition-all duration-300 transform hover:-translate-y-1 text-white font-bold tracking-[0.1em] uppercase cursor-pointer"
                    >
                      Join Today
                    </a>
                    <a
                      href="#membership"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("membership")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-10 py-4 rounded-sm border border-[#C7CDD3]/40 bg-gradient-to-b from-[#2A2A2A]/60 to-[#050505]/90 backdrop-blur-md text-[#C7CDD3] hover:text-white font-bold tracking-[0.1em] uppercase transition-all duration-300 cursor-pointer"
                    >
                      View Membership
                    </a>
                  </div>
                </motion.div>
              )}

              {/* Phase 2: 30% -> 75% Camera Fly-Through & Gym Entrance */}
              {(animState.textPhase === "transition" || animState.textPhase === "gym") && (
                <motion.div
                  key="gym-text"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <span className="text-[#D91E26] font-bold tracking-[0.4em] text-sm md:text-lg uppercase drop-shadow-[0_0_12px_rgba(217,30,38,0.8)] block mb-2">
                    Industrial Arena
                  </span>
                  <h2 className="text-3xl md:text-6xl font-black uppercase text-white tracking-wider drop-shadow-2xl">
                    Where Champions Are Forged
                  </h2>
                </motion.div>
              )}

              {/* Phase 3: 75% -> 100% Deadlift Lockout & "FORGE YOUR STRENGTH" Reveal */}
              {animState.textPhase === "lockout" && (
                <motion.div
                  key="lockout-text"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="relative inline-block px-4"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D91E26]/40 via-[#1E56B4]/30 to-[#D91E26]/40 blur-[80px] rounded-full -z-10" />
                    <span className="text-[#D91E26] font-bold tracking-[0.5em] text-xs sm:text-base uppercase block mb-3 drop-shadow-[0_0_15px_rgba(217,30,38,1)]">
                      Peak Performance
                    </span>
                    <h2
                      className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tight drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #ffffff 0%, #D91E26 50%, #1E56B4 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      FORGE YOUR STRENGTH
                    </h2>
                  </motion.div>

                  <div className="mt-8 flex justify-center pointer-events-auto">
                    <a
                      href="#programs"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-2 bg-[#D91E26] hover:bg-[#b5161c] text-white font-bold tracking-widest text-sm uppercase px-8 py-3.5 rounded-sm transition-all shadow-[0_0_25px_rgba(217,30,38,0.5)] hover:shadow-[0_0_35px_rgba(217,30,38,0.8)] cursor-pointer"
                    >
                      Explore Programs
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Interactive R3F Canvas */}
          <HeroScene scrollProgress={scrollProgress} />
        </div>
      </div>
    </section>
  );
}
