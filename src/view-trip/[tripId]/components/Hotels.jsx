import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

function Hotels({ tripDb }) {
  const [videos, setVideos] = useState([]);

  // Fetch videos from Pixabay
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/videos/?key=${API_KEY}&q=hotel&per_page=5`
        );
        setVideos(response.data.hits);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <h2 className="font-bold text-xl my-5">Hotel Recommendation</h2>

      <div className="flex flex-wrap items-center justify-evenly">
        {tripDb?.tripDetails?.hotels?.map((hotel, index) => (
          <Link
            key={index}
            to={
              "https://www.google.com/maps/search/?api=1&query=" +
              hotel?.hotelName +
              "," +
              hotel?.hotelAddress
            }
            target="_blank"
          >
            <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer bg-white">
              {/* Display the video as the main content with updated dimensions */}
              {videos.length > 0 && (
                <video
                  className="w-full h-48 object-cover"
                  autoPlay
                  muted
                  playsInline
                  src={videos[index]?.videos?.small?.url}
                  alt={`Video for ${hotel?.hotelName}`}
                />
              )}
              <div className="p-4 flex flex-col">
                <h2 className="font-semibold text-lg text-gray-800 truncate">
                  {hotel?.hotelName}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  <span role="img" aria-label="location">
                    📍
                  </span>{" "}
                  {hotel?.hotelAddress}
                </p>
                <div className="mt-3 flex justify-between items-center text-gray-800">
                  <p className="font-medium">
                    ${hotel?.price}{" "}
                    <span role="img" aria-label="money">
                      💰
                    </span>
                  </p>
                  <p className="font-medium flex items-center">
                    {hotel?.rating}{" "}
                    <span role="img" aria-label="star">
                      ⭐
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
