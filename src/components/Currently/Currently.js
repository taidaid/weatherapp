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
      <h5 id="summary">{forecast.summary}</h5>
      {/* {console.log("currently", forecast)} */}

      {currentlyExpand ? (
        <div className="currently-description">
          <div className="descriptor">Temperature: {forecast.temperature}</div>
          <div className="descriptor">Humidity: {forecast.humidity}</div>
          <div className="descriptor">
            Chance of Precipitation: {forecast.precipProbabidivty}
          </div>
          <div className="descriptor">
            Precipitation Type: {forecast.precipType}
          </div>

          <div className="descriptor">
            Wind Direction: {forecast.windDirection}
          </div>
          <div className="descriptor">Wind Gust: {forecast.windGust}</div>
          <div className="descriptor">Wind Speed: {forecast.windSpeed}</div>
        </div>
      ) : null}
    </div>
  );
};

export default Currently;
