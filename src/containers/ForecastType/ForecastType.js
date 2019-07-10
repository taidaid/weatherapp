import React, { useState } from "react";
import "./ForecastType.css";

const ForecastType = ({ forecast, forecastType }) => {
  const [forecastExpand, setForecastExpand] = useState(false);
  // console.log("forecastType keys", Object.keys(forecast));
  const getForecastAsArray = () => {
    // console.log(forecast);
    if (Object.keys(forecast).length !== 0) {
      const forecastTypeArray = Object.keys(forecast).map(function(key) {
        return [`${key}: `, forecast[key]];
      });
      console.log("forecastTypeArray", forecastTypeArray);
      return forecastTypeArray;
    } else {
      return [];
    }
  };
  const forecastDescription = getForecastAsArray();
  const forecastTitle =
    forecastType.charAt(0).toUpperCase() +
    forecastType.slice(1, forecastType.length);
  return (
    <div
      className={forecastType}
      key={forecastType}
      onClick={() => setForecastExpand(!forecastExpand)}
    >
      <h3
        key={`${forecastType}-title`}
        className={`forecastType-section-title`}
      >
        {forecastExpand ? "-" : "+"}
        {`${forecastTitle}`}
      </h3>
      <div
        key={`${forecastType}-descriptor`}
        className={`forecastType-description`}
      >
        {forecastExpand
          ? forecastDescription.map((descriptor, index) => (
              <h5
                className="descriptor"
                key={`${forecastType}-descriptor-${index}`}
              >
                {console.log(descriptor)}
                {JSON.stringify(descriptor).replace(/[[\]",]+/g, "")}
              </h5>
            ))
          : ""}
      </div>
    </div>
  );
};

export default ForecastType;
