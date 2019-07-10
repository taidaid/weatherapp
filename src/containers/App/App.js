import React, { useEffect, useState } from "react";
import DarkSkyApi from "dark-sky-api";
import "./App.css";
import Forecast from "../Forecast/Forecast";
import Navbar from "../../components/Navbar/Navbar";
import Location from "../../components/Location/Location";
// import sampleForecast from "../../assets/sample.json";

function App() {
  const [location, setLocation] = useState("42.3601,-71.0589");
  const [forecast, setForecast] = useState({});
  DarkSkyApi.apiKey = "feda928cd49f3fb981c77fc4936451dc";

  // const setDefaultForecast = (defaultForecast = {}) => {
  //   if (Object.keys(forecast).length === 0 && forecast.constructor === Object) {
  //     setForecast(defaultForecast);
  //   }
  // };
  // setDefaultForecast();

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
    console.log("newLocationInput", newLocationInput);
    setLocation(newLocationInput);
  };

  const handleSubmit = () => {
    console.log(location);
    const [latitude, longitude] = location.split(",");
    console.log(latitude, longitude);
    const position = {
      latitude: latitude,
      longitude: longitude,
    };
    DarkSkyApi.loadCurrent(position).then(result => {
      console.log(result);
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
          handleSubmit={handleSubmit}
        />
        {/* Displays the forecast results for the given location
         */}
        <Forecast forecast={forecast} />
      </div>
    </div>
  );
}

export default App;
