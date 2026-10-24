import Link from "next/link";
import { notFound } from "next/navigation";
import katex from "katex";
import { getProblemById, problems } from "@/content/problems";
import AnswerChoices from "@/components/problems/answer-choices";
import SolutionDisclosure from "@/components/problems/solution-disclosure";

export function generateStaticParams() {
  return problems.map((problem) => ({ id: problem.id }));
}

export default async function ProblemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const problem = getProblemById(id);
  if (!problem) notFound();

  const courseLabel = problem.courseId === "power-systems-1" ? "Power Systems 1" : "Power Systems 2";
  const isVerified = problem.verificationStatus === "verified";
  const sameSectionProblems = problems
    .filter((item) => item.courseId === problem.courseId && item.source.originalSection === problem.source.originalSection)
    .sort((a, b) => a.source.originalQuestionNumber - b.source.originalQuestionNumber);
  const currentIndex = sameSectionProblems.findIndex((item) => item.id === problem.id);
  const previousProblem = currentIndex > 0 ? sameSectionProblems[currentIndex - 1] : null;
  const nextProblem = currentIndex >= 0 && currentIndex < sameSectionProblems.length - 1 ? sameSectionProblems[currentIndex + 1] : null;

  return (
    <main className="mx-auto w-full max-w-4xl px-3 py-6 sm:px-8 sm:py-10">
      <Link href="/problems" className="text-sm font-semibold text-[var(--accent)]">← Back to question bank</Link>
      <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs sm:mt-8">
        <span className="font-semibold text-[var(--accent)]">{courseLabel}</span><span className="text-[var(--muted)]">·</span>
        <span className="min-w-0 break-words text-[var(--muted)]">{problem.source.originalSection}</span>
        <span className={`rounded-full px-3 py-1 font-semibold sm:ml-auto ${isVerified ? "bg-emerald-100 text-emerald-900" : "border border-amber-200 bg-amber-50 text-amber-900"}`}>{isVerified ? "Verified solution" : "Pending review"}</span>
      </div>
      <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">Problem {problem.source.originalQuestionNumber}</h1>
      <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 sm:mt-4 sm:text-base sm:leading-8">{problem.statement}</p>
      <p className="mt-4 text-xs text-[var(--muted)]">Question ID: {problem.id}</p>

      <section className="mt-6 rounded-2xl border border-[var(--border)] bg-white p-4 sm:mt-8 sm:p-7">
        <h2 className="text-lg font-bold">Answer choices</h2>
        <p className="mt-1 text-sm leading-6 text-[var(--muted)]">Select one answer, then choose Check answer to see the result.</p>
        <AnswerChoices
          problemId={problem.id}
          choices={problem.choices}
          isVerified={isVerified}
          verifiedChoiceId={problem.verifiedChoiceId ?? null}
        />
        {markedChoice && <p className="mt-4 text-xs leading-5 text-[var(--muted)]">The original PDF contains an answer marking; it is not treated as verified unless the solution has been independently checked.</p>}
      </section>

      <SolutionDisclosure isVerified={isVerified}>
      {isVerified ? (
        <section className="mt-5 rounded-2xl border border-[var(--border)] bg-white p-4 sm:mt-6 sm:p-7">
          <h2 className="text-lg font-bold">Step-by-step solution</h2>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">Use the steps below to understand how the verified result is obtained.</p>
          {problem.given && <div className="mt-5"><h3 className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">1. Given</h3><dl className="mt-3 divide-y divide-[var(--border)] rounded-xl border border-[var(--border)]">{problem.given.map((item) => <div key={item.label} className="flex flex-wrap justify-between gap-2 px-4 py-3 text-sm"><dt className="text-[var(--muted)]">{item.label}</dt><dd className="font-mono font-semibold">{item.value}{item.unit ? ` ${item.unit}` : ""}</dd></div>)}</dl></div>}
          {problem.find && <div className="mt-5"><h3 className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">2. Find</h3><p className="mt-2 leading-7">{problem.find}</p></div>}
          <div className="mt-6"><h3 className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">3. Solution and calculations</h3>
            <ol className="mt-4 space-y-5">{problem.solution.map((step) => <li key={step.stepNumber} className="min-w-0 rounded-xl border border-[var(--border)] p-3 sm:p-5">
              <div className="flex min-w-0 items-start gap-2.5 sm:gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold sm:h-8 sm:w-8 sm:text-sm">{step.stepNumber}</span><div className="min-w-0 flex-1"><h4 className="font-semibold">{step.title}</h4><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{step.explanation}</p>
                {step.equations?.map((equation, index) => <div key={index} className="mt-3 max-w-full overflow-x-auto overscroll-x-contain rounded-lg bg-slate-50 px-2 py-3 text-left sm:px-4 sm:py-4" role="region" aria-label={`Equation ${index + 1} for step ${step.stepNumber}`} tabIndex={0}><div className="w-max min-w-full"><div dangerouslySetInnerHTML={{ __html: katex.renderToString(equation, { displayMode: true, throwOnError: false, strict: "ignore" }) }} /></div></div>)}
              </div></div>
            </li>)}</ol>
          </div>
          {problem.finalAnswer && <div className="mt-6 rounded-xl border border-emerald-300 bg-emerald-50 p-5"><p className="text-xs font-bold uppercase tracking-wide text-emerald-900">Final answer</p><p className="mt-2 text-xl font-bold text-emerald-950">{problem.finalAnswer.value} {problem.finalAnswer.unit}</p></div>}
          {problem.assumptions.length > 0 && <div className="mt-6"><h3 className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">Assumptions and notes</h3><ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--muted)]">{problem.assumptions.map((assumption) => <li key={assumption}>{assumption}</li>)}</ul></div>}
        </section>
      ) : (
        <section className="mt-6 rounded-2xl border border-[var(--border)] bg-white p-5 sm:p-7">
          <h2 className="text-lg font-bold">Step-by-step solution</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">This solution has not yet been independently worked and checked. To avoid presenting a guessed answer as an engineering reference, it will be published after formulas, substitutions, units, assumptions, and the final result are reviewed.</p>
          <ol className="mt-5 space-y-3">{["Given", "Find", "Required formulas", "Numbered calculations and substitutions", "Final answer and unit check", "Engineering note / common mistake"].map((step, index) => <li key={step} className="flex gap-3 rounded-lg border border-dashed border-[var(--border)] p-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold">{index + 1}</span><div><p className="text-sm font-semibold">{step}</p><p className="mt-1 text-xs text-[var(--muted)]">To be completed during technical review</p></div></li>)}</ol>
        </section>
      )}
      </SolutionDisclosure>
      <nav aria-label="Question navigation" className="mt-6 grid grid-cols-2 gap-3">
        {previousProblem ? (
          <Link href={`/problems/${previousProblem.id}`} className="flex min-h-14 min-w-0 items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-3 py-3 text-sm transition hover:border-[var(--accent)] sm:px-4">
            <span aria-hidden="true" className="text-lg">←</span><span className="min-w-0"><span className="block text-xs text-[var(--muted)]">Previous question</span><span className="block truncate font-semibold">Problem {previousProblem.source.originalQuestionNumber}</span></span>
          </Link>
        ) : <div aria-hidden="true" />}
        {nextProblem ? (
          <Link href={`/problems/${nextProblem.id}`} className="flex min-h-14 min-w-0 items-center justify-end gap-2 rounded-xl border border-[var(--border)] bg-white px-3 py-3 text-right text-sm transition hover:border-[var(--accent)] sm:px-4">
            <span className="min-w-0"><span className="block text-xs text-[var(--muted)]">Next question</span><span className="block truncate font-semibold">Problem {nextProblem.source.originalQuestionNumber}</span></span><span aria-hidden="true" className="text-lg">→</span>
          </Link>
        ) : <div aria-hidden="true" />}
      </nav>
    </main>
  );
}
