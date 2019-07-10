import React from "react";
import "./Location.css";
// import sampleForecast from "../../assets/sample.json";

const Location = ({ location, handleChange, newLocation }) => {
  const handleSubmit = e => {
    e.preventDefault();
    newLocation();
  };

  return (
    <div className="location">
      <div className="location-input">
        <input
          style={{ textAlign: "center" }}
          type="text"
          value={JSON.stringify(location)}
          onChange={e => handleChange(e.target.value)}
        />
        <button onClick={e => handleSubmit(e)}>Forecast</button>
      </div>
    </div>
  );
};

export default Location;
