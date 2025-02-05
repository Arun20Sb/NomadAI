import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const AutocompleteInput = ({ apiKey, onChange }) => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Initialize the map only if it hasn't been initialized already
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([51.505, -0.09], 13);
      L.tileLayer(
        `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`,
        {
          attribution: "Powered by Geoapify",
        }
      ).addTo(mapRef.current);
    }

    // Cleanup the map instance on component unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove(); // Destroys the map instance
        mapRef.current = null; // Resets the reference
      }
    };
  }, [apiKey]);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    if (onChange) onChange(text);

    if (!text) {
      setSuggestions([]);
      return;
    }

    fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const newSuggestions = data.features.map((feature) => ({
          name: feature.properties.formatted,
          lat: feature.geometry.coordinates[1],
          lon: feature.geometry.coordinates[0],
        }));
        setSuggestions(newSuggestions);
      })
      .catch((err) => console.error("Error fetching suggestions:", err));
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion.name);
    setSuggestions([]);

    if (onChange) onChange(suggestion.name);

    if (markerRef.current) {
      mapRef.current.removeLayer(markerRef.current);
    }

    markerRef.current = L.marker([suggestion.lat, suggestion.lon]).addTo(
      mapRef.current
    );
    mapRef.current.setView([suggestion.lat, suggestion.lon], 13);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter any location 😉"
        value={searchText}
        onChange={handleInputChange}
        style={{ padding: "10px", width: "100%" }}
        className="font-semibold bg-gray-900"
      />
      <ul
        style={{
          listStyleType: "none",
          padding: "0",
          margin: "0",
          maxHeight: "150px",
          overflowY: "auto",
          border: "1px solid #ccc",
        }}
      >
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            style={{
              padding: "10px",
              cursor: "pointer",
              borderBottom: "1px solid #eee",
            }}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion.name}
          </li>
        ))}
      </ul>
      <div id="map" style={{ height: "400px", marginTop: "11px" }}></div>
    </div>
  );
};

export default AutocompleteInput;
