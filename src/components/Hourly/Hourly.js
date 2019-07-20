import React, { useState } from "react";
import "./Hourly.css";
import SmoothCollapse from "react-smooth-collapse";
import Chart from "../Chart/Chart";

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
        <h4 className="hourly-date-time">{getHourFromUnixTime(hour.time)}</h4>

        {<>{getIcon(hour.icon)}</>}
        <p className="hourly-summary">{hour.summary}</p>
        <div className="hourly-precip-chance">
          Rain: {Math.round(hour.precipProbability * 100)}%
        </div>

        <p className="hourly-temp">
          Temp.:{" "}
          {units === "us" ? (
            <>{Math.round(hour.temperature)}°F</>
          ) : (
            <>{Math.round(((hour.temperature - 32) * 5) / 9)}°C</>
          )}
        </p>
      </div>
    );
  });

  return (
    <div className="forecast-section">
      <div
        className="forecast-section-title-summary"
        onClick={() => setHourlyExpanded(!hourlyExpanded)}
      >
        <h3 className="section-title">{hourlyExpanded ? "-" : "+"}Hourly</h3>
        {getIcon(forecast.icon)}
        <h6 className="summary">{forecast.summary}</h6>
      </div>

      <SmoothCollapse expanded={hourlyExpanded}>
        <div className="hourly-forecasts">{hourlyForecast}</div>
        <Chart
          forecast={forecast}
          getHourFromUnixTime={getHourFromUnixTime}
          units={units}
        />
      </SmoothCollapse>
    </div>
  );
};

export default Hourly;
