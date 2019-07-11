import React from "react";
import Alerts from "../../components/Alerts/Alerts";
import Currently from "../../components/Currently/Currently";
import Daily from "../../components/Daily/Daily";
// import ForecastType from "../ForecastType/ForecastType";
import moon from "../../assets/Moon.svg";
import rain from "../../assets/Cloud-Drizzle.svg";
import cloudSun from "../../assets/Cloud-Sun.svg";
import sun from "../../assets/Sun.svg";
import wind from "../../assets/Wind.svg";
import snow from "../../assets/Cloud-Snow-Alt.svg";
import fog from "../../assets/Cloud-Fog.svg";
import cloud from "../../assets/Cloud.svg";
import cloudMoon from "../../assets/Cloud-Moon.svg";
import cloudHail from "../../assets/Cloud-Hail.svg";

import "./Forecast.css";

const Forecast = ({ forecast }) => {
  // console.log(forecast);

  const getIcon = icon => {
    switch (icon) {
      case "rain":
        return <img src={rain} alt="rain" />;
      case "partly-cloudy-day":
        return <img src={cloudSun} alt="rain" />;
      case "clear-day":
        return <img src={sun} alt="clear-day" />;
      case "clear-night":
        return <img src={moon} alt="clear-night" />;
      case "snow":
        return <img src={snow} alt="snow" />;
      case "wind":
        return <img src={wind} alt="wind" />;
      case "fog":
        return <img src={fog} alt="fog" />;
      case "cloudy":
        return <img src={cloud} alt="cloud" />;
      case "partly-cloudy-night":
        return <img src={cloudMoon} alt="partly-cloudy-night" />;
      case "sleet":
        return <img src={cloudHail} alt="sleet" />;

      default:
        console.log("unknown");
    }
  };

  if (forecast) {
    return (
      <div className="forecast">
        <div className="location-name">
          <h6>{forecast.timezone}</h6>
        </div>
        <Alerts forecast={forecast} />
        {/*Test for empty object in forecast state, if empty render null, otherwise, render forecasts*/}
        {Object.keys(forecast).length > 0 ? (
          <div>
            <Currently
              forecast={forecast.currently}
              getIcon={getIcon}
              forecastType="currently"
            />
            <Daily
              forecast={forecast.daily}
              getIcon={getIcon}
              forecastType="daily"
            />
            {/* <ForecastType forecast={forecast.hourly} forecastType="hourly" /> */}
          </div>
        ) : null}

        {console.log(forecast)}
        {/*
         */}
        {/* <Currently forecast={forecast} /> */}
      </div>
    );
  } else {
    return "No forecast";
  }
};

export default Forecast;
