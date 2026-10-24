"use client";

import { useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/icon";

type Props = {
  children: ReactNode;
  isVerified: boolean;
};

export default function SolutionDisclosure({ children, isVerified }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="mt-5 sm:mt-6">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-left font-semibold shadow-sm transition hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:px-5"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[var(--accent)]">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 5.5v16M8 7h8M8 11h8" strokeLinecap="round" />
            </svg>
          </span>
          <span>
            <span className="block">{isOpen ? "Hide solution" : "Show solution"}</span>
            <span className="mt-0.5 block text-xs font-normal text-[var(--muted)]">
              {isVerified ? "Step-by-step calculations and final answer" : "Solution pending technical review"}
            </span>
          </span>
        </span>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {isOpen && <div className="mt-3">{children}</div>}
    </section>
  );
}
