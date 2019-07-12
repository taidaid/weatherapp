import React from "react";
import "./Location.css";

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
}) => {
  //set a new forecast state using current location state
  const handleSubmit = e => {
    e.preventDefault();
    newLocationForecast();
  };

  return (
    <div className="location">
      <div className="location-input-container">
        <div className="location-input">
          <label htmlFor="latitude">latitude: </label>
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

        <div className="location-input">
          <label htmlFor="longitude">longitude: </label>
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

      <button className="forecast-button" onClick={handleSubmit}>
        Forecast
      </button>
      <button className="forecast-button" onClick={getLocalForecast}>
        Use My Location
      </button>
    </div>
  );
};

export default Location;
