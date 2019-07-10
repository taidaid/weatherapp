import React, { useState } from "react";
import "./Currently.css";

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
  return (
    <div
      className="currently"
      onClick={() => setCurrentlyExpand(!currentlyExpand)}
    >
      <h3 id="currently-section-title">
        {currentlyExpand ? "-" : "+"}Currently
      </h3>
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
