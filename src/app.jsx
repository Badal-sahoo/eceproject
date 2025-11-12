import React, { useState, useEffect } from "react";
import DiodeForm from "./components/Diodeform";
import VITable from "./components/VITable";
import VIGraph from "./components/VIGraph";
import ExcelUpload from "./components/ExcelUpload";
import { generateVI } from "./utils/generateVI";
import { calculateCurrent } from "./utils/calculateCurrent";
import "./app.css";

export default function App() {
  const [diodeType, setDiodeType] = useState("silicon");
  const [mode, setMode] = useState("forward");
  const [data, setData] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const blankData = Array.from({ length: 20 }, () => ({
      voltage: "",
      current: "",
    }));
    setData(blankData);
  }, []);

  const createData = () => {
    const tableData = generateVI(diodeType, mode).map((d) => ({
      voltage: d.voltage,
      current: "",
    }));
    setData(tableData);
    setSubmitted(false);
  };

  const handleSubmit = () => {
    const filledData = data.map((row) => {
      if (row.voltage === "" || isNaN(row.voltage)) return { ...row, current: "" };
      const I = calculateCurrent(Number(row.voltage), diodeType, mode);
      return { voltage: row.voltage, current: Number(I.toFixed(6)) };
    });
    setData(filledData);
    setSubmitted(true);
  };

  return (
    <div className="app-container">
      <header className="header-section">
        <h1 className="project-title">⚡ Diode VI Characteristics Simulator</h1>
        <p className="tagline">Interactive Electronics Experiment Tool</p>
        <p className="description">
          Simulate and visualize the <b>Voltage–Current (VI)</b> behavior of <b>Silicon</b>,
          <b> Germanium</b>, <b>LED</b>, and <b>Zener</b> diodes under forward and reverse bias.
          You can <b>generate data</b> or <b>upload your Excel readings</b> to plot accurate real-time graphs.
        </p>
        <div className="divider"></div>
      </header>

      <div className="card" style={{ flexDirection: "column", gap: "1em" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.2em",
          }}
        >
          <DiodeForm
            diodeType={diodeType}
            setDiodeType={setDiodeType}
            mode={mode}
            setMode={setMode}
            onGenerate={createData}
          />
          <ExcelUpload setData={setData} diodeType={diodeType} mode={mode} />
          <button
            onClick={handleSubmit}
            disabled={data.length === 0}
            style={{
              opacity: data.length === 0 ? 0.6 : 1,
              cursor: data.length === 0 ? "not-allowed" : "pointer",
              fontSize: "15px",
            }}
          >
            Submit
          </button>
        </div>
      </div>

      <div className="card" style={{ flexDirection: "column", marginTop: "30px" }}>
        <VITable data={data} setData={setData} />
        <div
          style={{
            width: "90%",
            marginTop: "30px",
            minHeight: "400px",
            background: submitted ? "transparent" : "rgba(0,0,0,0.03)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {submitted ? (
            <VIGraph data={data} />
          ) : (
            <p style={{ color: "#888", fontStyle: "italic" }}>
              Graph will appear here after you click <b>Submit</b>.
            </p>
          )}
        </div>
      </div>

      <footer className="footer-section">
        <div className="footer-content">
          <div className="footer-column">
            <h3>📘 Conclusion</h3>
            <p>
              This simulator effectively demonstrates the <b>VI characteristics</b> of semiconductor diodes.
              It helps visualize the <b>threshold</b> and <b>breakdown</b> regions, enhancing understanding
              of <b>forward</b> and <b>reverse bias</b> behavior in real-world circuits.
            </p>
          </div>

          <div className="footer-column">
            <h3>👨‍💻 Project Members</h3>
            <ul className="members-grid">
              <li>Badal Sahoo</li>
              <li>Sagar Sarangi</li>
              <li>Pritamjit Nayak</li>
              <li>Sanchit Shuvam Behera</li>
              <li>Prayash Bharadwaj</li>
              <li>Renish Vora</li>
              <li>Harshit Chawla</li>
              <li>Sunista Agrawal</li>
              <li>Anwesha Sarkar</li>
              <li>Prince Tembhare</li>
              <li>Shayari Thakur</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Diode VI Characteristics Simulator | Department of Electronics, NIT Rourkela
          </p>
        </div>
      </footer>
    </div>
  );
}
<!-- redeploy fix -->
