import { Link } from "react-router-dom";
import { Button } from "../button";

function Hero() {
  return (
    <div className="flex flex-col items-start mx-7 gap-9 p-10 mb-3">
      <h1 className="font-semibold text-6xl max-sm:text-5xl md:text-6xl lg:text-8xl text-center mt-8">
        Your Dream Trip, <br />Powered by AI
      </h1>
      <p className="text-md sm:text-md md:text-xl  text-gray-700 text-pretty w-3/4 ">
        Tell us a bit about your vibe, and let our AI work
        <br />
        its magic to create the perfect trip for you. <br /> Your next epic
        getaway starts here.
      </p>

      <Link to={"/create-trip"}>
        <Button>Get Started, it's Free</Button>
      </Link>
    </div>
  );
}

export default Hero;
