import React, { useState } from "react";
import "./Currently.css";

const Currently = ({ forecast, getIcon }) => {
  const [currentlyExpand, setCurrentlyExpand] = useState(false);

  return (
    <div className="currently">
      <div
        id="currently-section-title"
        onClick={() => setCurrentlyExpand(!currentlyExpand)}
      >
        <h3>{currentlyExpand ? "-" : "+"}Currently</h3>
        {<div>{getIcon(forecast.icon)}</div>}
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
