import React, { useState } from "react";
import DiodeForm from "./components/Diodeform";
import VITable from "./components/VITable";
import VIGraph from "./components/VIGraph";
import { generateVI } from "./utils/generateVI";
import "./app.css";

export default function App() {
  const [diodeType, setDiodeType] = useState("silicon");
  const [mode, setMode] = useState("forward");
  const [data, setData] = useState([]);

  const createData = () => {
    const tableData = generateVI(diodeType, mode);
    setData(tableData);
  };

  return (
  <div className="app-container">
    <h1>Diode VI Characteristics Simulator</h1>

    <div className="card">
      <DiodeForm
        diodeType={diodeType}
        setDiodeType={setDiodeType}
        mode={mode}
        setMode={setMode}
        onGenerate={createData}
      />
    </div>

    {data.length > 0 && (
      <>
        <div className="card">
          <VITable data={data} setData={setData} diodeType={diodeType} mode={mode} />
        </div>

        <div className="card">
          <VIGraph data={data} />
        </div>
      </>
    )}
  </div>
);
}