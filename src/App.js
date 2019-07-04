import React, { useEffect } from "react";
import cloudSun from "./assets/Cloud-Sun.svg";
import Location from "./Location";
import "./App.css";
import Forecast from "./Forecast";

function App() {
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

	return (
		<div className="App">
			<header className="App-header">
				<div className="navbar">
					<img src={cloudSun} className="App-logo" alt="logo" />
				</div>

				<Location />
				<Forecast />
			</header>
		</div>
	);
}

export default App;
