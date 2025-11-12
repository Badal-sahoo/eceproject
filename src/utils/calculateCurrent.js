export function calculateCurrent(voltage, diodeType, mode) {
  const P = {
    silicon: { Vf: 0.7, I_leak: -5e-5, Vbr: -50, Kbr: 0.01 },
    germanium: { Vf: 0.3, I_leak: -2e-4, Vbr: -30, Kbr: 0.01 },
    led: { Vf: 2.0, I_leak: -5e-6, Vbr: -5, Kbr: 0.02 },
    zener: { Vf: 0.7, I_leak: -5e-5, Vbr: -5.6, Kbr: 0.12 },
  };

  const d = P[diodeType] ?? P.silicon;

  if (mode === "reverse") {
    if (voltage > d.Vbr) return d.I_leak;
    return d.Kbr * (voltage - d.Vbr);
  }

  const Kf = 0.15;
  if (voltage < d.Vf) return 0;
  return Kf * (voltage - d.Vf);
}
