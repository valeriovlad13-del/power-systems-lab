import type { Problem } from "@/lib/problems/types";

/**
 * Source problems are intentionally not populated until they are transcribed
 * and checked against the uploaded source document.
 *
 * Add a problem only when its original statement and options can be preserved.
 * Keep verificationStatus="pending" until the complete worked solution has
 * been independently checked.
 */
export const problems: Problem[] = [];

export function getProblemById(problemId: string): Problem | undefined {
  return problems.find((problem) => problem.id === problemId);
}
