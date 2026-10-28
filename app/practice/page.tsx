import Link from "next/link";
import { problems } from "@/content/problems";
import { topics } from "@/content/topics";
import PracticeSession from "@/components/practice/practice-session";

type SearchParams = Promise<{ topic?: string }>;

export default async function PracticePage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const selectedTopic = topics.find((topic) => topic.id === params.topic);

  if (!selectedTopic) {
    return (
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <Link href="/topics" className="text-sm font-semibold text-[var(--accent)]">← Back to lessons</Link>
        <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Practice mode</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Choose a lesson to practice</h1>
        <p className="mt-3 max-w-3xl leading-7 text-[var(--muted)]">Work through one question at a time, check answers immediately, and open worked solutions whenever you need help. Your progress is kept for this session while the page remains open.</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => {
            const count = problems.filter((problem) => problem.primaryTopicId === topic.id).length;
            return <article key={topic.id} className="flex flex-col rounded-2xl border border-[var(--border)] bg-white p-5">
              <div className="flex items-start justify-between gap-3"><h2 className="font-semibold leading-6">{topic.title}</h2><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold">{count}</span></div>
              <p className="mt-2 flex-1 text-sm leading-6 text-[var(--muted)]">{topic.description}</p>
              <Link href={`/practice?topic=${topic.id}`} className="mt-4 inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white">Start practice →</Link>
            </article>;
          })}
        </div>
      </main>
    );
  }

  const questions = problems
    .filter((problem) => problem.primaryTopicId === selectedTopic.id)
    .sort((a, b) => a.source.originalSection.localeCompare(b.source.originalSection) || a.source.originalQuestionNumber - b.source.originalQuestionNumber);

  return (
    <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
      <Link href="/topics" className="text-sm font-semibold text-[var(--accent)]">← Back to lessons</Link>
      <div className="mt-6 mb-6 max-w-3xl"><p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Practice mode</p><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{selectedTopic.title}</h1><p className="mt-3 leading-7 text-[var(--muted)]">{selectedTopic.description} This guided session contains {questions.length} questions assigned to this lesson.</p></div>
      <PracticeSession questions={questions} topicTitle={selectedTopic.title} />
    </main>
  );
}
