import React, { useState } from "react";
import MenuButton from "../../components/MenuButton/MenuButton";

import "./Sidebar.css";

const Sidebar = ({ lightMode, setLightMode, units, handleUnitChange }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const styles = {
    sidebar: {
      position: "fixed",
      display: "flex",
      flexFlow: "column",
      backgroundColor: "rgba(61, 61, 61, 0.8)",
      alignItems: "center",
      top: "0",
      left: "0",
      zIndex: "99",
      height: `${sidebarExpanded ? "100vh" : "4vh"}`,
      width: `${sidebarExpanded ? "10vw" : "4vw"}`,
      minWidth: "40px",
      boxShadow: "2px 0px 3px 3px black",
      transition: "width 0.5s ease-out, height 0.5s ease-out",
    },
  };

  return (
    <aside style={{ ...styles.sidebar }}>
      <MenuButton
        color={lightMode ? "black" : "white"}
        open={sidebarExpanded}
        onClick={() => setSidebarExpanded(!sidebarExpanded)}
      />

      <div className={sidebarExpanded ? "show" : "hide"}>
        <div
          className={`dark-light-button ${
            lightMode ? `light-mode-button` : `dark-mode-button`
          }`}
          onClick={() => setLightMode(!lightMode)}
        >
          {lightMode ? "Dark" : "Light"} Mode
        </div>
        <div
          className={`dark-light-button ${
            lightMode ? `light-mode-button` : `dark-mode-button`
          }`}
        >
          <label /*className="location-label"*/ htmlFor="local-selecton-units">
            units:{" "}
          </label>

          <select
            // className="select-units"
            id="local-selecton-units"
            value={units}
            onChange={e => handleUnitChange(e.target.value)}
          >
            <option value="us">US</option>
            <option value="si">Metric</option>
          </select>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
