import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FiShare } from "react-icons/fi";
import axios from "axios";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

function InfoSec({ tripDb }) {
  const [images, setImages] = useState([]);

  // Fetch images from Pixabay
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=${API_KEY}&q=${tripDb?.userSelect?.destination}&image_type=photo`
        );
        setImages(response.data.hits);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);
  return (
    <div className="relative">
      <div className="h-[344px] mb-3">
        {images.length > 0 && (
          <img
            src={images[Math.floor(Math.random() * images.length)].webformatURL}
            alt="Location"
            className="h-full w-full object-cover rounded-t-xl"
          />
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="text-gray-800 text-2xl font-semibold font-mono">
            {tripDb?.userSelect?.destination} 🍾
          </h2>

          <div className="flex gap-5 flex-wrap">
            <h2 className="p-2 px-5 bg-gray-800 hover:bg-gray-900 rounded-md text-gray-200">
              {tripDb?.userSelect?.days} Days
            </h2>
            <h2 className="p-2 px-5 bg-gray-800 hover:bg-gray-900 rounded-md text-gray-200">
              {tripDb?.userSelect?.budget}
            </h2>
            <h2 className="p-2 px-5 bg-gray-800 hover:bg-gray-900 rounded-md text-gray-200">
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
