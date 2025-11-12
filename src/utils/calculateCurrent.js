// Ideal-but-practical model with reverse breakdown for all diodes
export function calculateCurrent(voltage, diodeType, mode) {
  // Per-diode parameters
  const P = {
    silicon:   { Vf: 0.7,  I_leak: -5e-5,  Vbr: -50,  Kbr: 0.01 }, // avalanche ~50V
    germanium: { Vf: 0.3,  I_leak: -2e-4,  Vbr: -30,  Kbr: 0.01 }, // lower than Si
    led:       { Vf: 2.0,  I_leak: -5e-6,  Vbr: -5,   Kbr: 0.02 }, // LEDs break ~5V (damaging)
    zener:     { Vf: 0.7,  I_leak: -5e-5,  Vbr: -5.6, Kbr: 0.12 }, // designed breakdown
  };

  const d = P[diodeType] ?? P.silicon;
  // Reverse region
  if (mode === "reverse") {
    if (voltage > d.Vbr) return d.I_leak;
    return d.Kbr * (voltage - d.Vbr);
  }

  // Forward region
  const Kf = 0.15; // A/V
  if (voltage < d.Vf) return 0;
  return Kf * (voltage - d.Vf);
}
