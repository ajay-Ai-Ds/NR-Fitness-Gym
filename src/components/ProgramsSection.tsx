"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Dumbbell, TrendingDown, Award, User, Zap } from "lucide-react";

const programs = [
  {
    title: "Strength Training",
    description: "Build raw power and functional strength with our comprehensive barbell and free-weight programs.",
    icon: Dumbbell,
  },
  {
    title: "Weight Loss",
    description: "Burn fat efficiently with high-intensity cardio circuits, metabolic conditioning, and nutritional guidance.",
    icon: TrendingDown,
  },
  {
    title: "Body Building",
    description: "Sculpt your physique with targeted hypertrophy training, progressive overload, and expert coaching.",
    icon: Award,
  },
  {
    title: "Personal Training",
    description: "Get 1-on-1 attention from certified trainers who design programs specifically for your goals.",
    icon: User,
  },
  {
    title: "Functional Training",
    description: "Improve everyday movement patterns, mobility, and core stability for a stronger, injury-free life.",
    icon: Zap,
  },
];

function ProgramCard({ program, index }: { program: typeof programs[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.02)`);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  }, [isTouch]);

  const handleMouseLeave = useCallback(() => {
    setTransform("");
    setGlowPos({ x: 50, y: 50 });
  }, []);

  const Icon = program.icon;
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer rounded-lg overflow-hidden"
      style={{
        transform: transform || undefined,
        transition: transform ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
      }}
    >
      {/* Card Background */}
      <div className="relative p-8 md:p-10 bg-gradient-to-br from-[#111111] via-[#0a0a0a] to-[#080808] border border-white/10 group-hover:border-[#D91E26]/60 rounded-lg transition-all duration-500 h-full shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        {/* Chrome shine sweep on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(199,205,211,0.08) 0%, transparent 60%)`,
          }}
        />

        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: "inset 0 0 30px rgba(217,30,38,0.1), 0 0 20px rgba(217,30,38,0.15)",
          }}
        />

        {/* Top metallic accent line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C7CDD3]/20 to-transparent group-hover:via-[#C7CDD3]/50 transition-all duration-500" />

        <div className="relative z-10">
          {/* Icon */}
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#D91E26]/20 to-[#1E56B4]/20 border border-[#2A2A2A] group-hover:border-[#D91E26]/40 flex items-center justify-center mb-6 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(217,30,38,0.3)]">
            <Icon size={28} className="text-[#D91E26] group-hover:drop-shadow-[0_0_6px_rgba(217,30,38,0.8)] transition-all duration-300" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 tracking-wide group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] transition-all duration-300">
            {program.title}
          </h3>

          {/* Description */}
          <p className="text-[#B7B7B7] leading-relaxed text-sm">
            {program.description}
          </p>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#D91E26] to-transparent transition-all duration-500" />
      </div>
    </motion.div>
  );
}

export function ProgramsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="programs"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-[#050505]"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, #D91E26 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, #1E56B4 0%, transparent 50%)
          `,
        }}
      />

      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4"
            style={{
              backgroundImage: "linear-gradient(135deg, #ffffff 0%, #C7CDD3 40%, #888888 50%, #ffffff 60%, #C7CDD3 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            OUR PROGRAMS
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D91E26] to-[#1E56B4] mx-auto rounded-full shadow-[0_0_10px_rgba(217,30,38,0.5)]" />
          <p className="text-[#B7B7B7] mt-6 max-w-2xl mx-auto text-lg">
            Choose the program that matches your goals. Every plan is designed to push your limits and deliver real results.
          </p>
        </motion.div>

        {/* Program Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {programs.map((program, index) => (
            <ProgramCard key={program.title} program={program} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
