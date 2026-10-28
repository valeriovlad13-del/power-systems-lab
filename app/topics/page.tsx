import Link from "next/link";
import { problems } from "@/content/problems";
import { topics } from "@/content/topics";

export default function TopicsPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <Link href="/" className="text-sm font-semibold text-[var(--accent)]">← Home</Link>
      <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Study library</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Study by topic</h1>
      <p className="mt-3 max-w-3xl leading-7 text-[var(--muted)]">
        Choose a lesson area to find its related questions. The library is organized by concepts, so you can focus on a topic without navigating through course divisions.
      </p>
      <div className="mt-5 flex flex-wrap gap-3 text-sm">
        <span className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5">{problems.length} questions in the library</span>
        <span className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5">{topics.length} lesson topics</span>
        <Link href="/problems" className="rounded-full bg-[var(--accent)] px-3 py-1.5 font-semibold text-white">Browse all questions →</Link>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => {
          const topicProblems = problems.filter((problem) => problem.primaryTopicId === topic.id);
          const verifiedCount = topicProblems.filter((problem) => problem.verificationStatus === "verified").length;
          return (
            <article key={topic.id} className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-white p-5 transition hover:border-[var(--accent)] hover:shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-semibold leading-6">{topic.title}</h2>
                <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold">{topicProblems.length}</span>
              </div>
              <p className="mt-2 flex-1 text-sm leading-6 text-[var(--muted)]">{topic.description}</p>
              <p className="mt-4 text-xs text-[var(--muted)]">{verifiedCount} of {topicProblems.length} questions marked verified</p>
              <Link href={`/problems?topic=${topic.id}`} className="mt-4 inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90">
                Review this topic <span aria-hidden="true" className="ml-2">→</span>
              </Link>
            </article>
          );
        })}
      </div>
      <p className="mt-8 rounded-xl border border-[var(--border)] bg-slate-50 p-4 text-sm leading-6 text-[var(--muted)]">
        Each question is assigned one primary lesson for focused review and testing. Related concepts remain available as secondary tags.
      </p>
    </main>
  );
}
