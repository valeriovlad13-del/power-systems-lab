"use client";

import Link from "next/link";
import { useState } from "react";
import {
  calculateLineParameters, calculateLongLine, calculateNominalModel, calculateShortLine,
  calculateSingleLineToGroundFault, calculateThreePhaseFault, calculateSymmetricalComponents, convertPerUnit,
} from "@/lib/calculations/power";

type Field = { key: string; label: string; unit?: string; initial?: string; step?: string };
type CalculatorConfig = { title: string; description: string; fields: Field[]; notes: string };

const configs: Record<string, CalculatorConfig> = {
  "transmission-line-parameters": {
    title: "Transmission-line parameters",
    description: "Estimate the equivalent phase spacing, inductance, and capacitance for a three-phase transposed line with unequal phase spacing.",
    fields: [
      { key: "spacingABm", label: "Phase spacing AB", unit: "m", initial: "4" },
      { key: "spacingBCm", label: "Phase spacing BC", unit: "m", initial: "5" },
      { key: "spacingCAm", label: "Phase spacing CA", unit: "m", initial: "6" },
      { key: "conductorGmrM", label: "Conductor GMR", unit: "m", initial: "0.01" },
      { key: "conductorRadiusM", label: "Conductor physical radius", unit: "m", initial: "0.012" },
    ],
    notes: "Uses GMD = (Dab·Dbc·Dca)^(1/3), L = 0.2 ln(GMD/GMR) mH/km, and C = 2π ε₀·1000 / ln(GMD/r) μF/km. Bundling, ground effects, and non-transposed-line corrections are not included.",
  },
  "short-line-model": {
    title: "Short-line model",
    description: "Calculate approximate sending voltage, voltage regulation, copper loss, and efficiency for a balanced three-phase short line.",
    fields: [
      { key: "receivingVoltageKV", label: "Receiving line voltage", unit: "kV", initial: "33" },
      { key: "realPowerMW", label: "Receiving real power", unit: "MW", initial: "10" },
      { key: "powerFactor", label: "Power factor", initial: "0.9", step: "any" },
      { key: "resistanceOhmPerPhase", label: "Per-phase resistance", unit: "Ω", initial: "2" },
      { key: "reactanceOhmPerPhase", label: "Per-phase reactance", unit: "Ω", initial: "5" },
    ],
    notes: "Balanced three-phase system; line resistance and reactance are per phase. The receiving voltage is the reference phasor. Choose leading or lagging power factor explicitly.",
  },
  "nominal-models": {
    title: "Nominal-T and nominal-π models",
    description: "Calculate the ABCD transmission parameters from the total per-phase series impedance and total shunt admittance.",
    fields: [
      { key: "resistanceOhm", label: "Total series resistance", unit: "Ω", initial: "8" },
      { key: "reactanceOhm", label: "Total series reactance", unit: "Ω", initial: "30" },
      { key: "conductanceSiemens", label: "Total shunt conductance", unit: "S", initial: "0" },
      { key: "susceptanceSiemens", label: "Total shunt susceptance", unit: "S", initial: "0.0004" },
    ],
    notes: "The total per-phase Z and Y are used. For nominal-T: A=D=1+YZ/2, B=Z(1+YZ/4), C=Y. For nominal-π: A=D=1+YZ/2, B=Z, C=Y(1+YZ/4).",
  },
  "per-unit": {
    title: "Per-unit base conversion",
    description: "Convert a per-unit impedance or reactance from an original base to a new MVA and voltage base.",
    fields: [
      { key: "oldPerUnit", label: "Original per-unit value", initial: "0.15", step: "any" },
      { key: "oldBaseMVA", label: "Original power base", unit: "MVA", initial: "10" },
      { key: "newBaseMVA", label: "New power base", unit: "MVA", initial: "100" },
      { key: "oldBaseKV", label: "Original voltage base", unit: "kV", initial: "13.8" },
      { key: "newBaseKV", label: "New voltage base", unit: "kV", initial: "13.8" },
    ],
    notes: "Uses Xpu,new = Xpu,old × (Sbase,new/Sbase,old) × (Vbase,old/Vbase,new)². Voltage bases must refer to corresponding sides of the transformer and follow the same line/phase convention.",
  },
  "symmetrical-components": {
    title: "Symmetrical components",
    description: "Resolve three phase quantities given in rectangular complex form into zero-, positive-, and negative-sequence components.",
    fields: [
      { key: "vaRe", label: "Phase A real part", unit: "V", initial: "120" },
      { key: "vaIm", label: "Phase A imaginary part", unit: "V", initial: "0" },
      { key: "vbRe", label: "Phase B real part", unit: "V", initial: "-60" },
      { key: "vbIm", label: "Phase B imaginary part", unit: "V", initial: "-103.923" },
      { key: "vcRe", label: "Phase C real part", unit: "V", initial: "-60" },
      { key: "vcIm", label: "Phase C imaginary part", unit: "V", initial: "103.923" },
    ],
    notes: "Uses a = 1∠120°; V₀=(Va+Vb+Vc)/3, V₁=(Va+aVb+a²Vc)/3, and V₂=(Va+a²Vb+aVc)/3. Enter all phase values in the same units and reference frame.",
  },
  "fault-current": {
    title: "Short-circuit and fault current",
    description: "Estimate three-phase fault current from fault level, or a solid single-line-to-ground fault from sequence impedances.",
    fields: [
      { key: "lineVoltageKV", label: "System line voltage", unit: "kV", initial: "11" },
      { key: "faultMVA", label: "Three-phase fault level", unit: "MVA", initial: "100" },
      { key: "positiveSequenceOhm", label: "Positive-sequence impedance (SLG mode)", unit: "Ω", initial: "0.2" },
      { key: "negativeSequenceOhm", label: "Negative-sequence impedance (SLG mode)", unit: "Ω", initial: "0.2" },
      { key: "zeroSequenceOhm", label: "Zero-sequence impedance (SLG mode)", unit: "Ω", initial: "0.6" },
    ],
    notes: "Three-phase mode uses I = Sfault/(√3 VLL). SLG mode uses If = 3Vphase/(Z₁+Z₂+Z₀), assuming a solid fault and sequence impedances entered as real ohmic values. Fault impedance and source contributions are not included.",
  },
  "long-line": {
    title: "Long-line model",
    description: "Use distributed parameters to estimate ABCD constants, sending-end voltage/current, voltage regulation, and efficiency.",
    fields: [
      { key: "resistanceOhmPerKm", label: "Series resistance per km", unit: "Ω/km", initial: "0.05" },
      { key: "reactanceOhmPerKm", label: "Series reactance per km", unit: "Ω/km", initial: "0.35" },
      { key: "conductanceMicroSiemensPerKm", label: "Shunt conductance per km", unit: "μS/km", initial: "0" },
      { key: "susceptanceMicroSiemensPerKm", label: "Shunt susceptance per km", unit: "μS/km", initial: "3.5" },
      { key: "lengthKm", label: "Line length", unit: "km", initial: "250" },
      { key: "receivingVoltageKV", label: "Receiving line voltage", unit: "kV", initial: "220" },
      { key: "receivingCurrentA", label: "Receiving line current", unit: "A", initial: "300" },
      { key: "powerFactor", label: "Receiving power factor", initial: "0.9" },
    ],
    notes: "Assumes balanced operation, distributed uniform parameters, receiving voltage as the reference, and leading/lagging current selected below. G and B inputs are per-kilometre values; voltage regulation is based on no-load receiving voltage at the same sending voltage.",
  },
};

function parse(values: Record<string, string>, key: string, label: string): number {
  const raw = values[key];
  const value = Number(raw);
  if (raw.trim() === "" || !Number.isFinite(value)) throw new Error(`${label} must be a valid finite number.`);
  return value;
}

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "Not finite";
  if (Object.is(n, -0) || Math.abs(n) < 0.0000005) return "0";
  return Number(n.toPrecision(6)).toString();
}

function showValue(value: unknown): string {
  if (typeof value === "number") return fmt(value);
  if (typeof value === "object" && value !== null && "re" in value && "im" in value) {
    const z = value as { re: number; im: number };
    return `${fmt(z.re)} ${z.im < 0 ? "−" : "+"} j${fmt(Math.abs(z.im))}  (|·|=${fmt(Math.hypot(z.re, z.im))}, ∠${fmt(Math.atan2(z.im, z.re) * 180 / Math.PI)}°)`;
  }
  return String(value);
}

export default function CalculatorTool({ slug }: { slug: string }) {
  const config = configs[slug];
  const [values, setValues] = useState<Record<string, string>>(() => Object.fromEntries((config?.fields ?? []).map((f) => [f.key, f.initial ?? "0"])));
  const [model, setModel] = useState<"T" | "pi">("pi");
  const [pfType, setPfType] = useState<"lagging" | "leading">("lagging");
  const [faultMode, setFaultMode] = useState<"three-phase" | "slg">("three-phase");
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!config) {
    return <main className="mx-auto max-w-3xl px-5 py-12"><h1 className="text-2xl font-bold">Calculator not found</h1><p className="mt-3">Choose a calculator from the library.</p><Link className="mt-5 inline-block text-[var(--accent)]" href="/calculators">← Calculator library</Link></main>;
  }

  function calculate() {
    try {
      const n = (key: string) => parse(values, key, config.fields.find((f) => f.key === key)?.label ?? key);
      let output: Record<string, unknown>;
      if (slug === "transmission-line-parameters") {
        output = calculateLineParameters({ spacingABm: n("spacingABm"), spacingBCm: n("spacingBCm"), spacingCAm: n("spacingCAm"), conductorGmrM: n("conductorGmrM"), conductorRadiusM: n("conductorRadiusM") });
      } else if (slug === "short-line-model") {
        output = calculateShortLine({ receivingVoltageKV: n("receivingVoltageKV"), realPowerMW: n("realPowerMW"), powerFactor: n("powerFactor"), resistanceOhmPerPhase: n("resistanceOhmPerPhase"), reactanceOhmPerPhase: n("reactanceOhmPerPhase"), powerFactorType: pfType });
      } else if (slug === "nominal-models") {
        output = calculateNominalModel({ model, resistanceOhm: n("resistanceOhm"), reactanceOhm: n("reactanceOhm"), conductanceSiemens: n("conductanceSiemens"), susceptanceSiemens: n("susceptanceSiemens") });
      } else if (slug === "per-unit") {
        output = convertPerUnit({ oldPerUnit: n("oldPerUnit"), oldBaseMVA: n("oldBaseMVA"), newBaseMVA: n("newBaseMVA"), oldBaseKV: n("oldBaseKV"), newBaseKV: n("newBaseKV") });
      } else if (slug === "symmetrical-components") {
        output = calculateSymmetricalComponents({ vaRe: n("vaRe"), vaIm: n("vaIm"), vbRe: n("vbRe"), vbIm: n("vbIm"), vcRe: n("vcRe"), vcIm: n("vcIm") });
      } else if (slug === "fault-current") {
        output = faultMode === "three-phase"
          ? calculateThreePhaseFault({ faultMVA: n("faultMVA"), lineVoltageKV: n("lineVoltageKV") })
          : calculateSingleLineToGroundFault({ lineVoltageKV: n("lineVoltageKV"), positiveSequenceOhm: n("positiveSequenceOhm"), negativeSequenceOhm: n("negativeSequenceOhm"), zeroSequenceOhm: n("zeroSequenceOhm") });
      } else {
        output = calculateLongLine({ resistanceOhmPerKm: n("resistanceOhmPerKm"), reactanceOhmPerKm: n("reactanceOhmPerKm"), conductanceMicroSiemensPerKm: n("conductanceMicroSiemensPerKm"), susceptanceMicroSiemensPerKm: n("susceptanceMicroSiemensPerKm"), lengthKm: n("lengthKm"), receivingVoltageKV: n("receivingVoltageKV"), receivingCurrentA: n("receivingCurrentA"), powerFactor: n("powerFactor"), powerFactorType: pfType });
      }
      setResult(output);
      setError(null);
    } catch (cause) {
      setResult(null);
      setError(cause instanceof Error ? cause.message : "Unable to calculate from these inputs.");
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
      <Link href="/calculators" className="text-sm font-semibold text-[var(--accent)]">← Calculator library</Link>
      <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Power Systems Calculator</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">{config.title}</h1>
      <p className="mt-3 leading-7 text-[var(--muted)]">{config.description}</p>
      <section className="mt-7 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">
        {(slug === "nominal-models" || slug === "fault-current" || slug === "short-line-model" || slug === "long-line") && (
          <div className="mb-5 flex flex-wrap gap-4">
            {slug === "nominal-models" && <label className="text-sm font-medium">Model<select value={model} onChange={(e) => setModel(e.target.value as "T" | "pi")} className="ml-3 rounded-lg border border-[var(--border)] bg-white px-3 py-2"><option value="pi">Nominal-π</option><option value="T">Nominal-T</option></select></label>}
            {slug === "fault-current" && <label className="text-sm font-medium">Fault type<select value={faultMode} onChange={(e) => setFaultMode(e.target.value as "three-phase" | "slg")} className="ml-3 rounded-lg border border-[var(--border)] bg-white px-3 py-2"><option value="three-phase">Three-phase</option><option value="slg">Single-line-to-ground</option></select></label>}
            {(slug === "short-line-model" || slug === "long-line") && <label className="text-sm font-medium">Power factor type<select value={pfType} onChange={(e) => setPfType(e.target.value as "lagging" | "leading")} className="ml-3 rounded-lg border border-[var(--border)] bg-white px-3 py-2"><option value="lagging">Lagging</option><option value="leading">Leading</option></select></label>}
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          {config.fields.filter((f) => slug !== "fault-current" || faultMode === "slg" || !f.key.endsWith("SequenceOhm")).map((field) => (
            <label key={field.key} className="block text-sm font-medium">
              {field.label}{field.unit ? <span className="ml-1 text-xs text-[var(--muted)]">({field.unit})</span> : null}
              <input type="number" inputMode="decimal" step={field.step ?? "any"} value={values[field.key] ?? field.initial ?? "0"} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))} className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-base outline-none focus:border-[var(--accent)]" />
            </label>
          ))}
        </div>
        <button type="button" onClick={calculate} className="mt-5 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90">Calculate</button>
        {error && <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
        {result && <div aria-live="polite" className="mt-6 rounded-xl border border-[var(--border)] bg-slate-50 p-5">
          <h2 className="font-bold">Results</h2>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">{Object.entries(result).map(([key, value]) => <div key={key} className="min-w-0 rounded-lg border border-[var(--border)] bg-white p-3"><dt className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">{key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}</dt><dd className="mt-1 break-words font-mono text-sm">{showValue(value)}</dd></div>)}</dl>
        </div>}
      </section>
      <section className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="font-bold">Formula and assumptions</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{config.notes}</p>
      </section>
    </main>
  );
}
