import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import TripSave from "../pages/TripSave";

function LandingPage() {
  return (
    <div className="bg-[#EEE9D4]">
      <Hero />
      <Marquee />
      <TripSave />
    </div>
  );
}

export default LandingPage;
