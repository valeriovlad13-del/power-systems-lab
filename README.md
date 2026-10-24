# Power Systems Lab

A responsive learning web app for **Power Systems 1** and **Power Systems 2**. It organizes problems by topic, presents reviewed step-by-step solutions, and provides deterministic engineering calculators.

> **Current status:** the app foundation and first calculator are committed. The complete inventory and worked solutions are not yet imported. The source PDF contains 140 questions; each item must be transcribed and checked before a solution is marked verified.

## Principles

- Preserve original problem wording, options, numbering, and source section.
- Keep source identity separate from the app's topic taxonomy.
- Treat solutions as pending until formulas, substitutions, units, assumptions, and final answers are reviewed.
- Use tested deterministic functions for engineering calculations, not AI-generated arithmetic at runtime.
- Reuse components and calculation functions rather than duplicating logic.
- Design mobile-first and validate phone, tablet, and desktop layouts.

## Stack

- Next.js App Router + React
- TypeScript
- Tailwind CSS
- KaTeX for mathematical rendering
- Vitest for calculations/content tests
- Vercel deployment target

## Getting started

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Routes implemented

- `/` — project landing page
- `/courses/power-systems-1` — Power Systems 1 overview
- `/courses/power-systems-2` — Power Systems 2 overview
- `/topics` — provisional topic taxonomy
- `/calculators` — calculator library
- `/calculators/complex` — working complex-number calculator with pure calculation functions and tests

## Initial build sequence

1. Audit and inventory all 140 source questions and preserve source identifiers.
2. Verify topic assignment while retaining source section labels.
3. Build the reusable question detail and solution renderer.
4. Add calculators incrementally, each with validation and automated tests.
5. Import content in batches and independently review solution steps.
6. Perform responsive QA and deploy.

## Verification policy

A problem may be present in the bank while its solution is pending. Only solutions marked `verified` after technical review should be presented as approved worked answers. A marked choice in the source is not automatically treated as correct.

## Project structure

```text
app/                  Next.js routes
components/           Reusable interface and feature components
content/              Course, topic, and problem data
lib/problems/         Shared problem data types
lib/calculations/     Pure, tested numerical functions
lib/validation/       Input and content validation
lib/search/           Problem filtering and search
tests/                Calculation and content tests
public/diagrams/      Reviewed diagrams
docs/                 Architecture and content audit notes
```
