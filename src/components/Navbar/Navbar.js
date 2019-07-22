import React from "react";
import cloudSun from "../../assets/Cloud-Sun.svg";
import rainbow from "../../assets/rainbow-vector.png";
import "./Navbar.css";

const Navbar = ({ lightMode }) => {
  return (
    <header
      className="navbar"
      id={`${lightMode ? "navbar-light" : "navbar-dark"}`}
    >
      <div className="navbar-img ">
        <img
          className={` ${lightMode ? "invert" : ""}`}
          id="img-cloud-sun"
          // style={lightMode ? {'filter': 'invert(1)'}: ''}
          src={cloudSun}
          alt="cloud-sun"
        />
      </div>

      <h1 className="app-title">The Weather App</h1>
      <div className="navbar-img">
        <img id="img-rainbow" src={rainbow} alt="rainbow" />
      </div>
    </header>
  );
};

export default Navbar;
