import React, { useState } from "react";
import "./Currently.css";
import SmoothCollapse from "react-smooth-collapse";

const Currently = ({ forecast, getIcon, units }) => {
  const [currentlyExpanded, setCurrentlyExpanded] = useState(false);

  return (
    <div className="currently">
      <div
        className="currently-section-title"
        onClick={() => setCurrentlyExpanded(!currentlyExpanded)}
      >
        <h3>{currentlyExpanded ? "-" : "+"}Currently</h3>
        {<div>{getIcon(forecast.icon)}</div>}
        <h6 className="summary">{forecast.summary}</h6>
      </div>

      {/* {console.log("currently", forecast)} */}

      <SmoothCollapse
        expanded={currentlyExpanded}
        style={{ overflow: "visible" }}
      >
        <div className="currently-description">
          <div className="descriptor">
            Temperature:{" "}
            {units === "us" ? (
              <>{Math.floor(forecast.temperature)}°F</>
            ) : (
              <>{Math.floor(((forecast.temperature - 32) * 5) / 9)}°C</>
            )}
          </div>
          <div className="descriptor">
            Humidity: {Math.floor(forecast.humidity * 100)}%
          </div>
          <div className="descriptor">
            Chance of Precipitation:{" "}
            {Math.floor(forecast.precipProbability * 100)}%
          </div>

          {forecast.precipType ? (
            <div className="descriptor">
              Precipitation Type: {forecast.precipType}
            </div>
          ) : null}

          <div className="descriptor">
            Wind Direction: {forecast.windDirection}
          </div>
          <div className="descriptor">
            Wind Gust:{" "}
            {units === "us" ? (
              <>{Math.floor(forecast.windGust)}mph</>
            ) : (
              <>{Math.floor(forecast.windGust * 0.44704)}mps</>
            )}
          </div>
          <div className="descriptor">
            Wind Speed:{" "}
            {units === "us" ? (
              <>{Math.floor(forecast.windSpeed)}mph</>
            ) : (
              <>{Math.floor(forecast.windSpeed * 0.44704)}mps</>
            )}
          </div>
        </div>
      </SmoothCollapse>
    </div>
  );
};

export default Currently;
