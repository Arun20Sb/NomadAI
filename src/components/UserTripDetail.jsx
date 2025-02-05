import React, { useState, useEffect } from "react";
import axios from "axios";
import food from "/hotel.jpg";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

function UserTripDetail({ trip }) {
  const [images, setImages] = useState([]);

  // Fetch images from Pixabay
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
            trip.userSelect.destination
          )}&image_type=photo`
        );
        setImages(response.data.hits);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [trip?.userSelect?.destination]);
  return (
    <div>
      <img
        src={
          images && images.length > 0
            ? images[Math.floor(Math.random() * images.length)]?.webformatURL
            : food
        }
        alt="Location"
        className="h-36 w-full rounded-sm object-cover "
      />

      <div className="mt-1 py-2">
        <h1 className="font-bold text-lg text-gray-800">
          {trip?.userSelect?.destination.toUpperCase()}
        </h1>
        <h2 className="text-md text-gray-500 mb-2">
          {trip?.userSelect?.days} Days trip with {trip?.userSelect?.budget}
        </h2>
        <p className="text-md font-medium">
          Date:{" "}
          <span className="text-green-500">
            {trip?.userSelect?.date?.seconds
              ? new Date(
                  trip.userSelect.date.seconds * 1000
                ).toLocaleDateString()
              : typeof trip?.userSelect?.date === "string"
              ? new Date(trip.userSelect.date).toLocaleDateString()
              : "N/A"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default UserTripDetail;
