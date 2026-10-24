# Power Systems Lab

A responsive learning web app for **Power Systems 1** and **Power Systems 2**. It organizes source problems by topic, presents reviewed step-by-step solutions, and provides deterministic engineering calculators.

> **Current status:** all 140 source questions and their four choices have been imported. Four Power Systems 1 Main Tutorial Problems have independently checked worked solutions. The remaining 136 solutions are pending review.

## Principles

- Preserve original problem wording, choices, numbering, and source section.
- Store source-marked choices separately from independently verified answers.
- Keep topic assignments provisional until checked against each question.
- Treat solutions as pending until formulas, substitutions, units, assumptions, and final answers are reviewed.
- Use tested deterministic functions for engineering calculations, not AI-generated arithmetic at runtime.
- Reuse components and calculation functions rather than duplicating logic.
- Design mobile-first and validate phone, tablet, and desktop layouts.

## Stack

- Next.js App Router + React
- TypeScript
- Tailwind CSS
- KaTeX for mathematical rendering
- Vitest for calculation/content tests
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
- `/topics` — provisional topic directory
- `/problems` — searchable/filterable 140-question bank
- `/problems/[id]` — question detail and solution status
- `/calculators` — calculator library
- `/calculators/complex` — complex-number calculator

## Content verification

The source's asterisk-marked choice is recorded as `sourceMarkedChoiceId`. It is not treated as the verified answer. A reviewed solution uses `verificationStatus: "verified"` and `verifiedChoiceId`, plus given values, assumptions, equations, calculation steps, and a final answer. Only four problems currently meet that standard.

## Build sequence

1. Review topic assignments and source transcription.
2. Continue verifying solutions in small batches.
3. Build a reusable solution renderer and question-linked calculator inputs.
4. Add engineering calculators incrementally with automated tests.
5. Run tests, production build, responsive QA, and deploy.

## Project structure

```text
app/                  Next.js routes
components/           Reusable interface and feature components
content/              Courses, topics, and 140 source questions
lib/problems/         Shared problem data types
lib/calculations/     Pure numerical functions
lib/validation/       Input and content validation
lib/search/           Problem filtering and search
tests/                Calculation and content tests
public/diagrams/      Reviewed diagrams
docs/                 Architecture and content audit notes
```
