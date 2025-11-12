import { calculateCurrent } from "./calculateCurrent";

export function generateVI(diodeType, mode) {
  let start, end;

  if (mode === "forward") {
    if (diodeType === "germanium") { start = 0; end = 0.6; }
    else if (diodeType === "led")  { start = 0; end = 3.5; }
    else                           { start = 0; end = 1.0; } // silicon & zener forward
  } else {
    // Reverse: extend far enough to see breakdown for each diode
    switch (diodeType) {
      case "zener":     start = 0; end = -10; break; // shows -5.6V clearly
      case "silicon":   start = 0; end = -60; break; // show avalanche ~ -50V
      case "germanium": start = 0; end = -40; break; // show ~ -30V
      case "led":       start = 0; end = -8;  break; // show ~ -5V (note: damaging in real life)
      default:          start = 0; end = -50; break;
    }
  }


  const step = (end - start) / 19;
  const data = [];
  for (let i = 0; i < 20; i++) {
    const V = start + step * i;
    data.push({
      voltage: Number(V.toFixed(3)),
      current: Number(calculateCurrent(V, diodeType, mode).toFixed(6)),
    });
  }
  return data;
}
