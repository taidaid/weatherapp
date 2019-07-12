import React, { useEffect, useState } from "react";
import DarkSkyApi from "dark-sky-api";
import "./App.css";
import Forecast from "../Forecast/Forecast";

import Navbar from "../../components/Navbar/Navbar";

//Provides the input for finding a location's forecast
import Location from "../../components/Location/Location";

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [forecast, setForecast] = useState({});
  DarkSkyApi.apiKey = "feda928cd49f3fb981c77fc4936451dc";
  // console.log(forecast.keys);

  //set a default forecast using browser location
  const setDefaultForecast = () => {
    DarkSkyApi.loadItAll().then(result => {
      setForecast(result);
      // console.log(typeof result.latitude);
      setLatitude(result.latitude);
      setLongitude(result.longitude);
    });
  };

  //simulate a loading time for component mount
  const simulateLoading = () => {
    return new Promise(resolve => setTimeout(resolve, 100));
  };
  //provide a loading screen while component mounts
  useEffect(() => {
    simulateLoading().then(() => {
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

  //set a new latitude state from Location component input
  const handleLatitudeChange = newLatitude => {
    setLatitude(newLatitude);
  };
  //set a new longitude state from Location component input
  const handleLongitudeChange = newLongitude => {
    setLongitude(newLongitude);
  };

  //set a new forecast state using location state
  const newLocationForecast = () => {
    DarkSkyApi.loadItAll(null, {
      latitude: latitude,
      longitude: longitude,
    }).then(result => {
      setForecast(result);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>

      <div className="App-body">
        <Location
          latitude={latitude}
          longitude={longitude}
          handleLatitudeChange={handleLatitudeChange}
          handleLongitudeChange={handleLongitudeChange}
          newLocationForecast={newLocationForecast}
          setDefaultForecast={setDefaultForecast}
        />
        {/* Displays the forecast results for the given location
         */}
        <Forecast forecast={forecast} />
      </div>
    </div>
  );
}

export default App;
