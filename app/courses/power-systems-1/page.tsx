import Link from "next/link";

export default function PowerSystemsOnePage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
      <Link href="/" className="text-sm font-semibold text-[var(--accent)]">
        ← Home
      </Link>
      <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
        Course 1
      </p>
      <h1 className="mt-2 text-3xl font-bold">Power Systems 1</h1>
      <p className="mt-3 leading-7 text-[var(--muted)]">
        The source contains 80 questions split between Main Tutorial Problems
        (1–20) and Out of the Box Questions (1–60). Topic assignment is pending
        question-by-question audit.
      </p>
      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
        <strong>Content audit pending.</strong> No answer or worked solution is
        presented as verified at this stage.
      </div>
    </main>
  );
}
