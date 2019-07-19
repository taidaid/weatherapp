import React from "react";
import { Line } from "react-chartjs-2";

const Chart = ({ forecast, getHourFromUnixTime, units }) => {
  const formatChart = forecast => {
    const data = {
      labels: [],
      datasets: [
        {
          label: "Precipitation Chance",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(66,123,245,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(227,227,227,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [],
        },
        {
          label: `Temperature in ${units === "us" ? `°F` : `°C`}`,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(255,66,66,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(227,227,227,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(128,0,0,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [],
        },
      ],
    };
    forecast.data.map((hour, index) => {
      data.labels.push(getHourFromUnixTime(hour.time));
      data.datasets[0].data.push(Math.round(hour.precipProbability * 100));
      data.datasets[1].data.push(
        units === "us"
          ? Math.round(hour.temperature)
          : Math.round(((hour.temperature - 32) * 5) / 9)
      );
    });
    return data;
  };

  return (
    <div>
      <Line
        data={() => formatChart(forecast)}
        options={{ maintainAspectRatio: false }}
        width={100}
        height={500}
      />
    </div>
  );
};

export default Chart;
