import Link from "next/link";

const planned = [
  { name: "Complex numbers and phasors", href: "/calculators/complex", status: "Available" },
  { name: "Transmission-line parameters", href: null, status: "Planned" },
  { name: "Short-line model", href: null, status: "Planned" },
  { name: "Nominal-T and nominal-π models", href: null, status: "Planned" },
  { name: "Per-unit base conversion", href: null, status: "Planned" },
  { name: "Symmetrical components", href: null, status: "Planned" },
  { name: "Short-circuit and fault current", href: null, status: "Planned" },
  { name: "Long-line and surge quantities", href: null, status: "Planned" },
];

export default function CalculatorsPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
      <Link href="/" className="text-sm font-semibold text-[var(--accent)]">← Home</Link>
      <h1 className="mt-8 text-3xl font-bold">Calculator library</h1>
      <p className="mt-3 leading-7 text-[var(--muted)]">
        Engineering calculators use deterministic functions and validated inputs. More calculators will be added alongside reviewed problem sets.
      </p>
      <ul className="mt-6 divide-y divide-[var(--border)] rounded-xl border border-[var(--border)] bg-white">
        {planned.map((item, index) => (
          <li key={item.name} className="flex items-center gap-4 px-4 py-4 text-sm">
            <span className="w-6 shrink-0 font-mono text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span>
            <span className="flex-1">{item.name}</span>
            {item.href ? (
              <Link href={item.href} className="text-xs font-semibold text-[var(--accent)] hover:underline">{item.status} →</Link>
            ) : (
              <span className="text-xs text-[var(--muted)]">{item.status}</span>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
