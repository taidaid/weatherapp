import React, { useState } from "react";
import "./Alerts.css";

const Alerts = ({ forecast }) => {
  const [alertsExpand, setAlertsExpand] = useState(false);
  // console.log("alerts", forecast);

  if (forecast.alerts) {
    const description = forecast.alerts[0].description
      ? forecast.alerts[0].description
      : "No Alerts";
    return (
      <div className="alerts" onClick={() => setAlertsExpand(!alertsExpand)}>
        <h3 id="alerts-section-title">
          {alertsExpand ? "-" : "+"}
          Alerts
        </h3>
        <h5>{forecast.alerts[0].title}</h5>
        <div className="alerts-scroll scroll-left">
          <p>
            {forecast.alerts[0].description
              ? forecast.alerts[0].description
              : "No Alerts"}
          </p>
        </div>
        <p id="alerts-description">{alertsExpand ? description : ""}</p>
      </div>
    );
  } else {
    return null;
  }
};

export default Alerts;
