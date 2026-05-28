import React, { useState } from "react";
import axios from "axios";

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
];

const ForestFire = () => {
  const [city, setCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  // Handle the state selection with auto-completion
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedState) {
      setError("Please select a state.");
      return;
    }

    setError(""); // Clear previous errors

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
      const response = await axios.post(`${API_URL}/predict`, {
        model_type: "forestfire",
        state: selectedState,
      });
      const risk = response.data.predicted_risk_level;
      setResult(risk);

      // Determine risk level based on response
      setRiskLevel(risk);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      alert("Failed to get prediction. Check the backend server.");
    }
  };

  const handleClear = () => {
    setCity("");
    setSelectedState("");
    setResult(null);
    setRiskLevel("");
    setError("");
  };

  return (
    <div className="flex items-center h-screen mt-10">
      {/* Left-Aligned Form */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-[450px] h-[500px] ml-10 relative">
        {/* Clear Button */}
        <button
          onClick={handleClear}
          className="absolute top-2 right-2 m-2 text-lg text-red-500 text-gray-500"
        >
          Clear
        </button>
        <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Forest Fire Prediction
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter City"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              list="states"
              value={selectedState}
              onChange={handleStateChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <datalist id="states">
              {states.map((state) => (
                <option key={state} value={state} />
              ))}
            </datalist>
          </div>
          {error && (
            <div className="text-red-500 text-sm font-medium">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-[#1e181a] font-medium text-white py-2 px-4 rounded-md transition duration-200"
          >
            Predict
          </button>
        </form>
        {result && (
          <div className="mt-2 p-4 rounded-md shadow-inner text-center">
            <h2 className="text-lg font-semibold">Predicted Risk Level:</h2>
            <p
              className={`mt-2 text-lg font-medium ${
                riskLevel === "Low" ? "text-green-500" : "text-red-500"
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
            src="/forest_fire_risk_map.html"
            title="Forest Fire Risk Map"
            className="w-full h-full rounded-lg shadow-inner"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ForestFire;
