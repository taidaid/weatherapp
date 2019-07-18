import React, { useState } from "react";
import "./Geocode.css";
import opencage from "opencage-api-client";

const Geocode = ({
  apiKey,
  getForecast,
  units,
  handleUnitChange,
  getConfidenceLevel,
}) => {
  const [locationQuery, setLocationQuery] = useState("");
  const [queryResultName, setQueryResultName] = useState("");
  const [confidenceLevel, setConfidenceLevel] = useState("");

  //experimental api: gets the coordinates for the given name
  const getReverseGeocode = e => {
    e.preventDefault();
    opencage
      .geocode({ key: apiKey, q: locationQuery, language: "en" })
      .then(response => {
        console.log("geocode", response);
        const latitude = response.results[0].geometry.lat;
        const longitude = response.results[0].geometry.lng;
        const city =
          response.results[0].components.city ||
          response.results[0].components.unknown;
        const state = response.results[0].components.state;
        const country = response.results[0].components.country;
        const newConfidenceLevel = getConfidenceLevel(
          response.results[0].confidence
        );
        setConfidenceLevel(newConfidenceLevel);
        setQueryResultName(`${city}, ${state}, ${country}`);
        getForecast({ latitude, longitude });
        return {
          lat: latitude,
          lng: longitude,
        };
      })
      .catch(error => {
        setConfidenceLevel("");
        setQueryResultName("No results");
        console.log(error);
      });
  };

  return (
    <form className="input-form" onSubmit={e => getReverseGeocode(e)}>
      <div className="location-input-container">
        <div className="input-fields-container">
          <label className="location-label" htmlFor="location">
            location:{" "}
          </label>
          <div className="input-fields">
            <input
              className="location-input-field"
              type="text"
              value={locationQuery}
              name="location"
              id="location"
              onChange={e => setLocationQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="input-fields-container">
          <label className="location-label" htmlFor="geocode-selection-units">
            units:{" "}
          </label>

          <select
            className="select-units"
            id="geocode-selection-units"
            value={units}
            onChange={e => handleUnitChange(e.target.value)}
          >
            <option value="us">US</option>
            <option value="si">Metric</option>
          </select>
        </div>
      </div>
      {queryResultName.length > 0 ? (
        <div className="geocode-query-result">
          Experimental: <p>{queryResultName}</p>
          {confidenceLevel}
        </div>
      ) : null}

      <div className="location-buttons" onClick={e => getReverseGeocode(e)}>
        <div className="forecast-button" type="submit">
          Forecast
        </div>
      </div>
    </form>
  );
};

export default Geocode;
