import React from "react";
import cloudSun from "../../assets/Cloud-Sun.svg";
import rainbow from "../../assets/rainbow-vector.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-img">
        <img id="img-cloud-sun" src={cloudSun} alt="cloud-sun" />
      </div>

      <h1 className="app-title">The Weather App</h1>
      <div className="navbar-img">
        <img id="img-rainbow" src={rainbow} alt="rainbow" />
      </div>
    </header>
  );
};

export default Navbar;
