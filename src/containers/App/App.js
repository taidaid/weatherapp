import React, { useEffect, useState } from "react";
import DarkSkyApi from "dark-sky-api";
import "./App.css";
import Forecast from "../Forecast/Forecast";
import Navbar from "../../components/Navbar/Navbar";
import Location from "../../components/Location/Location";
// import sampleForecast from "../../assets/sample.json";

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [forecast, setForecast] = useState({});
  DarkSkyApi.apiKey = "feda928cd49f3fb981c77fc4936451dc";
  // console.log(forecast.keys);

  //set a default forecast using browser location
  const setDefaultForecast = () => {
    DarkSkyApi.loadItAll().then(result => {
      console.log("default", result);
      setForecast(result);
      // console.log(typeof result.latitude);
      setLatitude(result.latitude);
      setLongitude(result.longitude);
    });
  };
  if (forecast && Object.keys(forecast).length === 0) setDefaultForecast();

  //simulate a loading time for component mount
  const simulateLoading = () => {
    return new Promise(resolve => setTimeout(resolve, 500));
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

  // const checkStatus = status => {
  //   if (status > 400) return "not found";
  // };

  //set a new latitude state from Location component input
  const handleLatitudeChange = newLatitude => {
    console.log(typeof newLatitude);
    setLatitude(newLatitude);
  };
  //set a new longitude state from Location component input
  const handleLongitudeChange = newLongitude => {
    setLongitude(newLongitude);
  };

  // const handleChange = newLocationInput => {
  //   const latitude = newLocationInput.slice(0, newLocationInput.indexOf(","));
  //   const longitude = newLocationInput.slice(
  //     newLocationInput.indexOf(",") + 1,
  //     newLocationInput.length
  //   );
  //   // const coords = { latitude, longitude };
  //   console.log("newLocationInput", latitude, longitude);
  //   setLatitude(result.latitude);
  //   setLongitude(result.longitude);
  // };

  //set a new forecast state using location state
  const newLocationForecast = () => {
    // console.log(location);
    console.log("new coords", latitude, longitude);
    // const latitudeNumber = parseInt(latitude);
    // const longitudeNumber = parseInt(longitude);
    DarkSkyApi.loadItAll(null, {
      latitude: latitude,
      longitude: longitude,
    }).then(result => {
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
          latitude={latitude}
          longitude={longitude}
          handleLatitudeChange={handleLatitudeChange}
          handleLongitudeChange={handleLongitudeChange}
          newLocationForecast={newLocationForecast}
        />
        {/* Displays the forecast results for the given location
         */}
        <Forecast forecast={forecast} />
      </div>
    </div>
  );
}

export default App;
