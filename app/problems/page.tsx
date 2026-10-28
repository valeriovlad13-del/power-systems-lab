import Link from "next/link";
import ProblemBrowser from "@/components/problems/problem-browser";
import { topics } from "@/content/topics";
import { problems } from "@/content/problems";

type SearchParams = Promise<{ topic?: string }>;

export default async function ProblemsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const initialTopic = params.topic && topics.some((topic) => topic.id === params.topic) ? params.topic : "all";
  const verifiedCount = problems.filter((problem) => problem.verificationStatus === "verified").length;

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <Link href="/topics" className="text-sm font-semibold text-[var(--accent)]">← Back to topics</Link>
      <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Study library</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Browse questions by lesson</h1>
      <p className="mt-3 max-w-3xl leading-7 text-[var(--muted)]">
        Search the full question bank or filter by a lesson topic and source section. Open any question to review its choices and worked solution.
      </p>
      <div className="mt-5 flex flex-wrap gap-3 text-sm">
        <span className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5">{problems.length} questions</span>
        <span className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5">{verifiedCount} marked verified</span>
      </div>
      <ProblemBrowser initialTopic={initialTopic} />
    </main>
  );
}
