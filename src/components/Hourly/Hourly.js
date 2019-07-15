import React, { useState } from "react";
import "./Hourly.css";
import SmoothCollapse from "react-smooth-collapse";

const Hourly = ({ forecast, getIcon, units }) => {
  const [hourlyExpanded, setHourlyExpanded] = useState(false);

  //converts UNIX time into human-readable time
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

        {<>{getIcon(hour.icon)}</>}
        <p className="hourly-summary">{hour.summary}</p>
        <div className="hourly-precip-chance">
          <div className="day-precip-chance-text  ">
            Rain: {Math.floor(hour.precipProbability * 100)}%
          </div>
        </div>

        <p className="hourly-temp">
          Temp.:{" "}
          {units === "us" ? (
            <>{Math.floor(hour.temperature)}°F</>
          ) : (
            <>{Math.floor(((hour.temperature - 32) * 5) / 9)}°C</>
          )}
        </p>
      </div>
    );
  });

  return (
    <div className="hourly">
      <div
        className="hourly-section-title"
        onClick={() => setHourlyExpanded(!hourlyExpanded)}
      >
        <h3 className="section-title">{hourlyExpanded ? "-" : "+"}Hourly</h3>
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
