import React, { useState } from "react";
import "./Currently.css";

const Currently = ({ forecast }) => {
  const [currentlyExpand, setCurrentlyExpand] = useState(false);
  const getCurrentlyAsArray = () => {
    const currently = Object.keys(forecast.currently).map(function(key) {
      return [`${key}: `, forecast.currently[key]];
    });

    return currently;
  };
  const currentlyDescription = getCurrentlyAsArray();
  return (
    <div
      className="currently"
      onClick={() => setCurrentlyExpand(!currentlyExpand)}
    >
      <h3 id="currently-section-title">
        {currentlyExpand ? "-" : "+"}Currently
      </h3>
      <div className="currently-description">
        {currentlyExpand
          ? currentlyDescription.map(descriptor => (
              <h5 className="descriptor">{descriptor}</h5>
            ))
          : ""}
      </div>
    </div>
  );
};

export default Currently;
