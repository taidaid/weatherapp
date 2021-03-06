import React from "react";
import Currently from "../../components/Currently/Currently";
import Daily from "../../components/Daily/Daily";
import Hourly from "../../components/Hourly/Hourly";
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

const Forecast = ({ forecast, initialized, units, lightMode }) => {
  //get the correct image according to the give icon input from the forecast
  const getIcon = icon => {
    switch (icon) {
      case "rain":
        return (
          <img className={lightMode ? "invert" : ""} src={rain} alt="rain" />
        );
      case "partly-cloudy-day":
        return (
          <img
            className={lightMode ? "invert" : ""}
            src={cloudSun}
            alt="cloud-sun"
          />
        );
      case "clear-day":
        return (
          <img
            className={lightMode ? "invert" : ""}
            src={sun}
            alt="clear-day"
          />
        );
      case "clear-night":
        return (
          <img
            className={lightMode ? "invert" : ""}
            src={moon}
            alt="clear-night"
          />
        );
      case "snow":
        return (
          <img className={lightMode ? "invert" : ""} src={snow} alt="snow" />
        );
      case "wind":
        return (
          <img className={lightMode ? "invert" : ""} src={wind} alt="wind" />
        );
      case "fog":
        return (
          <img className={lightMode ? "invert" : ""} src={fog} alt="fog" />
        );
      case "cloudy":
        return (
          <img className={lightMode ? "invert" : ""} src={cloud} alt="cloud" />
        );
      case "partly-cloudy-night":
        return (
          <img
            className={lightMode ? "invert" : ""}
            src={cloudMoon}
            alt="partly-cloudy-night"
          />
        );
      case "sleet":
        return (
          <img
            className={lightMode ? "invert" : ""}
            src={cloudHail}
            alt="sleet"
          />
        );
      default:
        return (
          <img
            className={lightMode ? "invert" : ""}
            src={cloudSun}
            alt="cloud-sun"
          />
        );
    }
  };
  //check for empty object or falsey value
  if (Object.keys(forecast).length > 0 && forecast.currently) {
    return (
      <div className="forecast">
        <Currently
          forecast={forecast.currently}
          getIcon={getIcon}
          units={units}
        />
        <Hourly forecast={forecast.hourly} getIcon={getIcon} units={units} />
        <Daily forecast={forecast.daily} getIcon={getIcon} units={units} />
      </div>
    );
  } else if (initialized) {
    //if forecast object is empty and app is initalized, likely the forecast is loading
    return "Loading forecast...";
  } else {
    return null;
  }
};

export default Forecast;
