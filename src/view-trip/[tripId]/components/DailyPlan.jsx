import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkedAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";

function DailyPlan({ tripDb }) {
  const [images, setImages] = useState([]);
  const API_KEY = "47239048-5cafadd9dcf72423ccb93e76f"; // Replace this with a secure method for production

  // Fetch images from Pixabay
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
            tripDb.userSelect.destination
          )}&image_type=photo&per_page=15`
        );
        setImages(response.data.hits);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <h2 className="font-bold text-2xl mb-5 text-start text-gray-800">
        Places to Visit
      </h2>

      <div className="space-y-10">
        {tripDb?.tripDetails?.dayWisePlan?.map((day, index) => (
          <div key={index} className="shadow-md p-5 bg-white rounded-lg">
            <h2 className="font-semibold text-xl text-gray-700 mb-4">
              Day {day?.day}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 grid-cols-1">
              {day?.activities?.map((place, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-4 border p-4 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  {/* Display a random image from the fetched images */}
                  {images.length > 0 && (
                    <img
                      src={
                        images[Math.floor(Math.random() * images.length)]
                          .webformatURL
                      }
                      alt="Location"
                      className="w-32 h-32 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800">
                      {place.placeName}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {place.details}
                    </p>
                    <p className="text-sm text-green-500 font-medium">
                      Time: {place.time}
                    </p>
                    <Button className="mt-2">
                      <a
                        href={
                          "https://www.google.com/maps/search/?api=1&query=" +
                          place?.placeName
                        }
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
