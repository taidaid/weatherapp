import React, { useState } from "react";
import "./Daily.css";

const Daily = ({ forecast, getIcon }) => {
  const [dailyExpand, setDailyExpand] = useState(false);

  const dailyForecast = forecast.data.map((day, index) => {
    return (
      <div className="daily-description" key={`${index}`}>
        <h4 className="date-time">{day.dateTime._d.toDateString()}</h4>
        <div className="day-precip-chance">
          {getIcon("rain")}
          <div className="day-precip-chance-text  ">
            :{day.precipProbability * 100}%
          </div>
        </div>
        <p className="day-summary">{day.summary}</p>
        <p className="day-temp-high">High: {day.temperatureHigh}</p>
        <p className="day-temp-low">Low: {day.temperatureLow}</p>
      </div>
    );
  });

  return (
    <div className="daily">
      <div
        id="daily-section-title"
        onClick={() => setDailyExpand(!dailyExpand)}
      >
        <h3>{dailyExpand ? "-" : "+"}Daily</h3>
        {forecast.icon ? <div>{getIcon(forecast.icon)}</div> : null}
      </div>
      <div className="daily-forecasts">
        {dailyExpand ? dailyForecast : null}
      </div>
    </div>
  );
};

export default Daily;
