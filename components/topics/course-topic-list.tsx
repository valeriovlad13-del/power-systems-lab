import Link from "next/link";
import { problems } from "@/content/problems";
import { topics } from "@/content/topics";

export default function CourseTopicList({ courseId }: { courseId: "power-systems-1" | "power-systems-2" }) {
  const courseTopics = topics.filter((topic) => topic.courseId === courseId);
  const courseProblems = problems.filter((problem) => problem.courseId === courseId);
  const title = courseId === "power-systems-1" ? "Power Systems 1" : "Power Systems 2";

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <Link href="/" className="text-sm font-semibold text-[var(--accent)]">← Home</Link>
      <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Course overview</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-3xl leading-7 text-[var(--muted)]">
        Choose a topic to focus your study. Each topic opens the related questions, so you can work through one lesson area at a time.
      </p>
      <div className="mt-5 flex flex-wrap gap-3 text-sm">
        <span className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5">{courseProblems.length} questions</span>
        <span className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5">{courseTopics.length} topics</span>
        <Link href={`/problems?course=${courseId}`} className="rounded-full bg-[var(--accent)] px-3 py-1.5 font-semibold text-white">Browse all questions →</Link>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courseTopics.map((topic) => {
          const topicProblems = problems.filter((problem) => problem.courseId === courseId && problem.topicIds.includes(topic.id));
          const verifiedCount = topicProblems.filter((problem) => problem.verificationStatus === "verified").length;
          return (
            <article key={topic.id} className="flex flex-col rounded-2xl border border-[var(--border)] bg-white p-5 transition hover:border-[var(--accent)] hover:shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-semibold leading-6">{topic.title}</h2>
                <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold">{topicProblems.length}</span>
              </div>
              <p className="mt-2 flex-1 text-sm leading-6 text-[var(--muted)]">{topic.description}</p>
              <p className="mt-4 text-xs text-[var(--muted)]">{verifiedCount} of {topicProblems.length} questions marked verified</p>
              <Link href={`/problems?course=${courseId}&topic=${topic.id}`} className="mt-4 inline-flex items-center justify-center rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)]">
                Review this topic →
              </Link>
            </article>
          );
        })}
      </div>
      <p className="mt-8 rounded-xl border border-[var(--border)] bg-slate-50 p-4 text-sm leading-6 text-[var(--muted)]">
        Topic counts can overlap because some questions support more than one topic. The question bank still contains {courseProblems.length} unique questions for this course.
      </p>
    </main>
  );
}
