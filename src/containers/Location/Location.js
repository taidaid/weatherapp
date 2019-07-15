import React, { useState } from "react";
import "./Location.css";
import SmoothCollapse from "react-smooth-collapse";
import Geocode from "../../components/Geocode/Geocode";
import Coords from "../../components/Coords/Coords";

const Location = ({
  latitude,
  longitude,
  handleLatitudeChange,
  handleLongitudeChange,
  newLocationForecast,
  getLocalForecast,
  handleNorthSouthChange,
  handleEastWestChange,
  northSouth,
  eastWest,
  handleUnitChange,
  units,
  apiKey,
  clearCoords,
}) => {
  const [geocodeExpanded, setGeocodeExpanded] = useState(true);
  const [coordsExpanded, setCoordsExpanded] = useState(false);
  const [localExpanded, setLocalExpanded] = useState(false);

  return (
    <div className="location-section">
      <div className="coords-container">
        <h6
          className="location-section-title"
          onClick={() => setCoordsExpanded(!coordsExpanded)}
        >
          {coordsExpanded ? "-" : "+"}Get Forecast by Coordinates
        </h6>
        <SmoothCollapse expanded={coordsExpanded}>
          <Coords
            latitude={latitude}
            longitude={longitude}
            northSouth={northSouth}
            eastWest={eastWest}
            units={units}
            handleLatitudeChange={handleLatitudeChange}
            handleNorthSouthChange={handleNorthSouthChange}
            handleLongitudeChange={handleLongitudeChange}
            handleEastWestChange={handleEastWestChange}
            handleUnitChange={handleUnitChange}
            newLocationForecast={newLocationForecast}
          />
        </SmoothCollapse>
      </div>
      <div className="geocode-container">
        <h6
          className="location-section-title"
          onClick={() => setGeocodeExpanded(!geocodeExpanded)}
        >
          {geocodeExpanded ? "-" : "+"}Get Forecast by Name
        </h6>
        <SmoothCollapse expanded={geocodeExpanded}>
          <Geocode
            apiKey={apiKey}
            newLocationForecast={newLocationForecast}
            units={units}
            handleUnitChange={handleUnitChange}
          />
        </SmoothCollapse>
      </div>
      <div className="local-container">
        <h6
          className="location-section-title"
          onClick={() => setLocalExpanded(!localExpanded)}
        >
          {localExpanded ? "-" : "+"}Get Your Local Forecast
        </h6>
        <SmoothCollapse expanded={localExpanded}>
          <div className="input-fields">
            <label className="location-label" htmlFor="selecton-units">
              units:{" "}
            </label>

            <select
              className="select-units"
              id="selecton-units"
              value={units}
              onChange={e => handleUnitChange(e.target.value)}
            >
              <option value="us">US</option>
              <option value="si">Metric</option>
            </select>
          </div>
          <button className="forecast-button" onClick={getLocalForecast}>
            Use My Location
          </button>
        </SmoothCollapse>
      </div>
    </div>
  );
};

export default Location;
