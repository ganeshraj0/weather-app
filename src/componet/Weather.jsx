import React, { useEffect, useRef, useState } from "react";
import search_icon from "../assets/search.png";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";
import "./weather.css";

const Weather = () => {
  const inputRef = useRef();

  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "010d": rain,
    "010n": rain,
    "013d": snow,
    "013n": snow,
  };

  const [weatherData, setWeatherData] = useState(false);
  const search = async (city) => {
    if (city === "") {
      alert("Enter Any City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather date");
    }
  };
  useEffect(() => {
    search("Landon");
  }, []);

  return (
    <div className="weather place-self-center p-10 rounded-10 items-center flex flex-col sm:p-20">
      <div className="flex items-center gap-[12px]">
        <input
          ref={inputRef}
          className="h-[50px] rounded-full border-none outline-none 
          px-[25px] text-[#6262621] text-[18px]  bg-[#ebfffc]"
          type="text"
          placeholder="search"
          onCanPlay={() => search(inputRef.current.value)}
        />
        <img
          className="w-[50px] p-[15px] rounded-[50%] bg-[#ebfffc] cursor-pointer"
          src={search_icon}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img
            className="w-[150px] m-[30px 0] "
            src={weatherData.icon}
            alt=""
          />
          <p className="text-[#fff] text-[80px] leading-none ">
            {weatherData.temperature}°c
          </p>
          <p className="text-[#fff] text-[40px]">{weatherData.location}</p>
          {/* ..........Weather datee........... */}
          <div className="w-[100%] mt-[40px] text-[#fff] flex justify-between">
            <div className="flex items-start gap-[22px] text-[22px]">
              <img className="w-[26px] mt-[10px]" src={humidity} alt="" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span className="inline-block text-[16px]">Humidity</span>
              </div>
            </div>
            {/* wind*/}
            <div className="flex items-start gap-[22px] text-[22px]">
              <img className="w-[26px] mt-[10px]" src={wind} alt="" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span className="inline-block text-[16px]">Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
