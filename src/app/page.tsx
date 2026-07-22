import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D91E26] selection:text-white">
      <LoadingScreen />
      <Header />
      <HeroSection />
      
      {/* Spacer for future sections so the scroll effect is visible in testing Phase 1 */}
      <section className="h-screen flex items-center justify-center border-t border-[#2A2A2A]">
        <h2 className="text-3xl text-[#C7CDD3] tracking-widest uppercase">Phase 2 Starts Here</h2>
      </section>
    </main>
  );
}
