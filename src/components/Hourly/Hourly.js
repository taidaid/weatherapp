import React, { useState } from "react";
import "./Hourly.css";
import SmoothCollapse from "react-smooth-collapse";

const Hourly = ({ forecast, getIcon }) => {
  const [hourlyExpanded, setHourlyExpanded] = useState(false);

  const getHourFromUnixTime = unix_timestamp => {
    const date = new Date(unix_timestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    const formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return formattedTime;
  };

  const hourlyForecast = forecast.data.map((hour, index) => {
    return (
      <div className="hourly-description" key={`${index}`}>
        <h4 className="date-time">{getHourFromUnixTime(hour.time)}</h4>
        <div className="hourly-precip-chance">
          {getIcon("rain")}
          <div className="day-precip-chance-text  ">
            {Math.floor(hour.precipProbability * 100)}%
          </div>
        </div>
        <p className="hourly-summary">{hour.summary}</p>
        <p className="hourly-temp">Temp.: {Math.floor(hour.temperature)}°F</p>
      </div>
    );
  });

  return (
    <div className="hourly">
      <div
        className="hourly-section-title"
        onClick={() => setHourlyExpanded(!hourlyExpanded)}
      >
        <h3>{hourlyExpanded ? "-" : "+"}Hourly</h3>
        {<div>{getIcon(forecast.icon)}</div>}
        <h6 className="summary">{forecast.summary}</h6>
      </div>

      <SmoothCollapse expanded={hourlyExpanded}>
        <div className="hourly-forecasts">{hourlyForecast}</div>
      </SmoothCollapse>
    </div>
  );
};

export default Hourly;
