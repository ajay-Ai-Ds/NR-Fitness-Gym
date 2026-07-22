"use client";

import { motion } from "framer-motion";

export function AnimatedSectionFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative group ${className}`}>
      {/* Outer Glow aura */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#D91E26]/30 via-[#1E56B4]/20 to-[#D91E26]/30 opacity-40 group-hover:opacity-100 blur-sm transition-opacity duration-700 pointer-events-none" />

      {/* Main Glass Panel */}
      <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-6 sm:p-10 backdrop-blur-md overflow-hidden">
        {/* Animated Corner Brackets */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#D91E26] rounded-tl-sm pointer-events-none"
        />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
          className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#D91E26] rounded-tr-sm pointer-events-none"
        />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#1E56B4] rounded-bl-sm pointer-events-none"
        />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
          className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#1E56B4] rounded-br-sm pointer-events-none"
        />

        {/* Animated laser edge line along top border */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D91E26]/60 to-transparent" />

        {children}
      </div>
    </div>
  );
}
