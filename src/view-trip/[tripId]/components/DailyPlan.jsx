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
          `https://pixabay.com/api/?key=${API_KEY}&q=${tripDb?.userSelect?.destination}&image_type=photo&per_page=15`
        );
        setImages(response.data.hits);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="p-5 min-h-screen">
      <h2 className="font-bold text-3xl underline mb-5 text-center text-gray-800">
        Places to Explore
      </h2>

      <div>
        {tripDb?.tripDetails?.dayWisePlan?.map((day, index) => (
          <div key={index} className="p-5">
            <h2 className="font-semibold text-xl text-gray-700 mb-5 border-2 px-7 py-2 inline-block border-b-blue-500 border-t-green-500 border-l-yellow-500 border-r-orange-500">
              Day {day?.day}
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 grid-cols-1 py-2">
              {day?.activities?.map((place, idx) => (
                <div
                  key={idx}
                  className="flex flex-wrap gap-2 items-center justify-center border p-4 rounded-lg shadow-sm hover:shadow-md duration-200 hover:bg-gray-100"
                >
                  {images.length > 0 && (
                    <img
                      src={
                        images[Math.floor(Math.random() * images.length)]
                          .webformatURL
                      }
                      alt="Location"
                      className="w-full h-32 rounded-sm object-cover "
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800">
                      {place.placeName}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {place.details}
                    </p>
                    <p className="text-sm font-medium">
                      Time:{" "}
                      <span className="text-green-500 ">{place.time}</span>
                    </p>
                    <Button className="mt-2">
                      <a
                        href={
                          "https://www.google.com/maps/search/?api=1&query=" +
                          place?.placeName
                        }
                        target="_blank"
                      >
                        Map
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
