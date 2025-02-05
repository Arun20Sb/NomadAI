import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaMapMarkerAlt, FaDollarSign, FaStar } from "react-icons/fa"; // Icons for location, price, and rating

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

function Hotels({ tripDb }) {
  const [images, setImages] = useState([]);

  // Fetching images based on the destination
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=${API_KEY}&q=${tripDb?.userSelect?.destination}+cushine&image_type=photo&per_page=7`
        );
        setImages(response.data.hits);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [tripDb?.userSelect?.destination]);

  return (
    <div className="p-8 min-h-screen">
      <h2 className="font-bold text-4xl text-center text-gray-700 mb-12">
        Hotel Recommendations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {tripDb?.tripDetails?.hotels?.map((hotel, index) => (
          <div key={index} className="bg-white rounded-md shadow-lg">
            <div className="relative">
              <img
                src={images[index]?.webformatURL}
                alt={hotel?.hotelName}
                className="w-full h-56 object-cover rounded-md"
              />
              <div className="absolute top-3 left-3 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm">
                {hotel?.rating} <FaStar className="inline ml-1 mb-1" />
              </div>
              <div className="absolute top-3 right-3 transform transition-all hover:animate-bounce">
                <a
                  href={`https://www.google.com/maps?q=${hotel.geoCoordinates.latitude},${hotel.geoCoordinates.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl"
                >
                  🗺️
                </a>
              </div>
            </div>

            <div className="p-6">
              <div className="mt-0 flex justify-between items-center">
                <p className="font-medium text-lg flex items-center text-gray-800">
                  <FaDollarSign className="mr-1" />
                  {hotel?.price}
                </p>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                {hotel?.hotelName}
              </h3>
              <p className="text-gray-600 mt-2 flex items-center">
                <FaMapMarkerAlt className="text-gray-500 mr-2" />
                {hotel?.hotelAddress}
              </p>

              <p className="mt-4 text-gray-700">{hotel?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
