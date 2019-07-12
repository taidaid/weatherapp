import React from "react";
import cloudSun from "../../assets/Cloud-Sun.svg";
import rainbow from "../../assets/rainbow-vector.bmp";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <img className="navbar-img cloudSun-img" src={cloudSun} alt="cloud-sun" />
      <h1>The Weather App</h1>
      <img className="navbar-img rainbow-img" src={rainbow} alt="rainbow" />
    </div>
  );
};

export default Navbar;
