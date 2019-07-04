import React, { useEffect } from "react";
import "./App.css";
import Forecast from "../Forecast/Forecast";
import Navbar from "../../components/Navbar/Navbar";
import Location from "../../components/Location/Location";

function App() {
  const authenticate = () => {
    return new Promise(resolve => setTimeout(resolve, 500));
  };

  useEffect(() => {
    authenticate().then(() => {
      const ele = document.getElementById("ipl-progress-indicator");
      if (ele) {
        // fade out
        ele.classList.add("available");
        setTimeout(() => {
          // remove from DOM
          ele.outerHTML = "";
        }, 500);
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      {/* Provides the input for finding a location's forecast
       */}
      <Location />
      {/* Displays the forecast results for the given location
       */}
      <Forecast />
    </div>
  );
}

export default App;
