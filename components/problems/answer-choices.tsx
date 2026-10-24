"use client";

import { useState } from "react";
import type { ProblemChoice } from "@/content/problems";

type Props = {
  problemId: string;
  choices: ProblemChoice[];
  isVerified: boolean;
  verifiedChoiceId: string | null;
  sourceMarkedChoiceId: string | null;
};

export default function AnswerChoices({
  problemId,
  choices,
  isVerified,
  verifiedChoiceId,
  sourceMarkedChoiceId,
}: Props) {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [showUnverifiedNotice, setShowUnverifiedNotice] = useState(false);

  function checkAnswer() {
    if (!selectedChoiceId) return;
    setChecked(true);
    setShowUnverifiedNotice(!isVerified || !verifiedChoiceId);
  }

  function selectChoice(choiceId: string) {
    setSelectedChoiceId(choiceId);
    setChecked(false);
    setShowUnverifiedNotice(false);
  }

  const isCorrect = checked && isVerified && selectedChoiceId === verifiedChoiceId;
  const isIncorrect = checked && isVerified && selectedChoiceId !== verifiedChoiceId;

  return (
    <div className="mt-4">
      <fieldset>
        <legend className="sr-only">Choose an answer for problem {problemId}</legend>
        <div className="space-y-2.5">
          {choices.map((choice) => {
            const isSelected = selectedChoiceId === choice.id;
            const isVerifiedAnswer = isVerified && choice.id === verifiedChoiceId;
            const isSelectedCorrect = checked && isSelected && isVerifiedAnswer;
            const isSelectedIncorrect = checked && isSelected && isVerified && !isVerifiedAnswer;
            const showCorrectAnswer = checked && isVerified && isVerifiedAnswer;
            const showSourceMark = !isVerified && choice.id === sourceMarkedChoiceId;

            let style = "border-[var(--border)] bg-white";
            if (isSelected && !checked) style = "border-[var(--accent)] bg-cyan-50 ring-1 ring-[var(--accent)]";
            if (isSelectedCorrect || showCorrectAnswer) style = "border-emerald-400 bg-emerald-50";
            if (isSelectedIncorrect) style = "border-red-400 bg-red-50";

            return (
              <label
                key={choice.id}
                className={`flex min-w-0 cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm transition-colors sm:p-4 ${style}`}
              >
                <input
                  type="radio"
                  name={`answer-${problemId}`}
                  value={choice.id}
                  checked={isSelected}
                  onChange={() => selectChoice(choice.id)}
                  className="mt-1 h-4 w-4 shrink-0 accent-teal-700"
                />
                <span className="w-5 shrink-0 font-semibold">{choice.label}.</span>
                <span className="min-w-0 flex-1 break-words leading-6">{choice.text}</span>
                {isSelectedCorrect && <span className="shrink-0 text-xs font-semibold text-emerald-800">Correct</span>}
                {isSelectedIncorrect && <span className="shrink-0 text-xs font-semibold text-red-800">Incorrect</span>}
                {showCorrectAnswer && !isSelected && <span className="shrink-0 text-xs font-semibold text-emerald-800">Correct answer</span>}
                {showSourceMark && <span className="shrink-0 text-xs text-amber-800">Source marked</span>}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={checkAnswer}
          disabled={!selectedChoiceId}
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-45"
        >
          Check answer
        </button>
        {selectedChoiceId && (
          <button
            type="button"
            onClick={() => { setSelectedChoiceId(null); setChecked(false); setShowUnverifiedNotice(false); }}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold"
          >
            Try again
          </button>
        )}
      </div>

      {checked && isVerified && (
        <div
          role="status"
          aria-live="polite"
          className={`mt-4 rounded-xl border p-3 text-sm leading-6 ${isCorrect ? "border-emerald-300 bg-emerald-50 text-emerald-950" : isIncorrect ? "border-red-300 bg-red-50 text-red-950" : "border-[var(--border)] bg-slate-50 text-[var(--foreground)]"}`}
        >
          {isCorrect ? (
            <p><strong>Correct!</strong> Your choice matches the independently verified answer. You can reveal the worked solution below to understand the calculation.</p>
          ) : (
            <p><strong>Not quite.</strong> The correct answer is {choices.find((choice) => choice.id === verifiedChoiceId)?.label}. Try again or reveal the worked solution below.</p>
          )}
        </div>
      )}

      {showUnverifiedNotice && (
        <div role="status" aria-live="polite" className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm leading-6 text-amber-950">
          <strong>Answer not yet verified.</strong> This problem is still under review, so the lab cannot reliably mark your choice as correct or incorrect. The answer marked in the source document is not treated as a confirmed answer.
        </div>
      )}
    </div>
  );
}
