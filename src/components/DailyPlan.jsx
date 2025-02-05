import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkedAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

function DailyPlan({ tripDb }) {
  const [images, setImages] = useState([]);

  // Fetch images from Pixabay
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=${API_KEY}&q=${tripDb?.userSelect?.destination}+hotels&image_type=photo&per_page=15`
        );
        console.log(response.data);
        setImages(response.data.hits);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Places to Explore
      </h2>

      <div className="space-y-10">
        {tripDb?.tripDetails?.dayWisePlan?.map((day, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <h2 className="font-semibold text-2xl text-gray-800 mb-4">
              Day {day?.day}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {day?.activities?.map((place, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-4 items-center justify-between bg-gray-100 p-4 rounded-xl shadow-md hover:shadow-lg duration-300 hover:bg-gray-200 transition-all"
                >
                  <img
                    src={
                      images[Math.floor(Math.random() * images.length)]
                        ?.webformatURL ||
                      "https://cdn.pixabay.com/photo/2017/07/22/22/18/map-2530069_640.jpg"
                    }
                    alt=""
                    className="w-full h-40 rounded-lg object-cover"
                  />
                  <div className="flex-1 text-center">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {place.placeName}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">
                      {place.details}
                    </p>
                    <p className="text-sm text-gray-700 mt-2 font-medium">
                      Time: <span className="text-green-600">{place.time}</span>
                    </p>
                    <Button
                      variant="outline"
                      color="blue"
                      className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg text-gray-800 hover:bg-blue-100 transition-all"
                    >
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on Map
                      </a>
                      <FaMapMarkedAlt />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyPlan;
