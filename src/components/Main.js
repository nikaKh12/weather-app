import React, { useState } from "react";

export default function Main() {
  const [weather, setWeather] = useState([]);
  const [metric, setMetric] = useState("");
  const [weatherState, setWeatherState] = useState("");
  const [weatherImage, setWeatherImage] = useState("");
  const [country, setCountry] = useState("");
  const key = "3e2bc5cba53fb80baf9b06766721c17c";
  const input = document.querySelector(".input");
  const getWeather = async (event) => {
    event.preventDefault();
    let city = event.target.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setWeather(data);
      setMetric(data.main.temp);
      setCountry(data.sys.country);
      setWeatherState(data.weather[0].description);
      setWeatherImage(
        `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
    } catch (err) {
      console.clear();
    }
  };
  let today = new Date().toISOString().slice(0, 10);
  return (
    <>
      <input
        className="input"
        type="text"
        onChange={getWeather}
        placeholder="Enter a city"
        name="mainInput"
      />
      {weather.cod !== "404" && (
        <div className="info puff-in-center">
          {input && input.value !== "" && (
            <h1 className="title">
              {weather.name}, {country}
            </h1>
          )}
          {input && input.value !== "" ? (
            <h2 className="date">{today}</h2>
          ) : (
            <h2 className="date"></h2>
          )}
          {input && input.value !== "" && (
            <div className="weather">
              <h1>{metric}°</h1>
              <img className="weatherImg" src={weatherImage} alt="" />
            </div>
          )}
          {input && input.value !== "" ? (
            <h3 className="weatherState">
              {weatherState.charAt(0).toUpperCase() + weatherState.slice(1)}
            </h3>
          ) : (
            <h3 className="weatherState"></h3>
          )}
        </div>
      )}
    </>
  );
}
