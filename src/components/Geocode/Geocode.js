import React, { useState } from "react";
import "./Geocode.css";
import opencage from "opencage-api-client";

const Geocode = ({ apiKey, getForecast, units, handleUnitChange }) => {
  const [locationQuery, setLocationQuery] = useState("");
  const [queryResultName, setQueryResultName] = useState("");

  //gets the coordinates for the given name
  const getGeocode = () => {
    opencage
      .geocode({ key: apiKey, q: locationQuery, language: "en" })
      .then(response => {
        console.log(response);
        const latitude = response.results[0].geometry.lat;
        const longitude = response.results[0].geometry.lng;
        const city =
          response.results[0].components.city ||
          response.results[0].components.unknown;
        const state = response.results[0].components.state;
        const country = response.results[0].components.country;
        setQueryResultName(`${city}, ${state}, ${country}`);
        getForecast({ latitude, longitude });
        return {
          lat: latitude,
          lng: longitude,
        };
      })
      .catch(error => {
        setQueryResultName("No results");
        console.log(error);
      });
  };

  // //formats
  // const displayQueryResult = () => {
  //   if (queryResultName.length > 0 && queryResultName !== "No results") {
  //     const queryResultArray = queryResult.split(",");
  //     //display latitude result
  //     const latitude =
  //       queryResultArray[0] > 0
  //         ? `${queryResultArray[0]}°N`
  //         : `${queryResultArray[0]}°S`;
  //     //display longitude result
  //     const longitude =
  //       queryResultArray[1] > 0
  //         ? `${queryResultArray[1]}°E`
  //         : `${queryResultArray[1]}°W`;
  //     return [latitude, longitude];
  //   } else {
  //     return null;
  //   }
  // };

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
      {queryResultName.length > 0 ? <h6>{queryResultName}</h6> : null}

      <div className="location-buttons">
        <button className="forecast-button" onClick={getGeocode}>
          Get Forecast
        </button>
      </div>
    </div>
  );
};

export default Geocode;
