import React, { useState } from "react";
import "./Currently.css";
// import moon from "../../assets/Moon.svg";
import rain from "../../assets/Cloud-Drizzle.svg";
import cloudSun from "../../assets/Cloud-Sun.svg";

const Currently = ({ forecast }) => {
  const [currentlyExpand, setCurrentlyExpand] = useState(false);
  // const getCurrentlyAsArray = () => {
  //   const currently = Object.keys(forecast.currently).map(function(key) {
  //     return [`${key}: `, forecast.currently[key]];
  //   });
  //   console.log(currently);
  //   return currently;
  // };
  // const currentlyDescription = getCurrentlyAsArray();
  const getIcon = icon => {
    switch (icon) {
      case "rain":
        console.log("rain", icon);
        return <img src={rain} alt="rain" />;
      case "partly-cloudy-day":
        console.log("partly-cloudy-day", icon);
        return <img src={cloudSun} alt="rain" />;

      default:
        console.log("unknown");
    }
  };
  return (
    <div
      className="currently"
      onClick={() => setCurrentlyExpand(!currentlyExpand)}
    >
      <div id="currently-section-title">
        <h3>{currentlyExpand ? "-" : "+"}Currently</h3>
        {forecast.icon ? <div>{getIcon(forecast.icon)}</div> : null}
      </div>

      <h5>Summary: {forecast.summary}</h5>
      <div className="currently-description">
        {console.log("currently", forecast)}

        {currentlyExpand ? (
          <ul>
            <li className="descriptor">Temperature: {forecast.temperature}</li>
            <li className="descriptor">Humidity: {forecast.humidity}</li>
            <li className="descriptor">
              Chance of Precipitation: {forecast.precipProbability}
            </li>
            <li className="descriptor">
              Precipitation Type: {forecast.precipType}
            </li>

            <li className="descriptor">
              Wind Direction: {forecast.windDirection}
            </li>
            <li className="descriptor">Wind Gust: {forecast.windGust}</li>
            <li className="descriptor">Wind Speed: {forecast.windSpeed}</li>
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default Currently;
