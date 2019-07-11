import React, { useState } from "react";
import "./Currently.css";
import SmoothCollapse from "react-smooth-collapse";

const Currently = ({ forecast, getIcon }) => {
  const [currentlyExpanded, setCurrentlyExpanded] = useState(false);

  const expandCurrently = () => {
    setCurrentlyExpanded(!currentlyExpanded);
  };

  return (
    <div className="currently">
      <div
        className="currently-section-title"
        onClick={() => expandCurrently(!currentlyExpanded)}
      >
        <h3>{currentlyExpanded ? "-" : "+"}Currently</h3>
        {<div>{getIcon(forecast.icon)}</div>}
        <h6 id="summary">({forecast.summary})</h6>
      </div>

      {/* {console.log("currently", forecast)} */}

      <SmoothCollapse expanded={currentlyExpanded}>
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
      </SmoothCollapse>
    </div>
  );
};

export default Currently;
