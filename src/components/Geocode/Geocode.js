import React, { useState } from "react";
import "./Geocode.css";
import opencage from "opencage-api-client";

const Geocode = ({ apiKey, newLocationForecast, units, handleUnitChange }) => {
  const [locationQuery, setLocationQuery] = useState("");
  const [queryResult, setQueryResult] = useState("");

  const getGeocode = () => {
    console.log(locationQuery);
    opencage
      .geocode({ key: apiKey, q: locationQuery, language: "en" })
      .then(response => {
        console.log(response);
        const newLatitude = response.results[0].geometry.lat;
        const newLongitude = response.results[0].geometry.lng;
        setQueryResult(`${newLatitude}, ${newLongitude}`);
        newLocationForecast({ newLatitude, newLongitude });
        return {
          lat: newLatitude,
          lng: newLongitude,
        };
      })
      .catch(error => {
        setQueryResult("No results");
        console.log(error);
      });
  };

  const displayQueryResult = () => {
    if (queryResult.length > 0 && queryResult !== "No results") {
      const queryResultArray = queryResult.split(",");
      //display latitude result
      const latitude =
        queryResultArray[0] > 0
          ? `${queryResultArray[0]}°N`
          : `${queryResultArray[0]}°S`;
      //display longitude result
      const longitude =
        queryResultArray[1] > 0
          ? `${queryResultArray[1]}°E`
          : `${queryResultArray[1]}°W`;
      return [latitude, longitude];
    } else {
      return null;
    }
  };

  return (
    <div className="geocode">
      <div className="location-input-container">
        <div className="location-input">
          <label className="location-label" htmlFor="location">
            location:{" "}
          </label>
          <div className="input-fields">
            <input
              className="geocode-input-field"
              type="text"
              value={locationQuery}
              name="location"
              id="location"
              onChange={e => setLocationQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="input-fields">
          <label className="location-label" htmlFor="selecton-units">
            units:{" "}
          </label>
          <div className="location-input-field" />
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
      {displayQueryResult() ? (
        <h6>
          {displayQueryResult()[0]}, {displayQueryResult()[1]}
        </h6>
      ) : (
        queryResult
      )}

      <div className="location-buttons">
        <button className="forecast-button" onClick={getGeocode}>
          Get Forecast
        </button>
      </div>
    </div>
  );
};

export default Geocode;
