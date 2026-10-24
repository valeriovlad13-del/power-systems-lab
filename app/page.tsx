import Link from "next/link";

const courses = [
  {
    id: "power-systems-1",
    title: "Power Systems 1",
    description:
      "Transmission-line parameters, line performance, efficiency, and surge quantities.",
    count: "80 source questions",
    href: "/courses/power-systems-1",
  },
  {
    id: "power-systems-2",
    title: "Power Systems 2",
    description:
      "Per-unit calculations, symmetrical components, sequence networks, and fault analysis.",
    count: "60 source questions",
    href: "/courses/power-systems-2",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-8 sm:px-8 lg:py-12">
      <header className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-5">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Power Systems <span className="text-[var(--accent)]">Lab</span>
        </Link>
        <span className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs font-medium text-[var(--muted)]">
          Initial scaffold
        </span>
      </header>

      <section className="grid gap-8 py-12 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            Learn · Solve · Verify
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Understand power systems one step at a time.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
            Browse problems by topic, follow structured worked solutions, and use engineering calculators alongside your practice.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#courses"
              className="rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Browse courses
            </a>
            <Link
              href="/calculators"
              className="rounded-xl border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold hover:bg-slate-50"
            >
              Calculator library
            </Link>
          </div>
        </div>

        <aside className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold text-[var(--muted)]">Source inventory</p>
          <p className="mt-3 text-3xl font-bold">140</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            questions awaiting structured inventory and technical review
          </p>
          <div className="my-5 h-px bg-[var(--border)]" />
          <ul className="space-y-3 text-sm leading-6">
            <li>✓ Original source numbering retained</li>
            <li>✓ Topic labels kept separate from source sections</li>
            <li>✓ Worked solutions require verification</li>
          </ul>
        </aside>
      </section>

      <section id="courses" className="pb-12">
        <div className="mb-5">
          <h2 className="text-2xl font-bold tracking-tight">Choose a course</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Counts reflect the source document, not the number of verified solutions.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <article
              key={course.id}
              className="rounded-2xl border border-[var(--border)] bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                {course.count}
              </p>
              <h3 className="mt-3 text-xl font-bold">{course.title}</h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-[var(--muted)]">
                {course.description}
              </p>
              <Link
                href={course.href}
                className="mt-5 inline-flex text-sm font-semibold text-[var(--accent)] hover:underline"
              >
                Open course <span aria-hidden="true" className="ml-2">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-[var(--border)] py-6 text-xs leading-5 text-[var(--muted)]">
        Educational reference only. Solutions will be marked verified only after technical review.
      </footer>
    </main>
  );
}
