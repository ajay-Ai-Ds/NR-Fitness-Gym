import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { LoadingScreen } from "@/components/LoadingScreen";
import { AboutSection } from "@/components/AboutSection";
import { ProgramsSection } from "@/components/ProgramsSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { TrainersSection } from "@/components/TrainersSection";
import { GallerySection } from "@/components/GallerySection";
import { MembershipSection } from "@/components/MembershipSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D91E26] selection:text-white">
      <LoadingScreen />
      <Header />
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <WhyChooseUsSection />
      <TrainersSection />
      <GallerySection />
      <MembershipSection />
      <TestimonialsSection />

      {/* Spacer for future sections */}
      <section className="h-screen flex items-center justify-center border-t border-[#2A2A2A]">
        <h2 className="text-3xl text-[#C7CDD3] tracking-widest uppercase">Phase 4 Starts Here</h2>
      </section>
    </main>
  );
}
