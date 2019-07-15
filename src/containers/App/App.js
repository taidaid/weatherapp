import React, { useEffect, useState } from "react";
import DarkSkyApi from "dark-sky-api";
import { getNavigatorCoords } from "geo-loc-utils";
import "./App.css";
import Forecast from "../Forecast/Forecast";
import Navbar from "../../components/Navbar/Navbar";
import Location from "../Location/Location";

function App() {
  const [latitude, setLatitude] = useState(40.7128);
  const [longitude, setLongitude] = useState(74.006);
  const [northSouth, setNorthSouth] = useState("north");
  const [eastWest, setEastWest] = useState("west");
  const [units, setUnits] = useState("si");
  const [forecast, setForecast] = useState({});
  const [error, setError] = useState(false);
  const [initialized, setInitialized] = useState(false);

  //initialize opencage-api and darky-sky-api with apikeys
  //ordinarily these api keys would be hidden via a proxy, but as this is a demo for a front-end team, a back-end was out-of-scope
  const geocodeApiKey = "52634dba53ab47f683a9fbb0f11942ec";
  DarkSkyApi.apiKey = "dd94891f9307a1083ce9200cc07c0448";

  //provide a loading screen while component mounts
  useEffect(() => {
    const ele = document.getElementById("ipl-progress-indicator");
    if (ele) {
      // fade out
      ele.classList.add("available");
      setTimeout(() => {
        // remove from DOM
        ele.outerHTML = "";
      }, 300);
    }
  }, []);

  //set a new latitude state from input
  const handleLatitudeChange = newLatitude => {
    setLatitude(newLatitude);
  };
  //set a new longitude state from input
  const handleLongitudeChange = newLongitude => {
    setLongitude(newLongitude);
  };

  //the APIs use positive/negative rather than north/south. set a new north/south direction to allow correct api-input
  const handleNorthSouthChange = direction => {
    setNorthSouth(direction);
  };

  //the APIs use positive/negative rather than east/west. set a new east/west direction to allow correct api-input
  const handleEastWestChange = direction => {
    setEastWest(direction);
  };

  //acts as a flag to calculate SI units from US units as indicated
  const handleUnitChange = units => {
    setUnits(units);
  };

  //gets all forecast info from provided lat/long via Dark-Sky-Api
  const getForecast = coords => {
    console.log(coords);
    DarkSkyApi.loadItAll(null, {
      latitude: coords.latitude,
      longitude: coords.longitude,
      units: units,
    })
      .then(result => {
        setInitialized(true);
        setError(false);
        setForecast(result);
      })
      .catch(error => {
        setError(true);
        console.log(error);
      });
  };

  //set a new forecast state using location state
  const newLocationForecast = ({
    newLatitude = latitude,
    newLongitude = longitude,
  }) => {
    //the APIs use positive/negative rather than north/south and east/west.
    //accounts for making lat/long positive/negative according to north/south and east/west state
    if (northSouth === "south" && latitude > 0) {
      newLatitude = newLatitude * -1;
    }
    if (eastWest === "west" && longitude > 0) {
      newLongitude = newLongitude * -1;
    }
    getForecast({
      latitude: newLatitude,
      longitude: newLongitude,
    });
    setInitialized(true);
  };

  //get the forecast local to the browser's location
  const getLocalForecast = () => {
    getNavigatorCoords()
      .then(({ latitude, longitude }) => {
        setLatitude(latitude);
        setLongitude(longitude);
        //uses north/south and east/west state to make latitude/longitude correspondingly positive/negative for api call
        if (latitude < 0) {
          setNorthSouth("south");
        } else if (latitude >= 0) {
          setNorthSouth("north");
        }
        if (longitude < 0) {
          setEastWest("west");
        } else if (longitude >= 0) {
          setEastWest("east");
        }
        getForecast({
          latitude: latitude,
          longitude: longitude,
        });
      })
      .catch(error => console.log(error));
    setInitialized(true);
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
          getLocalForecast={getLocalForecast}
          handleNorthSouthChange={handleNorthSouthChange}
          handleEastWestChange={handleEastWestChange}
          northSouth={northSouth}
          eastWest={eastWest}
          handleUnitChange={handleUnitChange}
          getForecast={getForecast}
          units={units}
          apiKey={geocodeApiKey}
        />

        {/*Provides guidance before first use */}
        {initialized ? null : (
          <p>
            Try entering some numbers for the latitude and longitude and
            clicking 'Forecast'. Or you can click 'Use My Location' to get your
            local forecast.
          </p>
        )}
        {/* Displays the forecast results for the given location or an error message
         */}
        {error ? (
          <p>
            There was an error getting your forecast. Try entering new
            latitude/longitude numbers and then clicking 'Forecast' or
            refreshing the page.
          </p>
        ) : (
          <Forecast
            forecast={forecast}
            initialized={initialized}
            units={units}
          />
        )}
      </div>
    </div>
  );
}

export default App;
