import React from "react";

export default function DiodeForm({ diodeType, setDiodeType, mode, setMode, onGenerate }) {
  return (
    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
      <label style={{ marginRight: "8px" }}>Diode Type:</label>
      <select value={diodeType} onChange={(e) => setDiodeType(e.target.value)}>
        <option value="silicon">Silicon</option>
        <option value="germanium">Germanium</option>
        <option value="zener">Zener</option>
        <option value="led">LED</option>
      </select>

      <label style={{ marginLeft: "20px", marginRight: "8px" }}>Bias Mode:</label>
      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="forward">Forward Bias</option>
        <option value="reverse">Reverse Bias</option>
      </select>

      <button style={{ marginLeft: "20px" }} onClick={onGenerate}>
        Generate VI Data
      </button>
    </div>
  );
}
