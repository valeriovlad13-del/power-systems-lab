import Link from "next/link";
import { topics } from "@/content/topics";

export default function TopicsPage() {
  const grouped = [
    { id: "power-systems-1", title: "Power Systems 1" },
    { id: "power-systems-2", title: "Power Systems 2" },
  ];

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <Link href="/" className="text-sm font-semibold text-[var(--accent)]">← Home</Link>
      <h1 className="mt-8 text-3xl font-bold tracking-tight">Browse by topic</h1>
      <p className="mt-3 max-w-3xl leading-7 text-[var(--muted)]">
        These topics are a proposed map of the subject. Each question will be assigned after its wording and requirements have been audited against the source.
      </p>
      {grouped.map((course) => (
        <section key={course.id} className="mt-9">
          <h2 className="text-xl font-bold">{course.title}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topics.filter((topic) => topic.courseId === course.id).map((topic) => (
              <article key={topic.id} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <h3 className="font-semibold">{topic.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{topic.description}</p>
                <p className="mt-4 text-xs text-[var(--muted)]">Problem mapping pending</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
