import { useState, useEffect } from "react";

import "./App.css";
// import "../style/style.css"
// Import the images using the correct path
import sunnyImage from "../asset/Sunny.png";
import partlySunnyImage from "../asset/Partly Sunny.png";
import partlyCloudyImage from "../asset/Partly Cloudy.png";
import cloudyImage from "../asset/Cloudy.png";
import mostlyCloudyImage from "../asset/Mostly Cloudy.png";
import overcastImage from "../asset/Overcast.png";
import rainImage from "../asset/Rain.png";
import lightRainImage from "../asset/Light Rain.png";
import heavyRainImage from "../asset/Heavy Rain.png";
import showersImage from "../asset/Showers.png";
import thunderstormsImage from "../asset/Thunderstorms.png";
import snowImage from "../asset/Snow.png";
import lightSnowImage from "../asset/Light Snow.png";
import heavySnowImage from "../asset/Heavy Snow.png";
import sleetImage from "../asset/Sleet.png";
import fogImage from "../asset/Fog.png";
import hazeImage from "../asset/Haze.png";
import windyImage from "../asset/Windy.png";
import clearImage from "../asset/Clear.png";
import hotImage from "../asset/Hot.png";
import coldImage from "../asset/Cold.png";
import breezyImage from "../asset/Breezy.png";

// Map weather conditions to imported images
const weatherBackgrounds = {
  Sunny: sunnyImage,
  "Partly sunny": partlySunnyImage,
  "Partly cloudy": partlyCloudyImage,
  Cloudy: cloudyImage,
  "Mostly cloudy": mostlyCloudyImage,
  Overcast: overcastImage,
  Rain: rainImage,
  "Light rain": lightRainImage,
  "Heavy rain": heavyRainImage,
  Showers: showersImage,
  Thunderstorms: thunderstormsImage,
  Snow: snowImage,
  "Light snow": lightSnowImage,
  "Heavy snow": heavySnowImage,
  Sleet: sleetImage,
  Fog: fogImage,
  Haze: hazeImage,
  Windy: windyImage,
  Clear: clearImage,
  Hot: hotImage,
  Cold: coldImage,
  Breezy: breezyImage,
};

function App() {
  const [data, setData] = useState(null);
  const [icon, setIcon] = useState(null);
  const [bg, setBG] = useState(null);

  async function getData() {
    console.log("Fetching data...");

    let response = await fetch(
      `http://dataservice.accuweather.com/currentconditions/v1/28143?apikey=ZsGjZnOIqA0W478IRnGAwmotrBTF4RD3`
    );

    let res = await response.json();
    console.log(res[0].WeatherText);

    setData(res);

    // Set the background image based on WeatherText
    const weatherText = res[0].WeatherText;
    if (weatherText == "Mostly Cloudy") {
      console.log("equal");
    } else {
      console.log(`fetch ${weatherText}` );
      console.log( "hard Mostly Cloudy");
    }
    // console.log(weatherText)
    // console.log(weatherBackgrounds[sunnyImage]);

    // console.log(weatherBackgrounds[weatherText]);

    setBG(weatherBackgrounds[weatherText] || sunnyImage); // Fallback to sunnyImage if not found

    // Ensure icon is always two digits
    const iconNumber = res[0].WeatherIcon.toString().padStart(2, "0");
    setIcon(iconNumber);
  }

  useEffect(() => {
    getData();
  }, []); // The empty array makes sure this runs only once after the first render

  return (
    <>
   <div className="container">
  {data ? (
    <>
      <div
        className="bg"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          position: "absolute", // Position it absolutely
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1, // Send it behind the text
        }}
      />
      <h1 className="centered-text">
        <img
          src={`https://developer.accuweather.com/sites/default/files/${icon}-s.png`}
          alt="Weather icon"
          className="weather-icon"
        />
        {data[0].Temperature.Metric.Value}°C{" "}
      </h1>
    </>
  ) : (
    <h1>Loading...</h1>
  )}
</div>

    </>
  );
}

export default App;
