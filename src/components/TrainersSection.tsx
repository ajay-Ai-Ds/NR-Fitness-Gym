"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Target, Award } from "lucide-react";

import Image from "next/image";

const trainers = [
  {
    name: "Head Coach",
    role: "Head Coach / Strength Specialist",
    bio: "10+ years of experience in powerlifting and strength conditioning. Certified strength & fitness specialist.",
    specialties: ["Strength", "Powerlifting", "Conditioning"],
    icon: Shield,
    image: "/images/trainer1.png",
  },
  {
    name: "Trainer Name 2",
    role: "Fitness Coach / Weight Loss Expert",
    bio: "Specialized in body transformations and metabolic training. ACE certified personal trainer.",
    specialties: ["Weight Loss", "HIIT", "Nutrition"],
    icon: Target,
  },
  {
    name: "Trainer Name 3",
    role: "Body Building Coach",
    bio: "Competitive bodybuilder with expertise in hypertrophy and contest prep.",
    specialties: ["Bodybuilding", "Hypertrophy", "Posing"],
    icon: Award,
  },
  {
    name: "Trainer Name 4",
    role: "Functional Training Specialist",
    bio: "Focused on movement quality, mobility, and injury prevention strategies.",
    specialties: ["Functional", "Mobility", "Rehab"],
    icon: Target,
  },
  {
    name: "Trainer Name 5",
    role: "CrossFit & Endurance Coach",
    bio: "CrossFit L2 certified with a passion for pushing athletes beyond their limits.",
    specialties: ["CrossFit", "Endurance", "Olympic Lifts"],
    icon: Shield,
  },
];

function TrainerCard({ trainer, index }: { trainer: typeof trainers[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isTouch, setIsTouch] = useState(false);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  }, [isTouch]);

  const handleMouseLeave = useCallback(() => {
    setTransform("");
    setGlowPos({ x: 50, y: 50 });
  }, []);

  const Icon = trainer.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-default"
      style={{
        transform: transform || undefined,
        transition: transform ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
      }}
    >
      {/* Glassmorphism Card */}
      <div className="relative rounded-xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-xl h-full">
        {/* Chrome shine sweep */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(199,205,211,0.1) 0%, transparent 50%)`,
          }}
        />

        {/* Photo Container */}
        <div className="relative h-72 bg-gradient-to-br from-[#111] via-[#0d0d0d] to-[#1a1a1a] overflow-hidden">
          {trainer.image ? (
            <Image
              src={trainer.image}
              alt={trainer.name}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full border-2 border-[#D91E26]/50 bg-[#1E56B4]/20 flex items-center justify-center mb-3">
                <Icon size={32} className="text-[#C7CDD3]" />
              </div>
              <p className="text-[#555] text-xs tracking-wider uppercase">[Swap Photo Here]</p>
            </div>
          )}
          {/* Classified stamp overlay */}
          <div className="absolute top-3 right-3 px-3 py-1 rounded border border-[#D91E26]/40 bg-[#D91E26]/10 backdrop-blur-sm z-10">
            <span className="text-[#D91E26] text-[10px] font-bold tracking-[0.15em] uppercase">Elite Trainer</span>
          </div>
          {/* Bottom gradient fade into card body */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
        </div>

        {/* Card Body */}
        <div className="relative p-6">
          <h3
            className="text-xl font-bold mb-1 tracking-wide"
            style={{
              backgroundImage: "linear-gradient(to right, #ffffff, #C7CDD3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {trainer.name}
          </h3>
          <p className="text-[#D91E26] text-sm font-medium tracking-wide mb-3">{trainer.role}</p>
          <p className="text-[#B7B7B7] text-sm leading-relaxed mb-4">{trainer.bio}</p>
          {/* Specialty tags */}
          <div className="flex flex-wrap gap-2">
            {trainer.specialties.map((s) => (
              <span
                key={s}
                className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full border border-[#2A2A2A] bg-[#0a0a0a] text-[#B7B7B7] group-hover:border-[#1E56B4]/40 group-hover:text-[#C7CDD3] transition-all duration-300"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-transparent via-[#D91E26] to-transparent transition-all duration-500" />
      </div>
    </motion.div>
  );
}

export function TrainersSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="trainers" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden bg-[#050505]">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#D91E26] rounded-full blur-[250px] opacity-[0.03]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#1E56B4] rounded-full blur-[250px] opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-4 md:px-8">
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
            ELITE TRAINERS
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D91E26] to-[#1E56B4] mx-auto rounded-full shadow-[0_0_10px_rgba(217,30,38,0.5)]" />
          <p className="text-[#B7B7B7] mt-6 max-w-2xl mx-auto text-lg">
            Our certified professionals are dedicated to helping you achieve your absolute best.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {trainers.map((trainer, index) => (
            <TrainerCard key={trainer.name} trainer={trainer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
