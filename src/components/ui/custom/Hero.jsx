import { Link } from "react-router-dom";
import { Button } from "../button";
import travelHome from "/travelHome.jpg";

function Hero() {
  return (
    <div className="flex flex-col items-start mx-7 gap-9 p-10 mb-3 h-screen">
      <h1 className="font-semibold text-6xl max-sm:text-3xl md:text-6xl lg:text-8xl text-center mt-8">
        Your Dream Trip, <br />
        Powered by AI
      </h1>
      <p className="text-md sm:text-md md:text-xl  text-gray-300 sm:text-gray-600 text-pretty w-3/4 font-semibold">
        Tell us a bit about your vibe, and let our AI work
        <br />
        its magic to create the perfect trip for you. <br /> Your next epic
        getaway starts here.
      </p>

      <Link to={"/create-trip"}>
        <Button>Get Started, it's Free</Button>
      </Link>
      <img src={travelHome} alt="hello" className="absolute -z-10 object-cover h-3/4 md:right-2 sm:right-2 right-0" />
    </div>
  );
}

export default Hero;
