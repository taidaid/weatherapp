import React from "react";
import cloudSun from "../../assets/Cloud-Sun.svg";
import rainbow from "../../assets/rainbow-vector.bmp";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={cloudSun} className="App-logo" alt="logo" />
      <img src={rainbow} alt="rainbow" />
    </div>
  );
};

export default Navbar;