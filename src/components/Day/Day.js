import React from "react";
import rain from "../../assets/Cloud-Drizzle.svg";
import cloudSun from "../../assets/Cloud-Sun.svg";
import sun from "../../assets/Sun.svg";

const Day = ({ forecast }) => {
  const getIcon = icon => {
    switch (icon) {
      case "rain":
        console.log("rain", icon);
        return <img src={rain} alt="rain" />;
      case "partly-cloudy-day":
        console.log("partly-cloudy-day", icon);
        return <img src={cloudSun} alt="rain" />;
      case "clear-day":
        return <img src={sun} alt="clear-day" />;

      default:
        console.log("unknown");
    }
  };
  return (
    <div className="day">
      <h4 className="date-time">{forecast.dateTime._d.toDateString()}</h4>
      <div>
        <p className="day-summary">{forecast.summary}</p>
        <div>{getIcon(forecast.icon)}</div>
      </div>

      <p className="day-temp-high">High: {forecast.temperatureHigh}</p>
      <p className="day-temp-low">Low: {forecast.temperatureLow}</p>
      <p className="day-cloud-cover">Cloud Cover: {forecast.cloudCover}</p>
      <p className="day-temp-low">Humidity: {forecast.humidity}</p>
      <p className="day-temp-low">Precipitation Type: {forecast.precipType}</p>
      <p className="day-temp-low">
        Precipitation Chance: {forecast.precipProbability}
      </p>
    </div>
  );
};

export default Day;
