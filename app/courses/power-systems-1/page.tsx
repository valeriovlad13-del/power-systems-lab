import Link from "next/link";

export default function PowerSystemsOnePage() {
  return <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
    <Link href="/" className="text-sm font-semibold text-[var(--accent)]">← Home</Link>
    <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Course 1</p>
    <h1 className="mt-2 text-3xl font-bold">Power Systems 1</h1>
    <p className="mt-3 leading-7 text-[var(--muted)]">The source contains 80 questions: Main Tutorial Problems (1–20) and Out of the Box Questions (1–60). Topic assignments are provisional and will be reviewed question by question.</p>
    <div className="mt-6 rounded-xl border border-[var(--border)] bg-white p-5"><p className="font-semibold">Included topics</p><p className="mt-2 text-sm leading-6 text-[var(--muted)]">Conductor and line parameters, line performance, efficiency and maximum power, short and medium lines, long lines, surge impedance and SIL.</p><Link href="/problems?course=power-systems-1" className="mt-4 inline-flex rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white">Browse 80 questions →</Link></div>
  </main>;
}
