"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const { progress, active } = useProgress();
  const [isFading, setIsFading] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [minTimePassed, setMinTimePassed] = useState(false);

  // Enforce a minimum loading time so the animation is visible
  useEffect(() => {
    const timer = setTimeout(() => setMinTimePassed(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // If progress is 100, or if it's no longer actively loading anything and min time passed
    if (minTimePassed && (progress === 100 || !active)) {
      const timeout = setTimeout(() => {
        setIsFading(true);
        setTimeout(() => setIsUnmounted(true), 800); // completely remove after animation
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, active, minTimePassed]);

  if (isUnmounted) return null;

  return (
    <AnimatePresence>
      {!isFading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Glowing Plate Placeholder */}
          <div className="relative mb-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="w-32 h-32 md:w-48 md:h-48 rounded-full border-[12px] md:border-[16px] border-[#D91E26] bg-[#1E56B4] shadow-[0_0_40px_rgba(217,30,38,0.6)] flex items-center justify-center relative"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent to-[rgba(255,255,255,0.2)] mix-blend-overlay" />
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#C7CDD3] shadow-[inset_0_0_15px_rgba(42,42,42,0.8)]" />
              
              {/* Cutouts approximation */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-4 rounded-full bg-[#050505] opacity-50" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-4 rounded-full bg-[#050505] opacity-50" />
            </motion.div>
            {/* Energy glow pulsing */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-[#D91E26] blur-2xl -z-10"
            />
          </div>

          {/* Progress Bar */}
          <div className="w-64 h-1 bg-[#2A2A2A] rounded-full overflow-hidden mb-6 relative">
            <motion.div
              className="h-full bg-[#D91E26] shadow-[0_0_10px_#D91E26]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          {/* Title Text */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-4xl font-bold tracking-[0.2em] text-[#C7CDD3] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
            style={{
              WebkitTextStroke: "1px #2A2A2A",
              backgroundImage: "linear-gradient(to bottom, #FFFFFF, #C7CDD3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            NR GYM
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
