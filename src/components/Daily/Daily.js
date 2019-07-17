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
        <h4 className="daily-date-time">{day.dateTime._d.toDateString()}</h4>
        {<>{getIcon(day.icon)}</>}
        <p className="day-summary">{day.summary}</p>
        <div className="day-stats">
          <p className="day-precip-chance">
            Rain: {Math.round(day.precipProbability * 100)}%
          </p>

          <p className="day-temp-high">
            High:{" "}
            {units === "us" ? (
              <>{Math.round(day.temperatureHigh)}°F</>
            ) : (
              <>{Math.round(((day.temperatureHigh - 32) * 5) / 9)}°C</>
            )}
          </p>
          <p className="day-temp-low">
            Low:{" "}
            {units === "us" ? (
              <>{Math.round(day.temperatureLow)}°F</>
            ) : (
              <>{Math.round(((day.temperatureLow - 32) * 5) / 9)}°C</>
            )}
          </p>

          <p className="cloud-cover">
            Cloud Cover: {Math.round(day.cloudCover * 100)}%
          </p>
        </div>
      </div>
    );
  });

  //finds the temperature in a message and converts from F to C.
  const convertTempToMetric = message => {
    const tempRegex = /[\d]{1,3}/gi;
    let metricTemp = message.match(tempRegex);
    metricTemp = Math.round(((message.match(tempRegex) - 32) * 5) / 9);
    return message.replace(tempRegex, metricTemp).replace("°F", "°C");
  };

  return (
    <div className="forecast-section">
      <div
        className="forecast-section-title-summary"
        onClick={() => setDailyExpanded(!dailyExpanded)}
      >
        <h3 className="section-title">{dailyExpanded ? "-" : "+"}Daily</h3>
        {forecast.icon ? getIcon(forecast.icon) : null}
        <h6 className="summary">
          {units === "us"
            ? forecast.summary
            : convertTempToMetric(forecast.summary)}
        </h6>
      </div>
      <SmoothCollapse expanded={dailyExpanded} heightTransition={".8s ease"}>
        <div className="daily-forecasts">{dailyForecast}</div>
      </SmoothCollapse>
    </div>
  );
};

export default Daily;
