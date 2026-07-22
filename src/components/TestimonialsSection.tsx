"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Koppula Kalyan",
    text: "Good equipment",
    source: "Google Review",
    rating: 5,
  },
  {
    name: "Rayankula Bhavya sri",
    text: "Good",
    source: "Google Review",
    rating: 5,
  },
  {
    name: "Member Review",
    text: "NR Gym has completely transformed my daily routine. State-of-the-art equipment and motivating atmosphere in Tallarevu!",
    source: "Verified Member",
    rating: 5,
  },
  {
    name: "Local Athlete",
    text: "Great training environment for both beginners and experienced lifters. Highly recommended in Korangi!",
    source: "Verified Member",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-slide
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goNext, 4000);
    return () => clearInterval(interval);
  }, [isPaused, goNext]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      setIsPaused((prev) => !prev);
    }
  }, [goNext, goPrev]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)" }}
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D91E26] to-transparent opacity-40" />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#1E56B4] rounded-full blur-[250px] opacity-[0.03]" />
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
            REVIEWS & REPUTATION
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D91E26] to-[#1E56B4] mx-auto rounded-full shadow-[0_0_10px_rgba(217,30,38,0.5)] mb-6" />
          
          {/* Google Business Rating Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-[0_0_20px_rgba(217,30,38,0.2)]">
            <span className="text-white font-bold text-lg">5.0</span>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="text-[#D91E26] fill-[#D91E26]" />
              ))}
            </div>
            <span className="text-xs text-[#B7B7B7] border-l border-[#2A2A2A] pl-3">Google Business Profile</span>
          </div>

          <p className="text-[#B7B7B7] mt-6 max-w-2xl mx-auto text-lg">
            Hear directly from our members and reviews on Google Maps.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Testimonials carousel. Use arrow keys to navigate, space to pause."
          aria-roledescription="carousel"
        >
          {/* Cards container */}
          <div className="overflow-hidden rounded-xl">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="min-w-full px-4"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
                >
                  <div className="relative rounded-xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 md:p-12">
                    {/* Chrome accent line */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C7CDD3]/30 to-transparent" />

                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className="text-[#D91E26] fill-[#D91E26] drop-shadow-[0_0_4px_rgba(217,30,38,0.5)]"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-[#C7CDD3] text-lg md:text-xl leading-relaxed mb-8 italic">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      {/* Avatar placeholder */}
                      <div className="w-12 h-12 rounded-full border-2 border-[#D91E26]/40 bg-gradient-to-br from-[#D91E26]/20 to-[#1E56B4]/20 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p
                          className="font-bold tracking-wide"
                          style={{
                            backgroundImage: "linear-gradient(to right, #ffffff, #C7CDD3)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {testimonial.name}
                        </p>
                        <p className="text-[#B7B7B7] text-sm">NR Fitness Member</p>
                      </div>
                    </div>

                    {/* Bottom glow */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#D91E26]/50 to-transparent" />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goPrev}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-14 w-10 h-10 rounded-full border border-[#2A2A2A] bg-[#0a0a0a] hover:border-[#D91E26]/50 flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_10px_rgba(217,30,38,0.3)]"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} className="text-[#C7CDD3]" />
          </button>
          <button
            onClick={goNext}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-14 w-10 h-10 rounded-full border border-[#2A2A2A] bg-[#0a0a0a] hover:border-[#D91E26]/50 flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_10px_rgba(217,30,38,0.3)]"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} className="text-[#C7CDD3]" />
          </button>

          {/* Dots indicator */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#D91E26] w-6 shadow-[0_0_8px_rgba(217,30,38,0.5)]"
                    : "bg-[#2A2A2A] hover:bg-[#C7CDD3]/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Pause indicator */}
          {isPaused && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#0a0a0a]/80 border border-[#2A2A2A]">
              <span className="text-[#B7B7B7] text-[10px] tracking-wider uppercase">Paused</span>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#1E56B4] to-transparent opacity-30" />
    </section>
  );
}
