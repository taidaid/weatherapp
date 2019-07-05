import React, { useState } from "react";
import "./Location.css";
import sampleForecast from "../../assets/sample.json";

const Location = () => {
	const [location, setLocation] = useState("42.3601,-71.0589");

	const handleChange = newLocationInput => {
		setLocation(newLocationInput);
	};

	const handleSubmit = () => {};
	return (
		<div className="location">
			<div className="location-name">
				<h2>Location Name</h2>
				<h6>{sampleForecast.timezone}</h6>
			</div>
			<div className="location-input">
				<input
					style={{ textAlign: "center" }}
					type="text"
					value={location}
					onChange={handleChange}
					onSubmit={handleSubmit}
				/>
			</div>
		</div>
	);
};

export default Location;
