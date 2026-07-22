"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const galleryItems = [
  { id: 1, label: "Training Floor", aspect: "aspect-[4/3]" },
  { id: 2, label: "Weight Area", aspect: "aspect-[3/4]" },
  { id: 3, label: "Cardio Zone", aspect: "aspect-square" },
  { id: 4, label: "Functional Area", aspect: "aspect-[3/4]" },
  { id: 5, label: "Studio Room", aspect: "aspect-[4/3]" },
  { id: 6, label: "Equipment Close-up", aspect: "aspect-square" },
  { id: 7, label: "Member Training", aspect: "aspect-[4/3]" },
  { id: 8, label: "Exterior View", aspect: "aspect-[3/4]" },
];

function GalleryItem({ item, index }: { item: typeof galleryItems[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`relative group overflow-hidden rounded-lg ${item.aspect} break-inside-avoid mb-4`}
    >
      {/* Image placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#111] via-[#0d0d0d] to-[#1a1a1a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full border-2 border-[#2A2A2A] bg-[#0a0a0a] flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border-2 border-[#D91E26] bg-[#1E56B4]">
              <div className="w-1 h-1 mx-auto mt-[3px] rounded-full bg-[#C7CDD3]" />
            </div>
          </div>
          <p className="text-[#555] text-[10px] tracking-wider uppercase">[{item.label}]</p>
        </div>
      </div>

      {/* Animated mask reveal - clip-path from bottom on scroll */}
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={isInView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
        transition={{ duration: 0.8, delay: index * 0.08 + 0.2, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] to-[#151515] border border-[#2A2A2A]"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full border-2 border-[#2A2A2A] bg-[#0a0a0a] flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border-2 border-[#D91E26] bg-[#1E56B4]">
                <div className="w-1 h-1 mx-auto mt-[3px] rounded-full bg-[#C7CDD3]" />
              </div>
            </div>
            <p className="text-[#555] text-[10px] tracking-wider uppercase">[{item.label}]</p>
          </div>
        </div>
      </motion.div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-[#050505]/0 group-hover:bg-[#050505]/60 transition-all duration-300 z-10 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300">
          <p className="text-white font-bold tracking-wider text-sm uppercase">{item.label}</p>
        </div>
      </div>

      {/* Zoom effect on hover */}
      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110 z-0" />

      {/* Glow border on hover */}
      <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-[#D91E26]/30 transition-all duration-300 z-20 pointer-events-none group-hover:shadow-[inset_0_0_20px_rgba(217,30,38,0.1)]" />
    </motion.div>
  );
}

export function GallerySection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)" }}
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D91E26] to-transparent opacity-40" />

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
            GALLERY
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D91E26] to-[#1E56B4] mx-auto rounded-full shadow-[0_0_10px_rgba(217,30,38,0.5)]" />
          <p className="text-[#B7B7B7] mt-6 max-w-2xl mx-auto text-lg">
            Take a look inside NR Fitness Gym — where champions train.
          </p>
        </motion.div>

        {/* Masonry Grid - CSS columns for true masonry */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {galleryItems.map((item, index) => (
            <GalleryItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#1E56B4] to-transparent opacity-30" />
    </section>
  );
}
