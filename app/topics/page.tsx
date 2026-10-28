import Link from "next/link";
import { problems } from "@/content/problems";
import { topics } from "@/content/topics";

const courses = [
  { id: "power-systems-1", title: "Power Systems 1", description: "Transmission-line parameters, line models, performance, efficiency, and surge quantities." },
  { id: "power-systems-2", title: "Power Systems 2", description: "Per-unit calculations, phasors, symmetrical components, sequence networks, and fault analysis." },
];

export default function TopicsPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <Link href="/" className="text-sm font-semibold text-[var(--accent)]">← Home</Link>
      <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Study library</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Study by topic</h1>
      <p className="mt-3 max-w-3xl leading-7 text-[var(--muted)]">
        Choose a lesson area to find its related questions. Each topic opens a filtered set of problems so you can focus on one concept at a time.
      </p>
      <div className="mt-5 flex flex-wrap gap-3 text-sm">
        <span className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5">{problems.length} questions in the library</span>
        <span className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5">{topics.length} topic groups</span>
      </div>
      {courses.map((course) => {
        const courseTopics = topics.filter((topic) => topic.courseId === course.id);
        const courseProblems = problems.filter((problem) => problem.courseId === course.id);
        return (
          <section key={course.id} className="mt-10">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold">{course.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{course.description}</p>
              </div>
              <Link href={`/problems?course=${course.id}`} className="text-sm font-semibold text-[var(--accent)] hover:underline">
                Browse all {courseProblems.length} questions →
              </Link>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {courseTopics.map((topic) => {
                const topicProblems = problems.filter((problem) => problem.courseId === topic.courseId && problem.topicIds.includes(topic.id));
                const verifiedCount = topicProblems.filter((problem) => problem.verificationStatus === "verified").length;
                return (
                  <article key={topic.id} className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-white p-5 transition hover:border-[var(--accent)] hover:shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold leading-6">{topic.title}</h3>
                      <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold">{topicProblems.length}</span>
                    </div>
                    <p className="mt-2 flex-1 text-sm leading-6 text-[var(--muted)]">{topic.description}</p>
                    <p className="mt-4 text-xs text-[var(--muted)]">{verifiedCount} of {topicProblems.length} questions marked verified</p>
                    <Link href={`/problems?course=${topic.courseId}&topic=${topic.id}`} className="mt-4 inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90">
                      Review questions <span aria-hidden="true" className="ml-2">→</span>
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
      <p className="mt-8 rounded-xl border border-[var(--border)] bg-slate-50 p-4 text-sm leading-6 text-[var(--muted)]">
        Note: a question may support more than one topic, so topic counts can overlap and should not be added together to calculate the library total.
      </p>
    </main>
  );
}
