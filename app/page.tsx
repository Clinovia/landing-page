// app/page.tsx
import Hero from "./home-sections/Hero";
import WhatWeDo from "./home-sections/WhatWeDo";
import HowWeWork from "./home-sections/HowWeWork";
import DecisionAreas from "./home-sections/DecisionAreas";
import About from "./home-sections/About";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* What We Do */}
      <section id="what-we-do">
        <WhatWeDo />
      </section>

      {/* How We Work */}
      <section id="how-we-work">
        <HowWeWork />
      </section>

      {/* Decision Areas */}
      <section id="decision-areas">
        <DecisionAreas />
      </section>

      {/* About */}
      <section id="about" className="bg-gray-50">
        <About />
      </section>
    </>
  );
}