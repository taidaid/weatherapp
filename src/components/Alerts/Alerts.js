import React, { useState } from "react";
import "./Alerts.css";

const Alerts = ({ forecast }) => {
  const [alertsExpand, setAlertsExpand] = useState(false);

  const getAlerts = () => {
    return forecast.alerts;
  };

  getAlerts();
  return (
    <div className="alerts" onClick={() => setAlertsExpand(!alertsExpand)}>
      <h3 id="alerts-section-title">
        {alertsExpand ? "-" : "+"}
        Alerts
      </h3>
      <div className="scroll-left">
        <p>{getAlerts()[0].description}</p>
      </div>
      <p>{alertsExpand ? getAlerts()[0].description : ""}</p>

      {getAlerts().forEach(alert => {
        return <h5 id="alerts-title">{alert.title}</h5>;
      })}
      {/* <h5 id="alerts-title">{getAlerts()[0].title}</h5> */}
    </div>
  );
};

export default Alerts;
