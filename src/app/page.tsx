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
import { LocationContactSection } from "@/components/LocationContactSection";
import { Footer } from "@/components/Footer";
import { FloatingCallButton } from "@/components/FloatingCallButton";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D91E26] selection:text-white relative">
      <ScrollProgressBar />
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
      <LocationContactSection />
      <Footer />
      <FloatingWhatsAppButton />
      <FloatingCallButton />
    </main>
  );
}
