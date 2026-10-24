export type CourseId = "power-systems-1" | "power-systems-2";
export type VerificationStatus = "pending" | "in-review" | "verified" | "needs-correction";
export type Difficulty = "basic" | "intermediate" | "advanced";

export interface SourceReference {
  document: string;
  originalSection: "Main Tutorial Problems" | "Out of the Box Questions";
  originalQuestionNumber: number;
  pdfPage?: number;
}

export interface GivenValue {
  label: string;
  value: string;
  unit?: string;
}

export interface AnswerChoice {
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

export interface Problem {
  id: string;
  courseId: CourseId;
  topicIds: string[];
  source: SourceReference;
  title: string;
  statement: string;
  given: GivenValue[];
  find: string;
  choices?: AnswerChoice[];
  correctChoiceId?: string;
  assumptions: string[];
  solution: SolutionStep[];
  finalAnswer?: { value: string; unit?: string };
  calculatorIds: string[];
  difficulty?: Difficulty;
  verificationStatus: VerificationStatus;
  reviewerNotes?: string[];
}
