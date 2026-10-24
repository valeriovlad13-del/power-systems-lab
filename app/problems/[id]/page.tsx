import Link from "next/link";
import { notFound } from "next/navigation";
import { getProblemById, problems } from "@/content/problems";

export function generateStaticParams() {
  return problems.map((problem) => ({ id: problem.id }));
}

export default async function ProblemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const problem = getProblemById(id);
  if (!problem) notFound();

  const courseLabel = problem.courseId === "power-systems-1" ? "Power Systems 1" : "Power Systems 2";
  const markedChoice = problem.choices.find((choice) => choice.id === problem.sourceMarkedChoiceId);

  return (
    <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
      <Link href="/problems" className="text-sm font-semibold text-[var(--accent)]">← Back to question bank</Link>
      <div className="mt-8 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-[var(--accent)]">{courseLabel}</span>
        <span className="text-[var(--muted)]">·</span>
        <span className="text-[var(--muted)]">{problem.source.originalSection}</span>
        <span className="ml-auto rounded-full border border-amber-200 bg-amber-50 px-3 py-1 font-semibold text-amber-900">Pending review</span>
      </div>

      <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
        Problem {problem.source.originalQuestionNumber}
      </h1>
      <p className="mt-4 whitespace-pre-wrap text-base leading-8">{problem.statement}</p>
      <p className="mt-4 text-xs text-[var(--muted)]">Source ID: {problem.id}</p>

      <section className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-5 sm:p-7">
        <h2 className="text-lg font-bold">Answer choices</h2>
        <div className="mt-4 space-y-3">
          {problem.choices.map((choice) => {
            const isSourceMarked = choice.id === problem.sourceMarkedChoiceId;
            return (
              <div key={choice.id} className={`flex gap-3 rounded-xl border p-4 ${isSourceMarked ? "border-amber-300 bg-amber-50" : "border-[var(--border)]"}`}>
                <span className="font-semibold">{choice.label}.</span>
                <span className="flex-1 leading-6">{choice.text}</span>
                {isSourceMarked && <span className="shrink-0 text-right text-xs font-semibold text-amber-900">Marked in source</span>}
              </div>
            );
          })}
        </div>
        {markedChoice && <p className="mt-4 text-sm leading-6 text-[var(--muted)]">The source PDF marks option {markedChoice.label} with an asterisk. This is recorded as source information only and has not yet been independently verified.</p>}
      </section>

      <section className="mt-6 rounded-2xl border border-[var(--border)] bg-white p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold">Step-by-step solution</h2>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">Not yet verified</span>
        </div>
        <p className="mt-3 leading-7 text-[var(--muted)]">The solution for this question has not yet been independently worked and checked. To avoid presenting a guessed answer as an engineering reference, the solution will be published after its formulas, substitutions, units, assumptions, and final result are reviewed.</p>
        <ol className="mt-5 space-y-3">
          {["Given", "Find", "Required formulas", "Numbered calculations and substitutions", "Final answer and unit check", "Engineering note / common mistake"].map((step, index) => (
            <li key={step} className="flex gap-3 rounded-lg border border-dashed border-[var(--border)] p-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold">{index + 1}</span>
              <div><p className="text-sm font-semibold">{step}</p><p className="mt-1 text-xs text-[var(--muted)]">To be completed during technical review</p></div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
