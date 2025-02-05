import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FiShare } from "react-icons/fi";
import axios from "axios";
import Slider from "react-slick";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

function InfoSec({ tripDb }) {
  const [videos, setVideos] = useState([]);

  // Fetch videos related to Bali
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/videos/?key=${API_KEY}&q=${tripDb?.userSelect?.destination}&video_type=film`
        );
        if (response.data.hits.length > 0) {
          setVideos(response.data.hits); // Store all videos
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [tripDb?.userSelect?.destination]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="relative p-6 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="h-[400px] mb-4 rounded-xl overflow-hidden">
        {videos.length > 0 ? (
          <Slider {...settings}>
            {videos.map((video, index) => (
              <div key={index} className="relative w-full h-full">
                <video
                  src={video.videos.medium.url}
                  controls
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="flex justify-center items-center h-full bg-gray-300 rounded-lg">
            <p className="text-white text-xl">Loading videos...</p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="text-gray-800 text-3xl font-semibold font-mono">
            {tripDb?.userSelect?.destination} ✈️
          </h2>

          <div className="flex gap-6 flex-wrap">
            <h2 className="p-3 px-6 bg-gray-800 hover:bg-gray-900 rounded-lg text-gray-200 shadow-md transition-colors">
              {tripDb?.userSelect?.days} Days
            </h2>
            <h2 className="p-3 px-6 bg-gray-800 hover:bg-gray-900 rounded-lg text-gray-200 shadow-md transition-colors">
              {tripDb?.userSelect?.budget}
            </h2>
            <h2 className="p-3 px-6 bg-gray-800 hover:bg-gray-900 rounded-lg text-gray-200 shadow-md transition-colors">
              {tripDb?.userSelect?.travelers} Traveler(s)
            </h2>
          </div>
        </div>
        <Button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
          <FiShare size={20} />
        </Button>
      </div>
    </div>
  );
}

export default InfoSec;
