import React from "react";
import { calculateCurrent } from "../utils/calculateCurrent";

export default function VITable({ data, setData, diodeType, mode }) {

  const handleVoltageChange = (index, newV) => {
    let temp = [...data];
    const V = parseFloat(newV);
    const I = calculateCurrent(V, diodeType, mode);
    temp[index] = { voltage: V, current: Number(I.toFixed(6)) };
    setData(temp);
  };

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Voltage (V)</th>
          <th>Current (A)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            <td>
              <input
                value={row.voltage}
                onChange={(e) => handleVoltageChange(i, e.target.value)}
                style={{ width: "80px" }}
              />
            </td>
            <td>{row.current}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
