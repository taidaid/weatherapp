import React, { useEffect, useState } from "react";
import DarkSkyApi from "dark-sky-api";
import "./App.css";
import Forecast from "../Forecast/Forecast";
import Navbar from "../../components/Navbar/Navbar";
import Location from "../../components/Location/Location";
// import sampleForecast from "../../assets/sample.json";

function App() {
  const [location, setLocation] = useState({});
  const [forecast, setForecast] = useState({});
  DarkSkyApi.apiKey = "feda928cd49f3fb981c77fc4936451dc";
  // console.log(forecast.keys);

  const setDefaultForecast = () => {
    DarkSkyApi.loadItAll().then(result => {
      console.log("default", result);
      setForecast(result);
      setLocation([result.latitude, result.longitude]);
    });
  };
  if (forecast && Object.keys(forecast).length === 0) setDefaultForecast();

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

  // const checkStatus = status => {
  //   if (status > 400) return "not found";
  // };

  const handleChange = newLocationInput => {
    const latitude = newLocationInput.slice(0, newLocationInput.indexOf(","));
    const longitude = newLocationInput.slice(
      newLocationInput.indexOf(",") + 1,
      newLocationInput.length
    );
    // const coords = { latitude, longitude };
    console.log("newLocationInput", latitude, longitude);
    setLocation({ latitude, longitude });
  };

  const newLocation = () => {
    // console.log(location);
    console.log("new coords", location);
    DarkSkyApi.loadItAll(location).then(result => {
      console.log("new location", result);
      setForecast(result);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      {/* Provides the input for finding a location's forecast
       */}
      <div className="App-body">
        <Location
          location={location}
          handleChange={handleChange}
          newLocation={newLocation}
        />
        {/* Displays the forecast results for the given location
         */}
        <Forecast forecast={forecast} />
      </div>
    </div>
  );
}

export default App;
