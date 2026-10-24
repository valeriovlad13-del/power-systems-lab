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
    expect(pending).toHaveLength(136);
    expect(verified).toHaveLength(4);
    expect(verified.map((problem) => problem.id).sort()).toEqual(["ps1-main-01", "ps1-main-02", "ps1-main-04", "ps1-main-05"]);
    expect(verified.every((problem) => problem.verifiedChoiceId && problem.solution.length > 0 && problem.finalAnswer)).toBe(true);
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
