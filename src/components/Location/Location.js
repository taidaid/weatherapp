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
      <div className="location-input">
        latitude:
        <input
          style={{ textAlign: "center" }}
          type="number"
          value={latitude}
          name="latitude"
          onChange={e => handleLatitudeChange(e.target.value)}
        />
        longitude:
        <input
          style={{ textAlign: "center" }}
          type="number"
          value={longitude}
          name="longitude"
          onChange={e => handleLongitudeChange(e.target.value)}
        />
        <button onClick={handleSubmit}>Forecast</button>
      </div>
    </div>
  );
};

export default Location;
