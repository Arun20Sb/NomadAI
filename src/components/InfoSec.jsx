import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FiShare } from "react-icons/fi";
import axios from "axios";
import Slider from "react-slick";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

function InfoSec({ tripDb }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/videos/?key=${API_KEY}&q=${tripDb?.userSelect?.destination}&video_type=film`
        );
        if (response.data.hits.length > 0) {
          setVideos(response.data.hits[0].videos.medium.url); // Set the medium quality video
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, [tripDb?.userSelect?.destination]);

  return (
    <div className="relative pt-28 rounded-xl overflow-hidden">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Left Section: Title and Description */}
        <div className="w-full md:w-1/2 p-6 rounded-xl">
          <h2 className="text-gray-800 text-3xl font-semibold font-mono mb-4">
            {tripDb?.userSelect?.destination} ✈️
          </h2>
          <div
            className="text-gray-700 space-y-4 text-md font-semibold"
            dangerouslySetInnerHTML={{
              __html: tripDb?.tripDetails?.locationDetails,
            }}
          ></div>
        </div>

        {/* Right Section: Video */}
        <div className="w-full md:w-1/2 h-[200px] lg:h-[400px] rounded-xl overflow-hidden shadow-lg">
          {videos.length > 0 ? (
            <div className="relative w-full h-full">
              <video
                src={videos}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="flex justify-center items-center h-full bg-gray-300 rounded-lg">
              <p className="text-white text-xl">Loading videos...</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: Travel Info */}
      <div className="mt-0 p-6 shadow-lg rounded-xl flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-wrap gap-4">
          <span className="px-6 py-3 bg-gray-950 text-gray-200 rounded-lg shadow-md">
            {tripDb?.userSelect?.days} Days
          </span>
          <span className="px-6 py-3 bg-gray-950 text-gray-200 rounded-lg shadow-md">
            {tripDb?.userSelect?.budget}
          </span>
          <span className="px-6 py-3 bg-gray-950 text-gray-200 rounded-lg shadow-md">
            {tripDb?.userSelect?.travelers} Traveler(s)
          </span>
        </div>
        <Button className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
          <FiShare size={20} />
        </Button>
      </div>
    </div>
  );
}

export default InfoSec;
