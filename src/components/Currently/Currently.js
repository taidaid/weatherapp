import React, { useState } from "react";
import "./Currently.css";
import SmoothCollapse from "react-smooth-collapse";

const Currently = ({ forecast, getIcon }) => {
  const [currentlyExpanded, setCurrentlyExpanded] = useState(false);

  return (
    <div className="currently">
      <div
        className="currently-section-title"
        onClick={() => setCurrentlyExpanded(!currentlyExpanded)}
      >
        <h3>{currentlyExpanded ? "-" : "+"}Currently</h3>
        {<div>{getIcon(forecast.icon)}</div>}
        <h6 className="summary">({forecast.summary})</h6>
      </div>

      {/* {console.log("currently", forecast)} */}

      <SmoothCollapse expanded={currentlyExpanded}>
        <div className="currently-description">
          <div className="descriptor">
            Temperature: {Math.floor(forecast.temperature)}°F
          </div>
          <div className="descriptor">Humidity: {forecast.humidity * 100}%</div>
          <div className="descriptor">
            Chance of Precipitation: {forecast.precipProbability * 100}%
          </div>

          {forecast.precipType ? (
            <div className="descriptor">
              Precipitation Type: {forecast.precipType}
            </div>
          ) : null}

          <div className="descriptor">
            Wind Direction: {forecast.windDirection}
          </div>
          <div className="descriptor">Wind Gust: {forecast.windGust}mph</div>
          <div className="descriptor">Wind Speed: {forecast.windSpeed}mph</div>
        </div>
      </SmoothCollapse>
    </div>
  );
};

export default Currently;
