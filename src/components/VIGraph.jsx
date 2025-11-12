import React from "react";
import { Scatter } from "react-chartjs-2";
import "chart.js/auto";   // <-- This line auto-registers everything

export default function VIGraph({ data }) {
  const chartData = {
    datasets: [
      {
        label: "VI Curve",
        data: data.map(row => ({ x: row.voltage, y: row.current })), // True X-Y plotting
        borderWidth: 2,
        showLine: true,
        pointRadius: 0,
        tension: 0.3
      }
    ]
  };

  const options = {
    scales: {
      x: {
        type: "linear",
        title: { display: true, text: "Voltage (V)" },
        zeroLineWidth: 2
      },
      y: {
        type: "linear",
        title: { display: true, text: "Current (A)" }
      }
    },
    plugins: { legend: { display: false } }
  };

  return <Scatter data={chartData} options={options} />;
}
