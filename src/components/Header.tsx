"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Programs", href: "#programs" },
  { name: "Trainers", href: "#trainers" },
  { name: "Gallery", href: "#gallery" },
  { name: "Membership", href: "#membership" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Shift to solid black only past the hero section (~100vh)
      setIsScrolled(window.scrollY > window.innerHeight - 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-3 sm:px-6 pt-3 sm:pt-4 transition-all duration-500 pointer-events-none">
      <div
        className={`mx-auto max-w-7xl rounded-xl sm:rounded-2xl transition-all duration-500 relative overflow-hidden pointer-events-auto shadow-[0_10px_35px_rgba(0,0,0,0.9)] ${
          isScrolled
            ? "bg-[#050505]/90 backdrop-blur-2xl border border-[#D91E26]/40 py-3 px-4 sm:px-8"
            : "bg-black/40 backdrop-blur-xl border border-white/15 py-4 px-4 sm:px-8"
        }`}
      >
        {/* 4 Corner HUD Brackets */}
        <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D91E26] opacity-90" />
        <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D91E26] opacity-90" />
        <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#1E56B4] opacity-90" />
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#1E56B4] opacity-90" />

        {/* Sleek Glowing Red-to-Blue Accent Line along bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D91E26] via-[#1E56B4] to-transparent opacity-90 shadow-[0_0_12px_rgba(217,30,38,0.8)]" />

        <div className="flex items-center justify-between">
        {/* Logo Badge */}
        <Link href="#" className="flex items-center gap-3 z-50">
          <div className="relative w-12 h-12 rounded-full border-4 border-[#D91E26] bg-[#1E56B4] flex items-center justify-center shadow-[0_0_15px_rgba(217,30,38,0.4)] transition-transform hover:scale-105">
            <div className="w-4 h-4 rounded-full bg-[#C7CDD3] shadow-inner" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-base sm:text-xl tracking-wider text-white block drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              NR FITNESS GYM
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] font-bold text-[#D91E26] uppercase mt-0.5 drop-shadow-[0_0_6px_rgba(217,30,38,0.6)]">
              FORGE YOUR STRENGTH
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                if (link.href === "#") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  const targetId = link.href.replace("#", "");
                  document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-sm font-medium tracking-wide text-[#B7B7B7] hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(217,30,38,0.8)] cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white z-50 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-0 bg-[#050505] z-40 flex flex-col items-center justify-center gap-8"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    if (link.href === "#") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                      const targetId = link.href.replace("#", "");
                      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-2xl font-bold tracking-widest text-[#B7B7B7] hover:text-[#D91E26] transition-colors cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
