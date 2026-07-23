import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollTimelineConfig {
  triggerId: string;
  onUpdate: (progress: number) => void;
}

export function initHeroScrollTimeline({ triggerId, onUpdate }: ScrollTimelineConfig) {
  if (typeof window === "undefined") return null;

  const triggerEl = document.getElementById(triggerId);
  if (!triggerEl) return null;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: `#${triggerId}`,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      pin: false,
      onUpdate: (self) => {
        onUpdate(self.progress);
      },
    },
  });

  tl.to({}, { duration: 1, ease: "none" });

  return tl;
}
