"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, GraduationCap, IndianRupee, UserCheck, Heart, Clock } from "lucide-react";

const features = [
  {
    title: "Latest Equipment",
    description: "State-of-the-art machines and free weights from premium brands.",
    icon: Monitor,
  },
  {
    title: "Certified Trainers",
    description: "Nationally certified fitness professionals with years of experience.",
    icon: GraduationCap,
  },
  {
    title: "Affordable Membership",
    description: "Premium facilities at prices that won't break the bank.",
    icon: IndianRupee,
  },
  {
    title: "Personal Guidance",
    description: "Tailored workout plans and nutritional advice for your goals.",
    icon: UserCheck,
  },
  {
    title: "Friendly Environment",
    description: "A welcoming community that motivates and supports every member.",
    icon: Heart,
  },
  {
    title: "Flexible Timings",
    description: "Extended hours so you can train whenever it fits your schedule.",
    icon: Clock,
  },
];

export function WhyChooseUsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)",
      }}
    >
      {/* Decorative accent lines */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D91E26] to-transparent opacity-40" />

      {/* Background subtle glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D91E26] rounded-full blur-[200px] opacity-[0.03]" />
      </div>

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
            WHY CHOOSE US
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D91E26] to-[#1E56B4] mx-auto rounded-full shadow-[0_0_10px_rgba(217,30,38,0.5)]" />
          <p className="text-[#B7B7B7] mt-6 max-w-2xl mx-auto text-lg">
            We don&apos;t just offer a gym — we offer a transformation experience built on excellence.
          </p>
        </motion.div>

        {/* Icon Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
                className="relative group"
              >
                <div className="relative p-8 rounded-lg border border-[#2A2A2A] bg-gradient-to-b from-[#0f0f0f] to-[#050505] hover:border-[#1E56B4]/40 transition-all duration-500 h-full">
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: "inset 0 0 30px rgba(30,86,180,0.08), 0 0 15px rgba(30,86,180,0.1)" }}
                  />

                  {/* Top accent */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C7CDD3]/10 to-transparent group-hover:via-[#1E56B4]/40 transition-all duration-500" />

                  <div className="relative z-10 flex items-start gap-5">
                    {/* Icon Container */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-[#1E56B4]/20 to-[#D91E26]/10 border border-[#2A2A2A] group-hover:border-[#1E56B4]/40 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(30,86,180,0.3)]">
                      <Icon
                        size={24}
                        className="text-[#1E56B4] group-hover:text-[#C7CDD3] group-hover:drop-shadow-[0_0_6px_rgba(30,86,180,0.8)] transition-all duration-300"
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white mb-2 tracking-wide group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-[#B7B7B7] text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#1E56B4] to-transparent transition-all duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#1E56B4] to-transparent opacity-30" />
    </section>
  );
}
