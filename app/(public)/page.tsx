import Hero from "./home-sections/Hero";
import SpecialtyTools from "./home-sections/SpecialtyTools";
import DecisionAreas from "./home-sections/DecisionAreas";
import HowWeWork from "./home-sections/HowWeWork";
import About from "./home-sections/About";
import CTASection from "./home-sections/CTASection";

export default function HomePage() {
  return (
    <main className="w-full">
      <Hero />
      <SpecialtyTools />
      <DecisionAreas />
      <HowWeWork />
      <About />
      <CTASection />
    </main>
  );
}
