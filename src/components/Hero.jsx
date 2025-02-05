import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Sparkles, MapPin, Plane, Star, Compass } from "lucide-react";

function Hero() {
  return (
    <div className="relative min-h-screen z-10 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative container mx-auto px-6 py-24 overflow-x-clip">
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          {/* AI-powered Badge */}
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center gap-2 py-2 px-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              Powered by Gemini AI
            </div>
          </div>

          {/* Main Heading with Dynamic Animation */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-300 via-green-200 to-yellow-300 text-transparent bg-clip-text animate-gradient-x">
            Discover Your <span className="text-indigo-400">Epic</span> Journey
          </h1>

          {/* Subtext with Icons */}
          <div className="max-w-3xl mx-auto mb-10">
            <p className="text-xl text-gray-300 leading-relaxed flex items-center justify-center gap-2">
              <Compass className="w-6 h-6 text-blue-400" />
              Personalized AI-crafted trips that transform your travel dreams
              into reality
              <MapPin className="w-6 h-6 text-green-400" />
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex items-center gap-4">
            <Link to="/create-trip">
              <Button
                variant="default"
                className="group flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition-all duration-300"
              >
                <Plane className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                Plan Your Trip
              </Button>
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="mt-16 flex justify-center gap-8 opacity-70">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>Personalized Recommendations</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-blue-400" />
              <span>AI-Powered Planning</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
