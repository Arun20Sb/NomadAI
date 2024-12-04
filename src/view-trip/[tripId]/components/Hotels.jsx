import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import food from "/food.jpg";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

function Hotels({ tripDb }) {
  const [videos, setVideos] = useState([]);

  // Fetch videos from Pixabay
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/videos/?key=${API_KEY}&q=${tripDb?.userSelect?.destination}&per_page=7`
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
      <h2 className="font-bold text-3xl underline mb-8 text-center text-gray-800">
        Hotel Recommendation
      </h2>

      <div className="flex flex-wrap gap-10 items-center justify-evenly">
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
            <div className="relative overflow-hidden border-b-2  border-t-0 transition-transform transform hover:translate-y-1 cursor-pointer bg-white">
              <video
                className="w-full h-48 object-cover border-b-2 pb-2"
                autoPlay
                muted
                playsInline
                loop
                src={videos[index]?.videos?.small?.url}
                alt={`Video for ${hotel?.hotelName}`}
              />
              <div className="p-3 flex flex-col">
                <h2 className="font-semibold text-lg text-gray-800">
                  {hotel?.hotelName}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  <span role="img">📍</span> {hotel?.hotelAddress}
                </p>
                <div className="mt-3 flex justify-between items-center text-gray-800">
                  <p className="font-medium flex items-center">
                    ${hotel?.price} <span role="img">💰</span>
                  </p>
                  <p className="font-medium flex items-center">
                    {hotel?.rating} <span role="img">⭐</span>
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
