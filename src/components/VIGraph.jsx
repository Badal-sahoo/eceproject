import React from "react";
import { Scatter } from "react-chartjs-2";
import "chart.js/auto";

export default function VIGraph({ data }) {
  const chartData = {
    datasets: [
      {
        label: "VI Curve",
        data: data.map((row) => ({ x: row.voltage, y: row.current })),
        borderWidth: 2,
        borderColor: "#006eff",
        showLine: true,
        pointRadius: 0,
        tension: 0.3,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "linear",
        title: { display: true, text: "Voltage (V)" },
        grid: { color: "rgba(0,0,0,0.1)" },
      },
      y: {
        type: "linear",
        title: { display: true, text: "Current (A)" },
        grid: { color: "rgba(0,0,0,0.1)" },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) =>
            `V: ${context.parsed.x.toFixed(2)} V, I: ${context.parsed.y.toFixed(6)} A`,
        },
      },
    },
  };

  return <Scatter data={chartData} options={options} />;
}
