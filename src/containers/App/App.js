import React, { useEffect, useState } from "react";
import DarkSkyApi from "dark-sky-api";
import { getNavigatorCoords } from "geo-loc-utils";
import "./App.css";
import Forecast from "../Forecast/Forecast";
import Navbar from "../../components/Navbar/Navbar";

//Provides the input for finding a location's forecast
import Location from "../../components/Location/Location";

function App() {
  const [latitude, setLatitude] = useState(40.7128);
  const [longitude, setLongitude] = useState(74.006);
  const [northSouth, setNorthSouth] = useState("north");
  const [eastWest, setEastWest] = useState("west");
  const [units, setUnits] = useState("us");
  const [forecast, setForecast] = useState({});
  const [error, setError] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const geocodeApiKey = "52634dba53ab47f683a9fbb0f11942ec";
  DarkSkyApi.apiKey = "dd94891f9307a1083ce9200cc07c0448";

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

  //set a new latitude state from Location component input
  const handleLatitudeChange = newLatitude => {
    setLatitude(newLatitude);
  };
  //set a new longitude state from Location component input
  const handleLongitudeChange = newLongitude => {
    setLongitude(newLongitude);
  };

  //The DarkSkyApi uses postiive numbers for north and negative for south. This uses the select input to make the latitude negative if it is south.
  const handleNorthSouthChange = direction => {
    setNorthSouth(direction);
  };

  //The DarkSkyApi uses postiive numbers for east and negative for west. This uses the select input to make the longitude negative if it is west.
  const handleEastWestChange = direction => {
    setEastWest(direction);
  };

  const handleUnitChange = units => {
    setUnits(units);
  };

  const getForecast = coords => {
    console.log("new coords", coords);
    if (navigator.onLine) {
      DarkSkyApi.loadItAll(null, {
        latitude: coords.latitude,
        longitude: coords.longitude,
        units: units,
      })
        .then(result => {
          setError(false);
          setLatitude(coords.latitude);
          setLongitude(coords.longitude);
          //uses north/south and east/west state to make latitude/longitude correspondingly positive/negative for api call
          if (coords.latitude < 0) {
            setNorthSouth("south");
          } else if (coords.latitude >= 0) {
            setNorthSouth("north");
          }
          if (coords.longitude < 0) {
            setEastWest("west");
          } else if (coords.longitude >= 0) {
            setEastWest("east");
          }
          setForecast(result);
        })
        .catch(error => {
          setError(true);
          console.log(error);
        });
    } else {
      setError(true);
    }
  };

  //set a new forecast state using location state
  const newLocationForecast = ({
    newLatitude = latitude,
    newLongitude = longitude,
  }) => {
    // let latitudeForForecast = newLatitude;
    // let longitudeForForecast = newLongitude;
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
