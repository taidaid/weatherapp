import React, { useState } from "react";
import opencage from "opencage-api-client";

const Geocode = ({ apiKey }) => {
  //   const [latitude, setLatitude] = useState(40.7128);
  //   const [longitude, setLongitude] = useState(74.006);
  //   const [northSouth, setNorthSouth] = useState("north");
  //   const [eastWest, setEastWest] = useState("west");
  const [locationQuery, setLocationQuery] = useState("");
  const [queryResult, setQueryResult] = useState("");

  //   const handleNorthSouthEastWestValueChanges = () => {
  //     let latitudeForGeocode = latitude;
  //     let longitudeForGeocode = longitude;
  //     if (northSouth === "south" && latitude > 0) {
  //       latitudeForGeocode = latitudeForGeocode * -1;
  //     }
  //     if (eastWest === "west" && longitude > 0) {
  //       longitudeForGeocode = longitudeForGeocode * -1;
  //     }
  //     return { latitudeForGeocode, longitudeForGeocode };
  //   };

  const getGeocode = () => {
    console.log(locationQuery);
    opencage
      .geocode({ key: apiKey, q: locationQuery, language: "en" })
      .then(response => {
        console.log(response);
        setQueryResult(
          `${response.results[0].geometry.lat}, ${
            response.results[0].geometry.lng
          }`
        );
        return {
          lat: response.results[0].geometry.lat,
          lng: response.results[0].geometry.lng,
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
    <div className="location">
      <div className="location-input-container">
        <h6>Find coordinates for a location</h6>
        <div className="location-input">
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
      </div>
      {displayQueryResult() ? (
        <p>
          {displayQueryResult()[0]}, {displayQueryResult()[1]}
        </p>
      ) : (
        queryResult
      )}

      <div className="location-buttons">
        <button className="forecast-button" onClick={getGeocode}>
          Get Coordinates
        </button>
      </div>
    </div>
  );
};

export default Geocode;
