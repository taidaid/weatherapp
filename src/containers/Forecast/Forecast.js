import React from "react";
import Alerts from "../../components/Alerts/Alerts";
// import Currently from "../../components/Currently/Currently";
import ForecastType from "../ForecastType/ForecastType";

import "./Forecast.css";

const Forecast = ({ forecast }) => {
  console.log(forecast);

  if (forecast) {
    return (
      <div className="forecast">
        <Alerts forecast={forecast} />
        <ForecastType forecast={forecast} forecastType="currently" />
        <ForecastType forecast={forecast} forecastType="daily" />
        <ForecastType forecast={forecast} forecastType="hourly" />
        {/* <Currently forecast={forecast} /> */}
      </div>
    );
  } else {
    return "No forecast";
  }
};

export default Forecast;
