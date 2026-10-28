# Power Systems Lab

A responsive learning web app for **Power Systems 1** and **Power Systems 2**. It organizes practice problems by topic, presents step-by-step worked solutions, and provides engineering calculators.

> **Current status:** all 140 practice questions have answer keys and worked solutions. The previously unresolved questions were revised to correct numerical inconsistencies, clarify units, or state the assumptions required for a determinate result. The student-facing interface contains no external-document citations.

## Features

- Searchable and filterable 140-question bank across two courses.
- Four answer choices per question with independently stored answer keys.
- Collapsible **Show Solution / Hide Solution** sections.
- Previous / Next question navigation within the same course and section.
- Responsive layouts for mobile, tablet, and desktop.
- Engineering calculators and mathematical rendering.
- Automated tests for question inventory, answer-key structure, topic assignments, and numerical functions.

## Engineering-quality principles

- State assumptions and units where they affect the answer.
- Keep the verified answer key separate from internal legacy answer markings.
- Correct ambiguous or inconsistent question data instead of silently forcing a mismatched choice.
- Use deterministic calculation functions rather than runtime-generated arithmetic.
- Reuse components and calculation functions rather than duplicating logic.

## Stack

- Next.js App Router + React
- TypeScript
- Tailwind CSS
- KaTeX for mathematical rendering
- Vitest for calculation and content tests
- Vercel deployment target

## Getting started

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Routes

- `/` — landing page
- `/courses/power-systems-1` — Power Systems 1 overview
- `/courses/power-systems-2` — Power Systems 2 overview
- `/topics` — topic directory
- `/problems` — searchable/filterable 140-question bank
- `/problems/[id]` — question detail and worked solution
- `/calculators` — calculator library
- `/calculators/complex` — complex-number calculator

## Content and validation

Each question has a solution status, answer key, given values where applicable, assumptions, equations, calculation steps, and a final answer. When a statement was underdetermined or inconsistent with its choices, the record was revised to make the intended model explicit. Automated tests, lint, and production build run through GitHub Actions.

A subject-matter expert review is recommended before using the worked solutions for formal instruction or engineering decisions.

## Project structure

```text
app/                  Next.js routes
components/           Reusable interface and feature components
content/              Courses, topics, and 140 practice questions
lib/problems/         Shared problem data types
lib/calculations/     Pure numerical functions
lib/validation/       Input and content validation
lib/search/           Problem filtering and search
tests/                Calculation and content tests
public/diagrams/      Reviewed diagrams
docs/                 Architecture and content audit notes
```
