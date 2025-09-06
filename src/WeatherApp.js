import React, { useState } from "react";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "15a8ff37589c1d500266e9de516d0d3b";

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
    <div className="weather-container">
      <h1 className="weather-title">🌤 Weather Checker</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Check</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>{weather.main?.temp ?? "--"}°C</p>
          <p className="capitalize">{weather.weather?.[0]?.description ?? ""}</p>

          {weather.weather?.[0]?.icon ? (
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
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
