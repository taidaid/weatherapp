import React, { useState } from "react";
import "./Daily.css";
import SmoothCollapse from "react-smooth-collapse";

const Daily = ({ forecast, getIcon }) => {
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
        <div className="day-precip-chance">
          <div>Rain: </div>
          <div className="day-precip-chance-text  ">
            {Math.floor(day.precipProbability * 100)}%
          </div>
        </div>
        <p className="day-summary">{day.summary}</p>
        <p className="day-temp-high">
          High: {Math.floor(day.temperatureHigh)}°F
        </p>
        <p className="day-temp-low">Low: {Math.floor(day.temperatureLow)}°F</p>

        <p className="cloud-cover">
          Cloud Cover: {Math.floor(day.cloudCover * 100)}%
        </p>
      </div>
    );
  });

  return (
    <div className="daily">
      <div
        className="daily-section-title"
        onClick={() => setDailyExpanded(!dailyExpanded)}
      >
        <h3>{dailyExpanded ? "-" : "+"}Daily</h3>
        {forecast.icon ? <div>{getIcon(forecast.icon)}</div> : null}
        <h6 className="summary">{forecast.summary}</h6>
      </div>
      <SmoothCollapse expanded={dailyExpanded} heightTransition={"1s ease"}>
        <div className="daily-forecasts">{dailyForecast}</div>
      </SmoothCollapse>
    </div>
  );
};

export default Daily;
