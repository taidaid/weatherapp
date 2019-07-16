import React, { useState } from "react";
import "./Coords.css";
import opencage from "opencage-api-client";

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
  apiKey,
  getConfidenceLevel,
}) => {
  const [queryResultName, setQueryResultName] = useState("");
  const [confidenceLevel, setConfidenceLevel] = useState("");

  //experimental api: use the lat/long coords to attempt an location name lookup
  const getForwardGeocode = () => {
    let newLatitude = latitude;
    let newLongitude = longitude;
    //the APIs use positive/negative rather than north/south and east/west.
    //accounts for making lat/long positive/negative according to north/south and east/west state
    newLocationForecast({ newLatitude, newLongitude });
    if (northSouth === "south" && latitude > 0) {
      newLatitude = newLatitude * -1;
    }
    if (eastWest === "west" && longitude > 0) {
      newLongitude = newLongitude * -1;
    }
    console.log("geocode: ", newLatitude, newLongitude);
    opencage
      .geocode({
        key: apiKey,
        q: `${newLatitude}+${newLongitude}`,
        language: "en",
      })
      .then(response => {
        console.log(response);
        const latitude = response.results[0].geometry.lat || null;
        const longitude = response.results[0].geometry.lng || null;
        const city =
          response.results[0].components.city ||
          response.results[0].components.unknown ||
          "unknown";
        const state = response.results[0].components.state;
        const country = response.results[0].components.country;
        const newConfidenceLevel = getConfidenceLevel(
          response.results[0].confidence
        );
        setConfidenceLevel(newConfidenceLevel);
        setQueryResultName(`${city}, ${state}, ${country}`);

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

  return (
    <>
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
      {queryResultName.length > 0 ? (
        <div className="geocode-query-result">
          Experimental: <p>{queryResultName}</p>
          {confidenceLevel}
        </div>
      ) : null}
      <div className="location-buttons">
        <button className="forecast-button" onClick={getForwardGeocode}>
          Forecast
        </button>
      </div>
    </>
  );
};

export default Coords;
