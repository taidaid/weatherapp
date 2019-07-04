import React from "react";
import "./Alerts.css";

const Alerts = ({ forecast }) => {
  const getAlerts = () => {
    return forecast.alerts;
  };
  getAlerts();
  return (
    <div className="alerts">
      <h3>Alerts</h3>
      <h5>{getAlerts()[0].title}</h5>
      <div className="scroll-left">
        <p>{getAlerts()[0].description}</p>
      </div>
    </div>
  );
};

export default Alerts;
