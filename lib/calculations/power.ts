export interface ComplexValue { re: number; im: number }

function finite(value: number, name: string): void {
  if (!Number.isFinite(value)) throw new Error(`${name} must be finite.`);
}

function positive(value: number, name: string, allowZero = false): void {
  finite(value, name);
  if (allowZero ? value < 0 : value <= 0) throw new Error(`${name} must be ${allowZero ? "zero or positive" : "greater than zero"}.`);
}

const add = (a: ComplexValue, b: ComplexValue): ComplexValue => ({ re: a.re + b.re, im: a.im + b.im });
const mul = (a: ComplexValue, b: ComplexValue): ComplexValue => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
const scale = (a: ComplexValue, k: number): ComplexValue => ({ re: a.re * k, im: a.im * k });
const div = (a: ComplexValue, b: ComplexValue): ComplexValue => {
  const d = b.re * b.re + b.im * b.im;
  if (d === 0) throw new Error("Cannot divide by a zero complex value.");
  return { re: (a.re * b.re + a.im * b.im) / d, im: (a.im * b.re - a.re * b.im) / d };
};
const magnitude = (a: ComplexValue): number => Math.hypot(a.re, a.im);
const polar = (m: number, degrees: number): ComplexValue => ({ re: m * Math.cos(degrees * Math.PI / 180), im: m * Math.sin(degrees * Math.PI / 180) });
const angle = (a: ComplexValue): number => Math.atan2(a.im, a.re) * 180 / Math.PI;
const sqrt = (z: ComplexValue): ComplexValue => {
  const m = magnitude(z);
  return { re: Math.sqrt(Math.max(0, (m + z.re) / 2)), im: Math.sign(z.im || 1) * Math.sqrt(Math.max(0, (m - z.re) / 2)) };
};
const sinh = (z: ComplexValue): ComplexValue => ({ re: Math.sinh(z.re) * Math.cos(z.im), im: Math.cosh(z.re) * Math.sin(z.im) });
const cosh = (z: ComplexValue): ComplexValue => ({ re: Math.cosh(z.re) * Math.cos(z.im), im: Math.sinh(z.re) * Math.sin(z.im) });

export function calculateLineParameters(input: {
  spacingABm: number; spacingBCm: number; spacingCAm: number; conductorGmrM: number; conductorRadiusM: number;
}) {
  const { spacingABm: ab, spacingBCm: bc, spacingCAm: ca, conductorGmrM: gmr, conductorRadiusM: radius } = input;
  positive(ab, "AB spacing"); positive(bc, "BC spacing"); positive(ca, "CA spacing");
  positive(gmr, "Conductor GMR"); positive(radius, "Conductor radius");
  const gmd = Math.cbrt(ab * bc * ca);
  if (gmr >= gmd || radius >= gmd) throw new Error("Conductor dimensions must be smaller than the equivalent phase spacing.");
  return {
    gmdM: gmd,
    inductanceMilliHenryPerKm: 0.2 * Math.log(gmd / gmr),
    capacitanceMicroFaradPerKm: (2 * Math.PI * 8.8541878128e-12 * 1000 * 1e6) / Math.log(gmd / radius),
  };
}

export function calculateShortLine(input: {
  receivingVoltageKV: number; realPowerMW: number; powerFactor: number; resistanceOhmPerPhase: number; reactanceOhmPerPhase: number; powerFactorType: "lagging" | "leading";
}) {
  const { receivingVoltageKV: v, realPowerMW: p, powerFactor: pf, resistanceOhmPerPhase: r, reactanceOhmPerPhase: x, powerFactorType } = input;
  positive(v, "Receiving voltage"); positive(p, "Real power", true); positive(pf, "Power factor");
  if (pf > 1) throw new Error("Power factor must be between zero and one.");
  positive(r, "Resistance", true); positive(x, "Reactance", true);
  const currentA = p * 1e6 / (Math.sqrt(3) * v * 1e3 * pf);
  const phiDegrees = Math.acos(pf) * 180 / Math.PI * (powerFactorType === "lagging" ? 1 : -1);
  const vr = { re: v * 1e3 / Math.sqrt(3), im: 0 };
  const ir = polar(currentA, -phiDegrees);
  const vs = add(vr, mul({ re: r, im: x }, ir));
  const sendingVoltageKV = magnitude(vs) * Math.sqrt(3) / 1000;
  const lossesW = 3 * currentA * currentA * r;
  return {
    currentA, sendingVoltageKV, voltageRegulationPercent: (sendingVoltageKV - v) / v * 100,
    copperLossKW: lossesW / 1000, efficiencyPercent: p * 1e6 / (p * 1e6 + lossesW) * 100,
    sendingPhaseVoltageV: magnitude(vs), sendingPhaseAngleDegrees: angle(vs),
  };
}

export function calculateNominalModel(input: {
  model: "T" | "pi"; resistanceOhm: number; reactanceOhm: number; conductanceSiemens: number; susceptanceSiemens: number;
}) {
  const { model, resistanceOhm: r, reactanceOhm: x, conductanceSiemens: g, susceptanceSiemens: b } = input;
  finite(r, "Resistance"); finite(x, "Reactance"); finite(g, "Conductance"); finite(b, "Susceptance");
  const z = { re: r, im: x }, y = { re: g, im: b };
  const yz = mul(y, z);
  const a = add({ re: 1, im: 0 }, scale(yz, 0.5));
  return {
    A: a,
    B: model === "T" ? add(z, scale(mul(z, yz), 0.25)) : z,
    C: model === "T" ? y : mul(y, add({ re: 1, im: 0 }, scale(yz, 0.25))),
    D: a,
  };
}

export function convertPerUnit(input: { oldPerUnit: number; oldBaseMVA: number; newBaseMVA: number; oldBaseKV: number; newBaseKV: number }) {
  const { oldPerUnit: x, oldBaseMVA: sold, newBaseMVA: snew, oldBaseKV: vold, newBaseKV: vnew } = input;
  finite(x, "Original per-unit value"); positive(sold, "Original MVA base"); positive(snew, "New MVA base");
  positive(vold, "Original voltage base"); positive(vnew, "New voltage base");
  return { newPerUnit: x * (snew / sold) * (vold / vnew) ** 2 };
}

export function calculateSymmetricalComponents(input: {
  vaRe: number; vaIm: number; vbRe: number; vbIm: number; vcRe: number; vcIm: number;
}) {
  Object.entries(input).forEach(([key, value]) => finite(value, key));
  const va = { re: input.vaRe, im: input.vaIm }, vb = { re: input.vbRe, im: input.vbIm }, vc = { re: input.vcRe, im: input.vcIm };
  const a = polar(1, 120), a2 = mul(a, a);
  return {
    zero: scale(add(add(va, vb), vc), 1 / 3),
    positive: scale(add(add(va, mul(a, vb)), mul(a2, vc)), 1 / 3),
    negative: scale(add(add(va, mul(a2, vb)), mul(a, vc)), 1 / 3),
  };
}

export function calculateThreePhaseFault(input: { faultMVA: number; lineVoltageKV: number }) {
  positive(input.faultMVA, "Fault level"); positive(input.lineVoltageKV, "Line voltage");
  return { faultCurrentKA: input.faultMVA / (Math.sqrt(3) * input.lineVoltageKV) };
}

export function calculateSingleLineToGroundFault(input: {
  lineVoltageKV: number; positiveSequenceOhm: number; negativeSequenceOhm: number; zeroSequenceOhm: number;
}) {
  positive(input.lineVoltageKV, "Line voltage");
  const sequence = [input.positiveSequenceOhm, input.negativeSequenceOhm, input.zeroSequenceOhm];
  sequence.forEach((z, i) => positive(z, ["Positive-sequence impedance", "Negative-sequence impedance", "Zero-sequence impedance"][i], true));
  const denominator = sequence.reduce((sum, value) => sum + value, 0);
  positive(denominator, "Sum of sequence impedances");
  const faultCurrentA = 3 * input.lineVoltageKV * 1000 / Math.sqrt(3) / denominator;
  return { faultCurrentA, faultCurrentKA: faultCurrentA / 1000 };
}

export function calculateLongLine(input: {
  resistanceOhmPerKm: number; reactanceOhmPerKm: number; conductanceMicroSiemensPerKm: number; susceptanceMicroSiemensPerKm: number;
  lengthKm: number; receivingVoltageKV: number; receivingCurrentA: number; powerFactor: number; powerFactorType: "lagging" | "leading";
}) {
  const { resistanceOhmPerKm: r, reactanceOhmPerKm: x, conductanceMicroSiemensPerKm: g, susceptanceMicroSiemensPerKm: b, lengthKm: l, receivingVoltageKV: v, receivingCurrentA: i, powerFactor: pf, powerFactorType } = input;
  [r, x, g, b].forEach((value, idx) => finite(value, ["Resistance/km", "Reactance/km", "Conductance/km", "Susceptance/km"][idx]));
  if (r < 0 || g < 0) throw new Error("Resistance and conductance cannot be negative.");
  positive(l, "Line length"); positive(v, "Receiving voltage"); positive(i, "Receiving current", true); positive(pf, "Power factor");
  if (pf > 1) throw new Error("Power factor must be between zero and one.");
  const z = { re: r * l, im: x * l }, y = { re: g * 1e-6 * l, im: b * 1e-6 * l };
  let A: ComplexValue, B: ComplexValue, C: ComplexValue, D: ComplexValue;
  if (magnitude(y) === 0) {
    A = { re: 1, im: 0 }; B = z; C = { re: 0, im: 0 }; D = A;
  } else if (magnitude(z) === 0) {
    A = { re: 1, im: 0 }; B = { re: 0, im: 0 }; C = y; D = A;
  } else {
    const gammaL = sqrt(mul(z, y));
    const zc = sqrt(div(z, y));
    A = cosh(gammaL); D = A;
    B = mul(zc, sinh(gammaL));
    C = div(sinh(gammaL), zc);
  }
  const vr = { re: v * 1000 / Math.sqrt(3), im: 0 };
  const angleIr = (powerFactorType === "lagging" ? -1 : 1) * Math.acos(pf) * 180 / Math.PI;
  const ir = polar(i, angleIr);
  const vs = add(mul(A, vr), mul(B, ir));
  const is = add(mul(C, vr), mul(D, ir));
  const noLoadVr = div(vs, A);
  const receivingPowerW = 3 * (vr.re * ir.re + vr.im * ir.im);
  const sendingPowerW = 3 * (vs.re * is.re + vs.im * is.im);
  return {
    A, B, C, D, sendingVoltageKV: magnitude(vs) * Math.sqrt(3) / 1000,
    sendingCurrentA: magnitude(is), voltageRegulationPercent: (magnitude(noLoadVr) - magnitude(vr)) / magnitude(vr) * 100,
    receivingPowerMW: receivingPowerW / 1e6, sendingPowerMW: sendingPowerW / 1e6,
    efficiencyPercent: sendingPowerW === 0 ? 0 : receivingPowerW / sendingPowerW * 100,
  };
}
