"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { label: "Happy Members", value: 500, suffix: "+" },
  { label: "Expert Trainers", value: 5, suffix: "+" },
  { label: "Days Open Weekly", value: 6, suffix: "" },
  { label: "Dedication", value: 100, suffix: "%" },
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span className="text-4xl md:text-5xl font-extrabold"
      style={{
        backgroundImage: "linear-gradient(135deg, #ffffff 0%, #C7CDD3 50%, #ffffff 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {count}{suffix}
    </span>
  );
}

export function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: `
          linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 50px,
            rgba(42,42,42,0.15) 50px,
            rgba(42,42,42,0.15) 51px
          ),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 50px,
            rgba(42,42,42,0.15) 50px,
            rgba(42,42,42,0.15) 51px
          )
        `,
      }}
    >
      {/* Red accent line at top */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D91E26] to-transparent opacity-60" />

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
            ABOUT US
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D91E26] to-[#1E56B4] mx-auto rounded-full shadow-[0_0_10px_rgba(217,30,38,0.5)]" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
          {/* Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#2A2A2A] bg-[#0a0a0a]">
              {/* Placeholder image - REPLACE WITH ACTUAL GYM IMAGE */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-[#D91E26] bg-[#1E56B4] flex items-center justify-center shadow-[0_0_20px_rgba(217,30,38,0.4)]">
                    <div className="w-6 h-6 rounded-full bg-[#C7CDD3]" />
                  </div>
                  <p className="text-[#B7B7B7] text-sm tracking-wider uppercase">
                    [Gym Image Placeholder]
                  </p>
                  <p className="text-[#555] text-xs mt-1">Replace with actual gym photo</p>
                </div>
              </div>
              {/* Glow overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#D91E26]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            {/* Decorative corner brackets */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#D91E26] opacity-60" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#D91E26] opacity-60" />
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3
              className="text-2xl md:text-3xl font-bold mb-6"
              style={{
                backgroundImage: "linear-gradient(to right, #ffffff, #C7CDD3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Forge Your Strongest Self
            </h3>
            <p className="text-[#B7B7B7] leading-relaxed mb-6 text-lg">
              At <span className="text-white font-semibold">NR Fitness Gym</span>, located in Tallarevu, Korangi, we believe that true strength 
              is forged through dedication, discipline, and the right environment. Our state-of-the-art facility 
              is equipped with top-tier equipment to help you achieve results you never thought possible.
            </p>
            <p className="text-[#B7B7B7] leading-relaxed text-lg">
              Whether you&apos;re a beginner taking your first step or a seasoned athlete looking to break through 
              plateaus, our expert trainers and world-class equipment provide everything you need to transform 
              your body and forge your strength.
            </p>
          </motion.div>
        </div>

        {/* Stats Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.15 }}
              className="relative text-center p-6 md:p-8 rounded-lg border border-[#2A2A2A] bg-gradient-to-b from-[#0f0f0f] to-[#050505] group hover:border-[#D91E26]/50 transition-all duration-300"
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 rounded-lg bg-[#D91E26]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
                <p className="text-[#B7B7B7] text-sm md:text-base tracking-wider uppercase mt-3 font-medium">
                  {stat.label}
                </p>
              </div>
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-transparent via-[#D91E26] to-transparent transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Red accent line at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#1E56B4] to-transparent opacity-40" />
    </section>
  );
}
