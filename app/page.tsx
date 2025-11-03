import Hero from "../components/Hero";
import Cardiology from "../components/Cardiology";
import Neurology from "../components/Neurology";
import Papers from "../components/Papers";
import Who_Benefit from "../components/Who_Benefit";

export default function HomePage() {
  return (
    <main className="w-full">
      <Hero />
      <Cardiology />
      <Neurology />
      <Papers />
      <Who_Benefit />
    </main>
  );
}
