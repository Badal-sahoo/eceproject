import React from "react";
import * as XLSX from "xlsx";

export default function ExcelUpload({ setData }) {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const voltageOnly = json
        .filter((row) => row.length > 0 && !isNaN(row[0]))
        .map(([V]) => ({
          voltage: parseFloat(V),
          current: "",
        }));

      setData(voltageOnly);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div style={{ margin: "10px 0" }}>
      <label
        style={{
          padding: "10px 15px",
          background: "#006eff",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "500",
        }}
      >
        Upload Excel File
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
}
