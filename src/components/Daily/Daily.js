import React, { useState } from "react";
import "./Daily.css";
import SmoothCollapse from "react-smooth-collapse";

const Daily = ({ forecast, getIcon, units }) => {
  const [dailyExpanded, setDailyExpanded] = useState(false);
  const [dayExpanded, setDayExpanded] = useState(false);

  const dailyForecast = forecast.data.map((day, index) => {
    return (
      <div
        className="daily-description"
        key={`${index}`}
        onClick={() => setDayExpanded(!dayExpanded)}
      >
        <h4 className="date-time">{day.dateTime._d.toDateString()}</h4>
        {<>{getIcon(day.icon)}</>}
        <p className="day-summary">{day.summary}</p>
        <div className="day-stats">
          <p className="day-precip-chance">
            Rain: {Math.floor(day.precipProbability * 100)}%
          </p>

          <p className="day-temp-high">
            High:{" "}
            {units === "us" ? (
              <>{Math.floor(day.temperatureHigh)}°F</>
            ) : (
              <>{Math.floor(((day.temperatureHigh - 32) * 5) / 9)}°C</>
            )}
          </p>
          <p className="day-temp-low">
            Low:{" "}
            {units === "us" ? (
              <>{Math.floor(day.temperatureLow)}°F</>
            ) : (
              <>{Math.floor(((day.temperatureLow - 32) * 5) / 9)}°C</>
            )}
          </p>

          <p className="cloud-cover">
            Cloud Cover: {Math.floor(day.cloudCover * 100)}%
          </p>
        </div>
      </div>
    );
  });

  const convertTempToMetric = () => {
    const tempRegex = /[\d]{1,3}/gi;
    let metricTemp = forecast.summary.match(tempRegex);
    metricTemp =
      Math.floor(((forecast.summary.match(tempRegex) - 32) * 5) / 9) + "°C";
    return forecast.summary.replace(tempRegex, metricTemp).replace("°F", "");
  };

  return (
    <div className="daily">
      <div
        className="daily-section-title"
        onClick={() => setDailyExpanded(!dailyExpanded)}
      >
        <h3 className="section-title">{dailyExpanded ? "-" : "+"}Daily</h3>
        {forecast.icon ? <div>{getIcon(forecast.icon)}</div> : null}
        <h6 className="summary">
          {units === "us" ? forecast.summary : convertTempToMetric()}
        </h6>
      </div>
      <SmoothCollapse expanded={dailyExpanded} heightTransition={"1s ease"}>
        <div className="daily-forecasts">{dailyForecast}</div>
      </SmoothCollapse>
    </div>
  );
};

export default Daily;
