"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { problems } from "@/content/problems";
import { topics } from "@/content/topics";

type CourseFilter = "all" | "power-systems-1" | "power-systems-2";
type SectionFilter = "all" | "Main Tutorial Problems" | "Out of the Box Questions";

const courseLabels: Record<Exclude<CourseFilter, "all">, string> = {
  "power-systems-1": "Power Systems 1",
  "power-systems-2": "Power Systems 2",
};

export default function ProblemBrowser() {
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState<CourseFilter>("all");
  const [topic, setTopic] = useState("all");
  const [section, setSection] = useState<SectionFilter>("all");

  const availableTopics = topics.filter((item) => course === "all" || item.courseId === course);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return problems.filter((problem) => {
      const matchesCourse = course === "all" || problem.courseId === course;
      const matchesTopic = topic === "all" || problem.topicIds.includes(topic);
      const matchesSection = section === "all" || problem.source.originalSection === section;
      const matchesText = !term || problem.statement.toLowerCase().includes(term)
        || problem.id.toLowerCase().includes(term)
        || problem.source.originalQuestionNumber.toString() === term;
      return matchesCourse && matchesTopic && matchesSection && matchesText;
    });
  }, [course, topic, section, search]);

  function changeCourse(value: CourseFilter) {
    setCourse(value);
    setTopic("all");
  }

  return (
    <div className="mt-7">
      <div className="grid gap-3 rounded-2xl border border-[var(--border)] bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-xs font-semibold text-[var(--muted)]">
          Search questions
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Keyword or source ID" className="mt-2 w-full rounded-lg border border-[var(--border)] px-3 py-2.5 text-sm font-normal text-[var(--foreground)] outline-none focus:border-[var(--accent)]" />
        </label>
        <label className="text-xs font-semibold text-[var(--muted)]">
          Course
          <select value={course} onChange={(event) => changeCourse(event.target.value as CourseFilter)} className="mt-2 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2.5 text-sm font-normal text-[var(--foreground)]">
            <option value="all">Both courses</option>
            <option value="power-systems-1">Power Systems 1</option>
            <option value="power-systems-2">Power Systems 2</option>
          </select>
        </label>
        <label className="text-xs font-semibold text-[var(--muted)]">
          Topic
          <select value={topic} onChange={(event) => setTopic(event.target.value)} className="mt-2 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2.5 text-sm font-normal text-[var(--foreground)]">
            <option value="all">All topics</option>
            {availableTopics.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
          </select>
        </label>
        <label className="text-xs font-semibold text-[var(--muted)]">
          Source section
          <select value={section} onChange={(event) => setSection(event.target.value as SectionFilter)} className="mt-2 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2.5 text-sm font-normal text-[var(--foreground)]">
            <option value="all">Both sections</option>
            <option value="Main Tutorial Problems">Main Tutorial Problems</option>
            <option value="Out of the Box Questions">Out of the Box Questions</option>
          </select>
        </label>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-sm text-[var(--muted)]"><strong className="text-[var(--foreground)]">{filtered.length}</strong> of {problems.length} questions</p>
        <button type="button" onClick={() => { setSearch(""); setCourse("all"); setTopic("all"); setSection("all"); }} className="text-sm font-semibold text-[var(--accent)] hover:underline">Reset filters</button>
      </div>

      <div className="mt-3 space-y-3">
        {filtered.map((problem) => {
          const courseLabel = courseLabels[problem.courseId];
          const topicNames = problem.topicIds.map((id) => topics.find((item) => item.id === id)?.title).filter(Boolean);
          return (
            <Link key={problem.id} href={`/problems/${problem.id}`} className="block rounded-xl border border-[var(--border)] bg-white p-4 transition hover:border-[var(--accent)] hover:shadow-sm sm:p-5">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold text-[var(--accent)]">{courseLabel}</span>
                <span className="text-[var(--muted)]">·</span>
                <span className="text-[var(--muted)]">{problem.source.originalSection}</span>
                <span className="ml-auto rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 font-medium text-amber-900">Solution pending review</span>
              </div>
              <h2 className="mt-3 font-semibold leading-6">{problem.source.originalQuestionNumber}. {problem.statement}</h2>
              {topicNames.length > 0 && <p className="mt-3 text-xs leading-5 text-[var(--muted)]">{topicNames.join(" · ")}</p>}
              <p className="mt-3 text-xs text-[var(--muted)]">Source ID: {problem.id}</p>
            </Link>
          );
        })}
        {filtered.length === 0 && <div className="rounded-xl border border-dashed border-[var(--border)] p-10 text-center"><p className="font-semibold">No questions match these filters.</p><p className="mt-2 text-sm text-[var(--muted)]">Try a different keyword, course, or topic.</p></div>}
      </div>
    </div>
  );
}
