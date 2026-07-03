import Hero from "./sections/Hero";
import Platform from "./sections/Platform";
import Features from "./sections/Features";
import Pilot from "./sections/Pilot";
import CTASection from "./sections/CTASection";

export default function HomePage() {
  return (
    <main className="w-full">
      <Hero />
      <Platform />
      <Features />
      <Pilot />
      <CTASection />
    </main>
  );
}
