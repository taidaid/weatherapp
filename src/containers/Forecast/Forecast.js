import React, { useState } from "react";
import Alerts from "../../components/Alerts/Alerts";
import Currently from "../../components/Currently/Currently";
import sampleForecast from "../../assets/sample.json";

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
      <Currently forecast={forecast} />
    </div>
  );
};

export default Forecast;
