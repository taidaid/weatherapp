import React, { useState } from "react";
import "./ForecastType.css";

const ForecastType = ({ forecast, forecastType }) => {
	const [forecastExpand, setForecastExpand] = useState(false);
	const getForecastAsArray = () => {
		const forecastTypeArray = Object.keys(forecast[forecastType]).map(function(
			key
		) {
			return [`${key}: `, forecast[forecastType][key]];
		});

		return forecastTypeArray;
	};
	const forecastDescription = getForecastAsArray();
	return (
		<div
			className={forecastType}
			key={forecastType}
			onClick={() => setForecastExpand(!forecastExpand)}
		>
			<h3 key={forecastType} className={`${forecastType}-section-title`}>
				{forecastExpand ? "-" : "+"}
				{`${forecastType}`}
			</h3>
			<div key={forecastType} className={`${forecastType}-description`}>
				{forecastExpand
					? forecastDescription.map((descriptor, index) => (
							<h5 className="descriptor" key={`${forecastType}${index}`}>
								{descriptor}
							</h5>
					  ))
					: ""}
			</div>
		</div>
	);
};

export default ForecastType;
