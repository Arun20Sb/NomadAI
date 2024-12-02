import React from "react";
import Travel from "/travel.jpg";
import { Button } from "@/components/ui/button";
import { FiShare } from "react-icons/fi";

function InfoSec({ tripDb }) {
  return (
    <div className="relative">
      <img
        src={Travel}
        alt="travel"
        className="h-[344px] w-full object-cover"
      />
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none"></div> */}

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {tripDb?.userSelect?.destination.toUpperCase()}
          </h2>

          <div className="flex gap-5 flex-wrap">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              {tripDb?.userSelect?.days} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              {tripDb?.userSelect?.budget}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              {tripDb?.userSelect?.travelers}
            </h2>
          </div>
        </div>
        <Button>
          <FiShare />
        </Button>
      </div>
    </div>
  );
}

export default InfoSec;
