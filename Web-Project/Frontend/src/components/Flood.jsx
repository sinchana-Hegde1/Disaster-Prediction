import React, { useState } from "react";
import axios from "axios";

const FloodPredictionForm = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [elevation, setElevation] = useState("");
  const [riverDischarge, setRiverDischarge] = useState("");
  const [result, setResult] = useState(null);
  const [riskLevel, setRiskLevel] = useState("");
  const [error, setError] = useState("");

  // Latitude and Longitude constraints for India
  const isWithinIndia = (lat, long) => {
    return lat >= 6.0 && lat <= 37.0 && long >= 68.0 && long <= 97.0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate latitude and longitude
    if (!isWithinIndia(parseFloat(latitude), parseFloat(longitude))) {
      setError(
        "This model is only made for Indian locations. Use Latitude and Longitude Values for India only."
      );
      return;
    }

    setError(""); // Clear previous errors

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
      const response = await axios.post(`${API_URL}/predict`, {
        model_type: "flood",
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        rainfall_mm: parseFloat(rainfall),
        elevation_m: parseFloat(elevation),
        river_discharge_m3_s: parseFloat(riverDischarge),
      });
      const floodRisk = response.data.predicted_flood_risk;
      setResult(floodRisk);

      // Determine risk level
      if (floodRisk < 0.3) {
        setRiskLevel("Low Risk");
      } else if (floodRisk >= 0.3 && floodRisk <= 0.6) {
        setRiskLevel("Moderate Risk");
      } else {
        setRiskLevel("High Risk");
      }
    } catch (error) {
      console.error("Error fetching prediction:", error);
      alert("Failed to get prediction. Check the backend server.");
    }
  };

  const handleClear = () => {
    setLatitude("");
    setLongitude("");
    setRainfall("");
    setElevation("");
    setRiverDischarge("");
    setResult(null);
    setRiskLevel("");
    setError("");
  };

  return (
    <div className="flex items-center h-screen mt-10 ">
      {/* Left-Aligned Form */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-[450px] h-[600px] ml-10  relative">
        {/* Clear Button */}
        <button
          onClick={handleClear}
          className="absolute top-2 right-2 m-2 text-lg text-red-500 text-gray-500 "
        >
          Clear
        </button>
        <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Flood Prediction
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="Enter Latitude"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="Enter Longitude"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rainfall (in mm)
            </label>
            <input
              type="number"
              step="any"
              value={rainfall}
              onChange={(e) => setRainfall(e.target.value)}
              placeholder="Enter Rainfall"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Elevation (in meters)
            </label>
            <input
              type="number"
              step="any"
              value={elevation}
              onChange={(e) => setElevation(e.target.value)}
              placeholder="Enter Elevation"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              River Discharge (in m³/s)
            </label>
            <input
              type="number"
              step="any"
              value={riverDischarge}
              onChange={(e) => setRiverDischarge(e.target.value)}
              placeholder="Enter River Discharge"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm font-medium">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-[#1e181a] font-medium text-white py-1 px-4 rounded-md  transition duration-200"
          >
            Predict
          </button>
        </form>
        {result && (
          <div className=" p-4 rounded-md shadow-inner text-center">
            <span className="text-lg font-semibold px-2">
              Predicted Flood Risk:
            </span>
            {result.toFixed(2)}
            <p
              className={`mt-2 text-lg font-medium ${
                riskLevel === "Low Risk"
                  ? "text-green-500"
                  : riskLevel === "Moderate Risk"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {riskLevel}
            </p>
          </div>
        )}
      </div>

      {/* Placeholder for Map View */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full h-[600px] p-4">
          <iframe
            src="/flood_risk_map.html"
            title="Flood Risk Map"
            className="w-full h-full rounded-lg shadow-inner"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default FloodPredictionForm;
