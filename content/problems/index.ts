import sourceInventory from "@/content/problems/source-inventory.json";

export type SourceSection = "Main Tutorial Problems" | "Out of the Box Questions";
export type VerificationStatus = "pending" | "in-review" | "verified" | "needs-correction";

export interface ProblemChoice {
  id: string;
  label: string;
  text: string;
}

export interface SolutionStep {
  stepNumber: number;
  title: string;
  explanation: string;
  equations?: string[];
}

export interface SourceProblem {
  id: string;
  courseId: "power-systems-1" | "power-systems-2";
  topicIds: string[];
  source: {
    document: string;
    originalSection: SourceSection;
    originalQuestionNumber: number;
    pdfPage?: number;
  };
  statement: string;
  choices: ProblemChoice[];
  sourceMarkedChoiceId: string | null;
  verificationStatus: VerificationStatus;
  given?: { label: string; value: string; unit?: string }[];
  find?: string;
  assumptions: string[];
  solution: SolutionStep[];
  finalAnswer?: { value: string; unit?: string };
  calculatorIds: string[];
  reviewerNotes: string[];
}

export const problems = sourceInventory as SourceProblem[];

export function getProblemById(id: string): SourceProblem | undefined {
  return problems.find((problem) => problem.id === id);
}
