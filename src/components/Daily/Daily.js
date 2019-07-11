import React, { useState } from "react";
import "./Daily.css";
import SmoothCollapse from "react-smooth-collapse";

const Daily = ({ forecast, getIcon }) => {
  const [dailyExpanded, setDailyExpanded] = useState(false);

  const dailyForecast = forecast.data.map((day, index) => {
    return (
      <div className="daily-description" key={`${index}`}>
        <h4 className="date-time">{day.dateTime._d.toDateString()}</h4>
        <div className="day-precip-chance">
          {getIcon("rain")}
          <div className="day-precip-chance-text  ">
            {day.precipProbability * 100}%
          </div>
        </div>
        <p className="day-summary">{day.summary}</p>
        <p className="day-temp-high">
          High: {Math.floor(day.temperatureHigh)}°F
        </p>
        <p className="day-temp-low">Low: {Math.floor(day.temperatureLow)}°F</p>
      </div>
    );
  });

  return (
    <div className="daily">
      <div
        id="daily-section-title"
        onClick={() => setDailyExpanded(!dailyExpanded)}
      >
        <h3>{dailyExpanded ? "-" : "+"}Daily</h3>
        {forecast.icon ? <div>{getIcon(forecast.icon)}</div> : null}
      </div>
      <SmoothCollapse expanded={dailyExpanded} heightTransition={"1s ease"}>
        <div className="daily-forecasts">{dailyForecast}</div>
      </SmoothCollapse>
    </div>
  );
};

export default Daily;
