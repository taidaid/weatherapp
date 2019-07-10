import React, { useState } from "react";
import Alerts from "../../components/Alerts/Alerts";
// import Currently from "../../components/Currently/Currently";
import ForecastType from "../ForecastType/ForecastType";
import sampleForecast from "../../assets/sample.json";
import "./Forecast.css";

const Forecast = () => {
  const [forecast, setForecast] = useState({});

  const setDefaultForecast = (defaultForecast = sampleForecast) => {
    if (Object.keys(forecast).length === 0 && forecast.constructor === Object) {
      setForecast(defaultForecast);
    }
  };
  setDefaultForecast();
  return (
    <div className="forecast">
      <Alerts forecast={forecast} />
      <ForecastType forecast={forecast} forecastType="currently" />
      <ForecastType forecast={forecast} forecastType="daily" />
      <ForecastType forecast={forecast} forecastType="hourly" />
      {/* <Currently forecast={forecast} /> */}
    </div>
  );
};

export default Forecast;
