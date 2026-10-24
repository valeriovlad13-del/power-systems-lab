import Link from "next/link";

const planned = [
  "Complex numbers and phasors",
  "Transmission-line parameters",
  "Short-line model",
  "Nominal-T and nominal-π models",
  "Per-unit base conversion",
  "Symmetrical components",
  "Short-circuit and fault current",
  "Long-line and surge quantities",
];

export default function CalculatorsPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
      <Link href="/" className="text-sm font-semibold text-[var(--accent)]">
        ← Home
      </Link>
      <h1 className="mt-8 text-3xl font-bold">Calculator library</h1>
      <p className="mt-3 leading-7 text-[var(--muted)]">
        Planned calculators will use deterministic functions, validated inputs,
        and automated tests. These entries are roadmap items, not functional
        calculators yet.
      </p>
      <ul className="mt-6 divide-y divide-[var(--border)] rounded-xl border border-[var(--border)] bg-white">
        {planned.map((name, index) => (
          <li key={name} className="flex gap-4 px-4 py-4 text-sm">
            <span className="w-6 shrink-0 font-mono text-[var(--accent)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{name}</span>
            <span className="ml-auto text-xs text-[var(--muted)]">Planned</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
