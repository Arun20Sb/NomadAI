import { Link } from "react-router-dom";
import { Button } from "../button";

function Hero() {
  return (
    <div className="py-24 px-32 overflow-x-clip">
      <div className="relative flex flex-col items-center justify-center">
        {/* Content */}
        <div className="flex justify-center">
          <div className="inline-flex py-2 px-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full text-neutral-900">
            ✈️ Powered by Gemini AI
          </div>
        </div>
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold text-center mt-6 bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500 text-transparent bg-clip-text">
          Your <span className="text-indigo-500">Dream</span> Trip Awaits
        </h1>
        <p className="text-center text-xl text-white/75 mt-8 max-w-2xl mx-auto">
          Answer a few questions, and let our AI craft the perfect trip tailored
          just for you. Embark on a journey like never before.
        </p>

        <Link to={"/create-trip"} className="mt-8 inline-block  -translate-r-1/2 -translate-t-1/2">
          <Button
            variant="primary"
            className="whitespace-normal bg-white text-gray-700 text-lg py-2 px-6 rounded-md hover:bg-green-400 hover:text-gray-50 shadow-lg hover:scale-105 transition-all duration-300 active:scale-100"
          >
            Get Started, It's Free
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
