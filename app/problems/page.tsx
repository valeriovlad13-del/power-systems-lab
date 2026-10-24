import Link from "next/link";
import ProblemBrowser from "@/components/problems/problem-browser";

export default function ProblemsPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <Link href="/" className="text-sm font-semibold text-[var(--accent)]">← Home</Link>
      <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Question bank</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Browse solved-problem library</h1>
      <p className="mt-3 max-w-3xl leading-7 text-[var(--muted)]">All 140 questions from the source PDF are indexed below. Search by keyword, filter by course, topic, and original section, then open a question to review its source choices and solution status.</p>
      <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950"><strong>Content integrity:</strong> asterisk-marked answers are transcribed as source markings only. They are not presented as verified answers, and worked solutions remain pending review.</div>
      <ProblemBrowser />
    </main>
  );
}
