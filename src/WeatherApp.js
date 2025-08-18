import React, { useState } from "react";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "15a8ff37589c1d500266e9de516d0d3b"; // replace with your OpenWeatherMap key

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
      } else {
        setWeather(null);
        setError("City not found!");
      }
    } catch (err) {
      setError("Something went wrong, try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">🌤 Weather Checker</h1>

      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 rounded-lg text-black"
        />
        <button
          onClick={getWeather}
          className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Check
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {weather && (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold">{weather.name}</h2>
          <p className="text-xl">{weather.main?.temp ?? "--"}°C</p>
          <p className="capitalize">{weather.weather?.[0]?.description ?? ""}</p>

          {/* ✅ only render if icon exists */}
          {weather.weather?.[0]?.icon ? (
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="mx-auto"
            />
          ) : (
            <p>No icon available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
