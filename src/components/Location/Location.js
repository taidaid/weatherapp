import React from "react";
import "./Location.css";
// import sampleForecast from "../../assets/sample.json";

const Location = ({
  latitude,
  longitude,
  handleLatitudeChange,
  handleLongitudeChange,
  newLocationForecast,
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
          <div>latitude: </div>
          <input
            className="location-input-field"
            type="number"
            value={latitude}
            name="latitude"
            onChange={e => handleLatitudeChange(e.target.value)}
          />
        </div>
        <div className="location-input">
          <div>longitude: </div>
          <input
            className="location-input-field"
            type="number"
            value={longitude}
            name="longitude"
            onChange={e => handleLongitudeChange(e.target.value)}
          />
        </div>
      </div>
      <button className="forecast-button" onClick={handleSubmit}>
        Forecast
      </button>
    </div>
  );
};

export default Location;
