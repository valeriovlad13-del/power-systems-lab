import { describe, expect, it } from "vitest";
import { problems } from "@/content/problems";
import { topics } from "@/content/topics";

describe("problem inventory and solution verification", () => {
  it("contains all 140 questions", () => {
    expect(problems).toHaveLength(140);
  });

  it("preserves unique IDs and four answer choices per question", () => {
    expect(new Set(problems.map((problem) => problem.id)).size).toBe(140);
    for (const problem of problems) {
      expect(problem.statement.length).toBeGreaterThan(0);
      expect(problem.choices).toHaveLength(4);
      expect(problem.choices.map((choice) => choice.label)).toEqual(["A", "B", "C", "D"]);
      expect(problem.source.originalQuestionNumber).toBeGreaterThan(0);
    }
  });

  it("keeps verified answers distinct from source-marked choices and gives every question a worked solution", () => {
    const pending = problems.filter((problem) => problem.verificationStatus === "pending");
    const verified = problems.filter((problem) => problem.verificationStatus === "verified");
    expect(pending).toHaveLength(0);
    expect(verified).toHaveLength(140);
    expect(verified.every((problem) => problem.verifiedChoiceId && problem.solution.length > 0 && problem.finalAnswer)).toBe(true);
    for (const problem of verified) {
      expect(problem.choices.some((choice) => choice.id === problem.verifiedChoiceId), problem.id).toBe(true);
      for (const step of problem.solution) {
        expect(step.title.length, problem.id).toBeGreaterThan(0);
        expect(step.explanation.length, problem.id).toBeGreaterThan(0);
        for (const equation of step.equations ?? []) {
          expect(equation, `${problem.id} contains malformed doubled LaTeX slashes`).not.toMatch(/\\\\(?:frac|text|times|eta|ell|left|right|ln|approx|Omega|mu|cdot)/);
        }
      }
    }
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

  it("assigns exactly one valid primary lesson to every question", () => {
    const topicById = new Map(topics.map((topic) => [topic.id, topic]));
    expect(problems.every((problem) => Boolean(problem.primaryTopicId))).toBe(true);
    expect(new Set(problems.map((problem) => problem.id)).size).toBe(problems.length);
    for (const problem of problems) {
      expect(problem.topicIds[0], `${problem.id} should list its primary lesson first`).toBe(problem.primaryTopicId);
      const primaryTopic = topicById.get(problem.primaryTopicId);
      expect(primaryTopic, `${problem.id} references unknown primary lesson ${problem.primaryTopicId}`).toBeDefined();
      expect(primaryTopic?.courseId, `${problem.id} has a primary lesson from another course`).toBe(problem.courseId);
    }
    const primaryCounts = topics.map((topic) => problems.filter((problem) => problem.primaryTopicId === topic.id).length);
    expect(primaryCounts.reduce((sum, count) => sum + count, 0)).toBe(problems.length);
    expect(primaryCounts.every((count) => count > 0)).toBe(true);
  });

  it("preserves the expected section counts", () => {
    const count = (courseId: string, section: string) =>
      problems.filter((problem) => problem.courseId === courseId && problem.source.originalSection === section).length;
    expect(count("power-systems-1", "Main Tutorial Problems")).toBe(20);
    expect(count("power-systems-1", "Out of the Box Questions")).toBe(60);
    expect(count("power-systems-2", "Main Tutorial Problems")).toBe(10);
    expect(count("power-systems-2", "Out of the Box Questions")).toBe(50);
  });
});
