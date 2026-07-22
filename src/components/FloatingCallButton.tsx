"use client";

import { Phone } from "lucide-react";

export function FloatingCallButton() {
  return (
    <a
      href="tel:09494723399"
      aria-label="Call NR Gym"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-[#D91E26] to-[#901419] border border-white/20 text-white flex items-center justify-center shadow-[0_0_25px_rgba(217,30,38,0.6)] hover:shadow-[0_0_40px_rgba(217,30,38,0.9)] hover:scale-110 active:scale-95 transition-all duration-300 group"
    >
      <Phone size={24} className="group-hover:rotate-12 transition-transform duration-300" />
      <span className="absolute right-16 bg-[#050505] border border-[#2A2A2A] text-white text-xs font-bold px-3 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Call +91 94947 23399
      </span>
    </a>
  );
}
