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
  const [northSouth, setNorthSouth] = useState("north");
  const [eastWest, setEastWest] = useState("west");
  const [longitude, setLongitude] = useState(74.006);
  const [forecast, setForecast] = useState({});
  const [error, setError] = useState(false);
  const [initialized, setInitialized] = useState(false);
  DarkSkyApi.apiKey = "dd94891f9307a1083ce9200cc07c0448";

  //get the forecast local to the browser's location
  const getLocalForecast = () => {
    getNavigatorCoords().then(({ latitude, longitude }) => {
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
    });
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

  const getForecast = coords => {
    console.log("new forecast", coords);
    DarkSkyApi.loadItAll(null, {
      latitude: coords.latitude,
      longitude: coords.longitude,
    })
      .then(result => {
        setError(false);
        setForecast(result);
      })
      .catch(error => {
        setError(true);
        console.log(error);
      });
  };

  //set a new forecast state using location state
  const newLocationForecast = () => {
    setInitialized(true);
    let latitudeforForecast = latitude;
    let longitudeForForecast = longitude;
    if (northSouth === "south" && latitude > 0) {
      latitudeforForecast = latitudeforForecast * -1;
    }
    if (eastWest === "west" && longitude > 0) {
      longitudeForForecast = longitudeForForecast * -1;
    }
    getForecast({
      latitude: latitudeforForecast,
      longitude: longitudeForForecast,
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
          getLocalForecast={() => getLocalForecast()}
          handleNorthSouthChange={handleNorthSouthChange}
          handleEastWestChange={handleEastWestChange}
          northSouth={northSouth}
          eastWest={eastWest}
        />

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
          <Forecast forecast={forecast} />
        )}
      </div>
    </div>
  );
}

export default App;
