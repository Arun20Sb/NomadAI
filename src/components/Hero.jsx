import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Sparkles, MapPin, Plane, Compass } from "lucide-react";

function Hero() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/homeVdo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 z-10">
        {/* Heading */}
        <h1 className="text-6xl md:text-7xl font-extrabold drop-shadow-2xl flex items-center gap-2">
          Dream. Plan. Explore.
          <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse" />
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-lg md:text-2xl max-w-3xl leading-relaxed drop-shadow-md flex flex-col items-center gap-2">
          <Compass className="w-12 h-12 text-blue-400 animate-spin-slow" />
          Your next adventure is just a question away! 🚀 Tell us where you
          wanna go, when, and what excites you—our AI will craft the perfect
          trip, customized just for you. No stress, just epic journeys!
          <MapPin className="w-12 h-12 text-green-400 animate-bounce" />
        </p>

        {/* Call to Action */}
        <div className="mt-8">
          <Link to="/create-trip">
            <Button
              variant="default"
              className="group rounded-md py-6 px-4 font-semibold text-md bg-white text-gray-900 transition hover:bg-black hover:text-white"
            >
              <Plane className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
              Plan Your Trip
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
