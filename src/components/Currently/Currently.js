import React, { useState } from "react";
import "./Currently.css";
import SmoothCollapse from "react-smooth-collapse";

const Currently = ({ forecast, getIcon, units }) => {
  const [currentlyExpanded, setCurrentlyExpanded] = useState(false);

  return (
    <div className="forecast-section">
      <div
        className="forecast-section-title-summary"
        onClick={() => setCurrentlyExpanded(!currentlyExpanded)}
      >
        <h3 className="section-title">
          {currentlyExpanded ? "-" : "+"}Currently
        </h3>
        {getIcon(forecast.icon)}
        <h6 className="summary">{forecast.summary}</h6>
      </div>

      <SmoothCollapse
        expanded={currentlyExpanded}
        style={{ overflow: "visible" }}
      >
        <div className="currently-description">
          <div className="currently-descriptor">
            Temperature:{" "}
            {units === "us" ? (
              <>{Math.round(forecast.temperature)}°F</>
            ) : (
              <>{Math.round(((forecast.temperature - 32) * 5) / 9)}°C</>
            )}
          </div>
          <div className="currently-descriptor">
            Humidity: {Math.round(forecast.humidity * 100)}%
          </div>
          <div className="currently-descriptor">
            Chance of Precipitation:{" "}
            {Math.round(forecast.precipProbability * 100)}%
          </div>

          {forecast.precipType ? (
            <div className="currently-descriptor">
              Precipitation Type: {forecast.precipType}
            </div>
          ) : null}

          <div className="currently-descriptor">
            Wind Direction: {forecast.windDirection}
          </div>
          <div className="currently-descriptor">
            Wind Gust:{" "}
            {units === "us" ? (
              <>{Math.round(forecast.windGust)}mph</>
            ) : (
              <>{Math.round(forecast.windGust * 0.44704)}mps</>
            )}
          </div>
          <div className="currently-descriptor">
            Wind Speed:{" "}
            {units === "us" ? (
              <>{Math.round(forecast.windSpeed)}mph</>
            ) : (
              <>{Math.round(forecast.windSpeed * 0.44704)}mps</>
            )}
          </div>
        </div>
      </SmoothCollapse>
    </div>
  );
};

export default Currently;
