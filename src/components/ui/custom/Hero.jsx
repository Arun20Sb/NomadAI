import { Link } from "react-router-dom";
import { Button } from "../button";

function Hero() {
  return (
    <div className="flex flex-col items-center lg:mx-56 md:mx-40 mx-7 gap-9">
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mt-16">
        <span className="text-[#f56551]">
          Lorem ipsum dolor sit amet consectetur.
        </span>{" "}
        Similique reprehenderit unde iure labore.
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl  text-gray-700 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum corrupti,
        repellat accusantium culpa doloribus.
      </p>

      <Link to={"/create-trip"}>
        <Button>Get Started, it's Free</Button>
      </Link>
    </div>
  );
}

export default Hero;
