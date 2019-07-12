import React from "react";
import "./Location.css";
// import sampleForecast from "../../assets/sample.json";

const Location = ({
  latitude,
  longitude,
  handleLatitudeChange,
  handleLongitudeChange,
  newLocationForecast,
  setDefaultForecast,
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
          <label for="latitude">latitude: </label>
          <input
            className="location-input-field"
            type="number"
            value={latitude}
            name="latitude"
            id="latitude"
            onChange={e => handleLatitudeChange(e.target.value)}
          />
        </div>
        <div className="location-input">
          <label for="longitude">longitude: </label>
          <input
            className="location-input-field"
            type="number"
            value={longitude}
            name="longitude"
            id="longitude"
            onChange={e => handleLongitudeChange(e.target.value)}
          />
        </div>
      </div>
      <button className="forecast-button" onClick={handleSubmit}>
        Forecast
      </button>
      <button className="forecast-button" onClick={setDefaultForecast}>
        Use My Location
      </button>
    </div>
  );
};

export default Location;
