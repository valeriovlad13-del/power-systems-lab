"use client";

import Link from "next/link";
import katex from "katex";
import { useState } from "react";
import type { SourceProblem } from "@/content/problems";

export default function PracticeSession({ questions, topicTitle }: { questions: SourceProblem[]; topicTitle: string }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const question = questions[index];

  if (!question) {
    return <section className="rounded-2xl border border-[var(--border)] bg-white p-6"><p>No questions are currently assigned to this lesson.</p><Link href="/topics" className="mt-4 inline-flex text-sm font-semibold text-[var(--accent)]">Back to lessons →</Link></section>;
  }

  const selectedChoiceId = answers[question.id] ?? "";
  const isChecked = checked[question.id] === true;
  const isCorrect = isChecked && selectedChoiceId === question.verifiedChoiceId;
  const isRevealed = revealed[question.id] === true;
  const answeredCount = Object.keys(checked).filter((id) => checked[id]).length;
  const correctCount = questions.filter((item) => checked[item.id] && answers[item.id] === item.verifiedChoiceId).length;

  function selectAnswer(choiceId: string) {
    setAnswers((current) => ({ ...current, [question.id]: choiceId }));
    setChecked((current) => ({ ...current, [question.id]: false }));
  }

  function checkAnswer() {
    if (!selectedChoiceId) return;
    setChecked((current) => ({ ...current, [question.id]: true }));
  }

  function toggleSolution() {
    setRevealed((current) => ({ ...current, [question.id]: !current[question.id] }));
  }

  function renderEquation(equation: string, stepNumber: number, equationIndex: number) {
    return <div key={equationIndex} className="mt-3 max-w-full overflow-x-auto rounded-lg bg-slate-50 px-3 py-3 sm:px-4 sm:py-4" role="region" aria-label={`Equation ${equationIndex + 1} for step ${stepNumber}`} tabIndex={0}><div className="w-max min-w-full" dangerouslySetInnerHTML={{ __html: katex.renderToString(equation, { displayMode: true, throwOnError: false, strict: "ignore" }) }} /></div>;
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-2xl border border-[var(--border)] bg-white p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Guided practice</p><h1 className="mt-1 text-xl font-bold sm:text-2xl">{topicTitle}</h1></div>
          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold">Question {index + 1} of {questions.length}</span>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[var(--accent)] transition-all" style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--muted)]"><span>{answeredCount} answered</span><span>·</span><span>{correctCount} correct so far</span></div>
        <p className="mt-6 whitespace-pre-wrap text-base leading-7 sm:text-lg sm:leading-8">{question.statement}</p>
        <fieldset className="mt-5 space-y-2.5">
          <legend className="sr-only">Choose an answer for question {index + 1}</legend>
          {question.choices.map((choice) => {
            const selected = selectedChoiceId === choice.id;
            const correct = isChecked && choice.id === question.verifiedChoiceId;
            const wrong = isChecked && selected && !correct;
            const style = correct ? "border-emerald-400 bg-emerald-50" : wrong ? "border-red-400 bg-red-50" : selected ? "border-[var(--accent)] bg-cyan-50 ring-1 ring-[var(--accent)]" : "border-[var(--border)] bg-white";
            return <label key={choice.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm transition-colors sm:p-4 ${style}`}>
              <input type="radio" name={`practice-${question.id}`} value={choice.id} checked={selected} onChange={() => selectAnswer(choice.id)} className="mt-1 h-4 w-4 shrink-0 accent-teal-700" />
              <span className="w-5 shrink-0 font-semibold">{choice.label}.</span><span className="min-w-0 flex-1 leading-6">{choice.text}</span>
              {correct && <span className="shrink-0 text-xs font-semibold text-emerald-800">Correct</span>}
              {wrong && <span className="shrink-0 text-xs font-semibold text-red-800">Incorrect</span>}
            </label>;
          })}
        </fieldset>
        {isChecked && <div role="status" aria-live="polite" className={`mt-4 rounded-xl border p-3 text-sm leading-6 ${isCorrect ? "border-emerald-300 bg-emerald-50 text-emerald-950" : "border-red-300 bg-red-50 text-red-950"}`}>{isCorrect ? <p><strong>Correct.</strong> Nice work. You can continue or open the worked solution to review the method.</p> : <p><strong>Not quite.</strong> The correct answer is {question.choices.find((choice) => choice.id === question.verifiedChoiceId)?.label}. Review the solution before continuing.</p>}</div>}
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={checkAnswer} disabled={!selectedChoiceId} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-45">Check answer</button>
          <button type="button" onClick={toggleSolution} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold">{isRevealed ? "Hide worked solution" : "Show worked solution"}</button>
        </div>
        {isRevealed && <section className="mt-5 rounded-xl border border-[var(--border)] bg-slate-50 p-4 sm:p-5">
          <h2 className="text-lg font-bold">Worked solution</h2>
          {question.given && question.given.length > 0 && <div className="mt-4"><h3 className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">Given</h3><dl className="mt-2 divide-y divide-[var(--border)] rounded-lg border border-[var(--border)] bg-white">{question.given.map((item) => <div key={item.label} className="flex flex-wrap justify-between gap-2 px-3 py-2.5 text-sm"><dt className="text-[var(--muted)]">{item.label}</dt><dd className="font-mono font-semibold">{item.value}{item.unit ? ` ${item.unit}` : ""}</dd></div>)}</dl></div>}
          {question.find && <div className="mt-4"><h3 className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">Find</h3><p className="mt-1 text-sm leading-6">{question.find}</p></div>}
          <ol className="mt-4 space-y-4">{question.solution.map((step) => <li key={step.stepNumber} className="rounded-lg border border-[var(--border)] bg-white p-3 sm:p-4"><h3 className="font-semibold">{step.stepNumber}. {step.title}</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{step.explanation}</p>{step.equations?.map((equation, equationIndex) => renderEquation(equation, step.stepNumber, equationIndex))}</li>)}</ol>
          {question.finalAnswer && <div className="mt-4 rounded-lg border border-emerald-300 bg-emerald-50 p-4"><p className="text-xs font-bold uppercase tracking-wide text-emerald-900">Final answer</p><p className="mt-1 text-lg font-bold text-emerald-950">{question.finalAnswer.value} {question.finalAnswer.unit}</p></div>}
          {question.assumptions.length > 0 && <div className="mt-4"><h3 className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">Assumptions and notes</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-[var(--muted)]">{question.assumptions.map((assumption) => <li key={assumption}>{assumption}</li>)}</ul></div>}
        </section>}
        <nav aria-label="Practice question navigation" className="mt-6 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-5">
          <button type="button" onClick={() => setIndex((current) => Math.max(0, current - 1))} disabled={index === 0} className="rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm font-semibold disabled:opacity-40">← Previous</button>
          <button type="button" onClick={() => setIndex((current) => Math.min(questions.length - 1, current + 1))} disabled={index === questions.length - 1} className="rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-40">Next →</button>
        </nav>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <Link href="/topics" className="text-sm font-semibold text-[var(--accent)]">← Back to lessons</Link>
        <button type="button" onClick={() => setShowAllQuestions((value) => !value)} className="text-sm font-semibold text-[var(--accent)]">{showAllQuestions ? "Hide question list" : "Jump to a question"}</button>
      </div>
      {showAllQuestions && <div className="mt-3 grid gap-2 sm:grid-cols-2">{questions.map((item, questionIndex) => <button key={item.id} type="button" onClick={() => { setIndex(questionIndex); setShowAllQuestions(false); }} className={`rounded-lg border px-3 py-3 text-left text-sm ${questionIndex === index ? "border-[var(--accent)] bg-cyan-50" : "border-[var(--border)] bg-white"}`}><span className="font-semibold">Question {questionIndex + 1}</span><span className="mt-1 block line-clamp-2 text-[var(--muted)]">{item.statement}</span>{checked[item.id] && <span className="mt-1 block text-xs font-semibold">{answers[item.id] === item.verifiedChoiceId ? "Correct" : "Answered"}</span>}</button>)}</div>}
      {index === questions.length - 1 && answeredCount === questions.length && <section className="mt-5 rounded-2xl border border-emerald-300 bg-emerald-50 p-5"><h2 className="text-lg font-bold text-emerald-950">Lesson practice complete</h2><p className="mt-2 text-sm leading-6 text-emerald-900">You checked all {questions.length} questions and got {correctCount} correct on the first recorded check. You can revisit any question or return to the lesson directory.</p><Link href="/topics" className="mt-4 inline-flex rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white">Choose another lesson</Link></section>}
    </div>
  );
}
