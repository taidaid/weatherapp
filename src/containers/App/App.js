import React, { useEffect } from "react";
import "./App.css";
import Forecast from "../Forecast/Forecast";
import Navbar from "../../components/Navbar/Navbar";
import Location from "../../components/Location";

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
      {/* This component provides the input for findinga location's forecast
       */}
      <Location />
      <Forecast />
    </div>
  );
}

export default App;
