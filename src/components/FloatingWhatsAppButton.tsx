"use client";

import { MessageCircle } from "lucide-react";

export function FloatingWhatsAppButton() {
  const whatsappUrl = "https://wa.me/919494723399?text=" + encodeURIComponent("Hi NR Gym, I'm interested in joining!");

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp with NR Gym"
      className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] border border-white/20 text-white flex items-center justify-center shadow-[0_0_25px_rgba(37,211,102,0.5)] hover:shadow-[0_0_40px_rgba(37,211,102,0.8)] hover:scale-110 active:scale-95 transition-all duration-300 group"
    >
      <MessageCircle size={26} className="group-hover:rotate-12 transition-transform duration-300 fill-white/10" />
      <span className="absolute right-16 bg-[#050505] border border-[#2A2A2A] text-white text-xs font-bold px-3 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Chat on WhatsApp
      </span>
    </a>
  );
}
