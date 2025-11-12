import React from "react";

export default function VITable({ data, setData }) {
  const handleVoltageChange = (index, newVoltage) => {
    const newData = [...data];
    newData[index].voltage = parseFloat(newVoltage);
    setData(newData);
  };

  return (
    <table border="1" cellPadding="8" style={{ margin: "20px auto", width: "60%" }}>
      <thead style={{ background: "#006eff", color: "white" }}>
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
                type="number"
                value={row.voltage}
                onChange={(e) => handleVoltageChange(i, e.target.value)}
                style={{ width: "80px", textAlign: "center" }}
              />
            </td>
            <td style={{ textAlign: "center" }}>
              {row.current === "" ? "—" : row.current}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
