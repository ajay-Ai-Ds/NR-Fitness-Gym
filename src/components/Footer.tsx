"use client";

import Link from "next/link";
import { Phone, MapPin, ArrowUp } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Programs", href: "#programs" },
  { name: "Trainers", href: "#trainers" },
  { name: "Gallery", href: "#gallery" },
  { name: "Membership", href: "#membership" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#030303] border-t border-[#2A2A2A] text-white pt-16 pb-12 overflow-hidden">
      {/* Glow line top border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D91E26]/60 to-transparent" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="#" className="flex items-center gap-3 inline-block">
              <div className="relative w-12 h-12 rounded-full border-4 border-[#D91E26] bg-[#1E56B4] flex items-center justify-center shadow-[0_0_15px_rgba(217,30,38,0.4)]">
                <div className="w-4 h-4 rounded-full bg-[#C7CDD3] shadow-inner" />
              </div>
              <span className="font-extrabold text-2xl tracking-wider text-white">
                NR FITNESS GYM
              </span>
            </Link>
            <p className="text-[#B7B7B7] text-sm leading-relaxed max-w-sm">
              Transform Your Body. Forge Your Strength. Become Unstoppable. Join the premier gym designed for real transformation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#B7B7B7] hover:text-[#D91E26] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase text-white mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-[#B7B7B7]">
              <a
                href="tel:9989391930"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Phone size={16} className="text-[#D91E26]" />
                <span>+91 9989391930</span>
              </a>
              <a
                href="https://maps.app.goo.gl/wZcbcAHBB9rEFEi48?g_st=ac"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <MapPin size={16} className="text-[#1E56B4]" />
                <span>NR Fitness Gym Location</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777]">
          <p>© {new Date().getFullYear()} NR Fitness Gym. All rights reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#B7B7B7] hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-full border border-[#2A2A2A] bg-[#0a0a0a] flex items-center justify-center">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
