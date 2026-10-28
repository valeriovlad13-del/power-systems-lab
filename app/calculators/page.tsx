import Link from "next/link";

const calculators = [
  { name: "Complex numbers and phasors", href: "/calculators/complex", description: "Rectangular and polar complex arithmetic.", status: "Available" },
  { name: "Transmission-line parameters", href: "/calculators/transmission-line-parameters", description: "Equivalent phase spacing, inductance, and capacitance.", status: "Available" },
  { name: "Short-line model", href: "/calculators/short-line-model", description: "Sending voltage, regulation, losses, and efficiency.", status: "Available" },
  { name: "Nominal-T and nominal-π models", href: "/calculators/nominal-models", description: "ABCD constants for medium transmission lines.", status: "Available" },
  { name: "Per-unit base conversion", href: "/calculators/per-unit", description: "Convert impedance between MVA and voltage bases.", status: "Available" },
  { name: "Symmetrical components", href: "/calculators/symmetrical-components", description: "Resolve phase values into sequence components.", status: "Available" },
  { name: "Short-circuit and fault current", href: "/calculators/fault-current", description: "Three-phase fault level and SLG sequence-current estimates.", status: "Available" },
  { name: "Long-line model", href: "/calculators/long-line", description: "Distributed parameters and long-line ABCD constants.", status: "Available" },
];

export default function CalculatorsPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
      <Link href="/" className="text-sm font-semibold text-[var(--accent)]">← Home</Link>
      <h1 className="mt-8 text-3xl font-bold">Calculator library</h1>
      <p className="mt-3 leading-7 text-[var(--muted)]">
        Power-system calculations with explicit units, visible assumptions, validated inputs, and reusable numerical functions. Results are estimates based on each calculator’s stated model.
      </p>
      <ul className="mt-6 divide-y divide-[var(--border)] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        {calculators.map((item, index) => (
          <li key={item.name} className="flex items-start gap-4 px-4 py-4 sm:items-center">
            <span className="w-6 shrink-0 pt-1 font-mono text-[var(--accent)] sm:pt-0">{String(index + 1).padStart(2, "0")}</span>
            <div className="min-w-0 flex-1">
              <h2 className="font-semibold">{item.name}</h2>
              <p className="mt-1 text-sm leading-5 text-[var(--muted)]">{item.description}</p>
            </div>
            <Link href={item.href} className="shrink-0 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--accent)] hover:bg-slate-50">{item.status} →</Link>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-xs leading-5 text-[var(--muted)]">Verify input units and system assumptions before applying results to real equipment or protection settings.</p>
    </main>
  );
}
