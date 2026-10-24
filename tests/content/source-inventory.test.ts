import { describe, expect, it } from "vitest";
import { problems } from "@/content/problems";
import { topics } from "@/content/topics";

describe("source problem inventory", () => {
  it("contains all 140 source questions", () => {
    expect(problems).toHaveLength(140);
  });

  it("preserves unique source IDs and four choices per question", () => {
    expect(new Set(problems.map((problem) => problem.id)).size).toBe(140);
    for (const problem of problems) {
      expect(problem.statement.length).toBeGreaterThan(0);
      expect(problem.choices).toHaveLength(4);
      expect(problem.choices.map((choice) => choice.label)).toEqual(["A", "B", "C", "D"]);
      expect(problem.source.originalQuestionNumber).toBeGreaterThan(0);
    }
  });

  it("does not confuse source-marked choices with verified solutions", () => {
    const pending = problems.filter((problem) => problem.verificationStatus === "pending");
    const verified = problems.filter((problem) => problem.verificationStatus === "verified");
    expect(pending).toHaveLength(94);
    expect(verified).toHaveLength(46);
    expect(verified.map((problem) => problem.id).sort()).toEqual(["ps1-main-01","ps1-main-02","ps1-main-04","ps1-main-05","ps1-main-06","ps1-main-08","ps1-main-09","ps1-main-10","ps1-main-11","ps1-main-13","ps1-main-17","ps1-main-18","ps1-main-19","ps1-otb-02","ps1-otb-03","ps1-otb-04","ps1-otb-05","ps1-otb-06","ps1-otb-07","ps1-otb-08","ps1-otb-12","ps1-otb-15","ps1-otb-56","ps1-otb-57","ps1-otb-58","ps1-otb-59","ps2-main-01","ps2-main-02","ps2-main-06","ps2-otb-01","ps2-otb-03","ps2-otb-04","ps2-otb-06","ps2-otb-08","ps2-otb-09","ps2-otb-10","ps2-otb-11","ps2-otb-12","ps2-otb-13","ps2-otb-14","ps2-otb-15","ps2-otb-16","ps2-otb-17","ps2-otb-18","ps2-otb-28","ps2-otb-29"]);
    expect(verified.every((problem) => problem.verifiedChoiceId && problem.solution.length > 0 && problem.finalAnswer)).toBe(true);
    for (const problem of verified) {
      for (const step of problem.solution) {
        for (const equation of step.equations ?? []) {
          expect(equation, `${problem.id} contains malformed doubled LaTeX slashes`).not.toMatch(/\\\\(?:frac|text|times|eta|ell|left|right|ln|approx|Omega|mu|cdot)/);
        }
      }
    }
    expect(pending.every((problem) => problem.solution.length === 0)).toBe(true);
  });

  it("assigns existing topics from the same course to every question", () => {
    const topicById = new Map(topics.map((topic) => [topic.id, topic]));
    for (const problem of problems) {
      expect(problem.topicIds.length, problem.id).toBeGreaterThan(0);
      for (const topicId of problem.topicIds) {
        const topic = topicById.get(topicId);
        expect(topic, `${problem.id} references unknown topic ${topicId}`).toBeDefined();
        expect(topic?.courseId, `${problem.id} has a topic from another course`).toBe(problem.courseId);
      }
    }
  });

  it("preserves the expected source-section counts", () => {
    const count = (courseId: string, section: string) =>
      problems.filter((problem) => problem.courseId === courseId && problem.source.originalSection === section).length;
    expect(count("power-systems-1", "Main Tutorial Problems")).toBe(20);
    expect(count("power-systems-1", "Out of the Box Questions")).toBe(60);
    expect(count("power-systems-2", "Main Tutorial Problems")).toBe(10);
    expect(count("power-systems-2", "Out of the Box Questions")).toBe(50);
  });
});
