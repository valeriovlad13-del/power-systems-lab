"use client";

import Link from "next/link";
import { useState } from "react";
import { complexAdd, complexDivide, complexMultiply, complexToPolar, type ComplexNumber } from "@/lib/calculations/complex";

type Operation = "add" | "subtract" | "multiply" | "divide" | "polar";

const initial = { aRe: "3", aIm: "2", bRe: "1", bIm: "-5" };

function parseNumber(value: string, label: string): number {
  const parsed = Number(value);
  if (value.trim() === "" || !Number.isFinite(parsed)) throw new Error(`${label} must be a valid finite number.`);
  return parsed;
}

function format(value: number): string {
  return Object.is(value, -0) || Math.abs(value) < 0.0005 ? "0" : Number(value.toFixed(3)).toString();
}

function formatComplex(value: ComplexNumber): string {
  const sign = value.im < 0 ? "−" : "+";
  return `${format(value.re)} ${sign} j${format(Math.abs(value.im))}`;
}

export default function ComplexCalculatorPage() {
  const [values, setValues] = useState(initial);
  const [operation, setOperation] = useState<Operation>("add");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function calculate() {
    try {
      const a = { re: parseNumber(values.aRe, "A real part"), im: parseNumber(values.aIm, "A imaginary part") };
      const b = { re: parseNumber(values.bRe, "B real part"), im: parseNumber(values.bIm, "B imaginary part") };
      let output: string;
      if (operation === "add") output = formatComplex(complexAdd(a, b));
      else if (operation === "subtract") output = formatComplex(complexAdd(a, { re: -b.re, im: -b.im }));
      else if (operation === "multiply") output = formatComplex(complexMultiply(a, b));
      else if (operation === "divide") output = formatComplex(complexDivide(a, b));
      else {
        const polar = complexToPolar(a);
        output = `${format(polar.magnitude)} ∠ ${format(polar.angleDegrees)}°`;
      }
      setResult(output);
      setError(null);
    } catch (cause) {
      setResult(null);
      setError(cause instanceof Error ? cause.message : "Unable to calculate with these inputs.");
    }
  }

  const fields = [
    { key: "aRe" as const, label: "A · Real part" },
    { key: "aIm" as const, label: "A · Imaginary part" },
    { key: "bRe" as const, label: "B · Real part" },
    { key: "bIm" as const, label: "B · Imaginary part" },
  ];

  return (
    <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
      <Link href="/calculators" className="text-sm font-semibold text-[var(--accent)]">← Calculator library</Link>
      <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Calculator 01</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Complex numbers and phasors</h1>
      <p className="mt-3 leading-7 text-[var(--muted)]">Perform basic operations on rectangular complex values. Values are dimensionless unless used with a consistent unit outside this calculator.</p>

      <section className="mt-7 rounded-2xl border border-[var(--border)] bg-white p-5 sm:p-7">
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <label key={field.key} className="block text-sm font-medium">
              {field.label}
              <input
                type="number"
                step="any"
                value={values[field.key]}
                onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))}
                className="mt-2 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-3 text-base outline-none focus:border-[var(--accent)]"
              />
            </label>
          ))}
        </div>
        <label className="mt-5 block text-sm font-medium">
          Operation
          <select value={operation} onChange={(event) => setOperation(event.target.value as Operation)} className="mt-2 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-3 text-base">
            <option value="add">A + B</option>
            <option value="subtract">A − B</option>
            <option value="multiply">A × B</option>
            <option value="divide">A ÷ B</option>
            <option value="polar">Convert A to polar form</option>
          </select>
        </label>
        <button type="button" onClick={calculate} className="mt-5 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90">Calculate</button>

        {error && <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
        {result !== null && <div aria-live="polite" className="mt-5 rounded-xl border border-[var(--border)] bg-slate-50 p-5"><p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Result</p><p className="mt-2 break-words font-mono text-2xl font-bold">{result}</p></div>}
      </section>

      <section className="mt-6 rounded-xl border border-[var(--border)] bg-white p-5">
        <h2 className="font-bold">Conventions</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Rectangular form is written as a + jb. Polar form uses magnitude ∠ angle in degrees. The result is rounded to three decimal places for display only; internal calculations use unrounded values.</p>
      </section>
    </main>
  );
}
