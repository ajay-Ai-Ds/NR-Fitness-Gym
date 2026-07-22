"use client";

import { motion } from "framer-motion";

export function SectionDivider({ accent = "red" }: { accent?: "red" | "blue" | "dual" }) {
  return (
    <div className="relative w-full h-12 flex items-center justify-center overflow-hidden pointer-events-none my-4">
      {/* Background ambient beam fade */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D91E26]/10 to-transparent blur-md" />

      {/* Main Divider Line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent relative">
        {/* Animated Laser Beam traveling across the divider */}
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`h-[2px] w-48 mx-auto shadow-lg ${
            accent === "blue"
              ? "bg-gradient-to-r from-transparent via-[#1E56B4] to-transparent shadow-[0_0_15px_#1E56B4]"
              : accent === "dual"
              ? "bg-gradient-to-r from-transparent via-[#D91E26] via-[#C7CDD3] to-[#1E56B4] shadow-[0_0_20px_#D91E26]"
              : "bg-gradient-to-r from-transparent via-[#D91E26] to-transparent shadow-[0_0_15px_#D91E26]"
          }`}
        />
      </div>

      {/* Central Metallic Hub Emblem */}
      <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 border-[#D91E26] bg-[#050505] flex items-center justify-center shadow-[0_0_12px_rgba(217,30,38,0.6)] z-10">
        <div className="w-2 h-2 rounded-full bg-[#1E56B4] shadow-[0_0_6px_#1E56B4]" />
      </div>
    </div>
  );
}
