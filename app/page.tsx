import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-8 sm:px-8 lg:py-12">
      <header className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-5">
        <Link href="/" className="text-lg font-bold tracking-tight">Power Systems <span className="text-[var(--accent)]">Lab</span></Link>
        <span className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs font-medium text-[var(--muted)]">Early access</span>
      </header>
      <section className="grid gap-8 py-12 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Learn · Solve · Verify</p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Understand power systems one topic at a time.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">Explore lesson-based questions, follow worked solutions, and use engineering calculators alongside your practice.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/topics" className="rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90">Explore lessons</Link>
            <Link href="/problems" className="rounded-xl border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold hover:bg-slate-50">Browse all questions</Link>
            <Link href="/calculators" className="rounded-xl border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold hover:bg-slate-50">Calculators</Link>
          </div>
        </div>
        <aside className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold text-[var(--muted)]">Practice questions available</p>
          <p className="mt-3 text-3xl font-bold">140</p>
          <p className="mt-1 text-sm text-[var(--muted)]">questions organized around lesson topics</p>
          <div className="my-5 h-px bg-[var(--border)]" />
          <ul className="space-y-3 text-sm leading-6"><li>✓ Browse by lesson topic</li><li>✓ Find questions by keyword or source section</li><li>✓ Verified solutions distinguished from those under review</li></ul>
        </aside>
      </section>
      <section className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8">
        <h2 className="text-2xl font-bold tracking-tight">Start with a lesson</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">Choose a concept, practice the related questions, and build confidence before moving to the next topic.</p>
        <Link href="/topics" className="mt-5 inline-flex rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white">Open topic directory →</Link>
      </section>
      <footer className="mt-12 border-t border-[var(--border)] py-6 text-xs leading-5 text-[var(--muted)]">For learning and practice. Verified solutions are reviewed for formulas, calculations, and units.</footer>
    </main>
  );
}
