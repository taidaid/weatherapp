import React, { useState } from "react";

const Forecast = () => {
	const [forecast, setForecast] = useState({});

	return (
		<div>
			<div>
				<h3>ALERTS</h3>
			</div>
			<div>
				<h3>Currently</h3>
			</div>
			<div>
				<h3>Daily</h3>
			</div>
			<div>
				<h3>Hourly</h3>
			</div>
		</div>
	);
};

export default Forecast;
