"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Basic",
    price: "[PRICE]",
    period: "/month",
    description: "Perfect for beginners getting started on their fitness journey.",
    features: [
      "Access to gym floor",
      "Standard equipment usage",
      "Locker room access",
      "Open during regular hours",
    ],
    highlighted: false,
  },
  {
    name: "Standard",
    price: "[PRICE]",
    period: "/month",
    description: "Our most popular plan with added benefits and flexibility.",
    features: [
      "Full gym access",
      "All equipment & machines",
      "1 personal training session/month",
      "Diet consultation",
      "Extended hours access",
    ],
    highlighted: false,
  },
  {
    name: "Premium",
    price: "[PRICE]",
    period: "/month",
    description: "The ultimate package for serious athletes who demand the best.",
    features: [
      "Unlimited full gym access",
      "All equipment & machines",
      "4 personal training sessions/month",
      "Custom diet & meal plan",
      "Priority booking",
      "Exclusive member events",
      "Guest passes included",
    ],
    highlighted: true,
  },
];

export function MembershipSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="membership" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden bg-[#050505]">
      {/* Background glow for premium feel */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D91E26] rounded-full blur-[250px] opacity-[0.04]" />
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
            MEMBERSHIP
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D91E26] to-[#1E56B4] mx-auto rounded-full shadow-[0_0_10px_rgba(217,30,38,0.5)]" />
          <p className="text-[#B7B7B7] mt-6 max-w-2xl mx-auto text-lg">
            Choose a plan that fits your goals. No hidden fees, no contracts.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto items-stretch">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative group ${tier.highlighted ? "md:-mt-4 md:mb-0" : ""}`}
            >
              {/* Animated glowing border for Premium */}
              {tier.highlighted && (
                <>
                  <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-[#D91E26] via-[#C7CDD3] to-[#1E56B4] opacity-70 blur-[1px] animate-[borderGlow_3s_ease-in-out_infinite]" />
                  <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[#D91E26] via-[#C7CDD3] to-[#1E56B4] opacity-50" style={{ backgroundSize: "200% 200%", animation: "borderShift 3s ease-in-out infinite" }} />
                </>
              )}

              <div className={`relative rounded-xl overflow-hidden border h-full flex flex-col ${
                tier.highlighted
                  ? "border-transparent bg-gradient-to-b from-[#0f0f0f] to-[#050505] shadow-[0_0_40px_rgba(217,30,38,0.15)]"
                  : "border-[#2A2A2A] bg-gradient-to-b from-[#0f0f0f] to-[#050505] hover:border-[#C7CDD3]/20"
              } transition-all duration-500`}>

                {/* Popular badge for Premium */}
                {tier.highlighted && (
                  <div className="absolute top-0 left-0 w-full flex justify-center -translate-y-0">
                    <div className="px-6 py-1.5 bg-gradient-to-r from-[#D91E26] to-[#901419] rounded-b-lg shadow-[0_4px_15px_rgba(217,30,38,0.4)]">
                      <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase">Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="p-8 pt-10 flex flex-col h-full">
                  {/* Tier Name */}
                  <h3 className="text-lg font-bold tracking-widest uppercase text-[#B7B7B7] mb-4">{tier.name}</h3>

                  {/* Price */}
                  <div className="mb-4">
                    <span
                      className="text-4xl md:text-5xl font-extrabold"
                      style={{
                        backgroundImage: tier.highlighted
                          ? "linear-gradient(135deg, #ffffff 0%, #D91E26 50%, #ffffff 100%)"
                          : "linear-gradient(135deg, #ffffff 0%, #C7CDD3 50%, #ffffff 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {tier.price}
                    </span>
                    <span className="text-[#B7B7B7] text-sm ml-1">{tier.period}</span>
                  </div>

                  <p className="text-[#B7B7B7] text-sm leading-relaxed mb-6">{tier.description}</p>

                  {/* Divider */}
                  <div className={`w-full h-[1px] mb-6 ${
                    tier.highlighted
                      ? "bg-gradient-to-r from-transparent via-[#D91E26]/40 to-transparent"
                      : "bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent"
                  }`} />

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check size={16} className={`mt-0.5 flex-shrink-0 ${tier.highlighted ? "text-[#D91E26]" : "text-[#1E56B4]"}`} />
                        <span className="text-[#B7B7B7]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={`https://wa.me/919494723399?text=${encodeURIComponent(`Hi NR Gym, I'm interested in joining the ${tier.name} Plan!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      // If user is on desktop, also ensure smooth scroll to contact as fallback
                      if (typeof window !== "undefined" && window.innerWidth >= 768) {
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={`relative overflow-hidden group/btn w-full py-4 rounded-lg font-bold tracking-wider uppercase text-sm transition-all duration-300 block text-center cursor-pointer ${
                      tier.highlighted
                        ? "bg-gradient-to-b from-[#D91E26] to-[#901419] text-white shadow-[0_0_20px_rgba(217,30,38,0.4)] hover:shadow-[0_0_30px_rgba(217,30,38,0.7)] hover:-translate-y-0.5"
                        : "border border-[#2A2A2A] text-[#C7CDD3] hover:border-[#C7CDD3] hover:text-white hover:-translate-y-0.5"
                    }`}
                  >
                    <span className="relative z-10">Join Now</span>
                    {tier.highlighted && (
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    )}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
