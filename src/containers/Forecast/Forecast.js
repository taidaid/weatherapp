import React from "react";
import Alerts from "../../components/Alerts/Alerts";
import Currently from "../../components/Currently/Currently";
// import ForecastType from "../ForecastType/ForecastType";

import "./Forecast.css";

const Forecast = ({ forecast }) => {
  // console.log(forecast);

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
            <Currently forecast={forecast.currently} forecastType="currently" />
            {/* <ForecastType forecast={forecast.daily} forecastType="daily" />
            <ForecastType forecast={forecast.hourly} forecastType="hourly" /> */}
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
