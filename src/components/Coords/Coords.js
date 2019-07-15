import React from "react";
import "./Coords.css";

const Coords = ({
  latitude,
  longitude,
  northSouth,
  eastWest,
  units,
  handleLatitudeChange,
  handleNorthSouthChange,
  handleLongitudeChange,
  handleEastWestChange,
  handleUnitChange,
  newLocationForecast,
}) => {
  return (
    <div className="coords">
      <div className="location-input-container">
        <div className="location-input">
          <label className="location-label" htmlFor="latitude">
            latitude:{" "}
          </label>
          <div className="input-fields">
            <input
              className="location-input-field"
              type="number"
              value={latitude}
              maxLength="7"
              size="7"
              name="latitude"
              id="latitude"
              onChange={e => handleLatitudeChange(e.target.value)}
            />
            <select
              className="select-direction"
              id="selecton-north-south"
              value={northSouth}
              onChange={e => handleNorthSouthChange(e.target.value)}
            >
              <option value="north">N</option>
              <option value="south">S</option>
            </select>
          </div>
        </div>

        <div className="location-input">
          <label className="location-label" htmlFor="longitude">
            longitude:{" "}
          </label>
          <div className="input-fields">
            <input
              className="location-input-field"
              type="number"
              value={longitude}
              maxLength="7"
              size="7"
              name="longitude"
              id="longitude"
              onChange={e => handleLongitudeChange(e.target.value)}
            />{" "}
            <select
              className="select-direction"
              id="selecton-east-west"
              value={eastWest}
              onChange={e => handleEastWestChange(e.target.value)}
            >
              <option value="west">W</option>
              <option value="east">E</option>
            </select>
          </div>
        </div>
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
      </div>
      <div className="location-buttons">
        <button className="forecast-button" onClick={newLocationForecast}>
          Forecast
        </button>
      </div>
    </div>
  );
};

export default Coords;
