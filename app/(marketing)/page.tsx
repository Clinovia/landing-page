import Hero from "./sections/Hero";
import Platform from "./sections/Platform";
import HowWeWork from "./sections/Features";
import About from "./sections/Pilot";
import CTASection from "./sections/CTASection";

export default function HomePage() {
  return (
    <main className="w-full">
      <Hero />
      <Platform />
      <HowWeWork />
      <About />
      <CTASection />
    </main>
  );
}
