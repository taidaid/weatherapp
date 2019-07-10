import React from "react";
import "./Location.css";
import sampleForecast from "../../assets/sample.json";

const Location = ({ location, handleChange, handleSubmit }) => {
  return (
    <div className="location">
      <div className="location-name">
        <h2>Location Name</h2>
        <h6>{sampleForecast.timezone}</h6>
      </div>
      <div className="location-input">
        <input
          style={{ textAlign: "center" }}
          type="text"
          value={location}
          onChange={e => handleChange(e.target.value)}
        />
        <button onClick={handleSubmit}>Forecast</button>
      </div>
    </div>
  );
};

export default Location;
