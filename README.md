# Power Systems Lab

A responsive power-systems learning web app organized around lesson topics. It presents step-by-step worked solutions and provides engineering calculators.

> **Current status:** all 140 practice questions have answer keys and worked solutions. The previously unresolved questions were revised to correct numerical inconsistencies, clarify units, or state the assumptions required for a determinate result. The student-facing interface contains no external-document citations.

## Features

- Searchable 140-question bank organized by lesson topic, with one primary lesson per question and secondary concept tags. Topic-based review and question navigation use the primary lesson to avoid duplicate listings.
- Guided practice mode with immediate answer feedback, progress tracking for the active session, worked-solution reveal, and question jumping.
- Four answer choices per question with independently stored answer keys.
- Collapsible **Show Solution / Hide Solution** sections.
- Previous / Next question navigation within the same lesson topic.
- Responsive layouts for mobile, tablet, and desktop.
- Eight calculators: complex numbers and phasors, transmission-line parameters, short-line model, nominal-T/nominal-π models, per-unit base conversion, symmetrical components, short-circuit/fault current, and long-line model.
- Shared pure TypeScript calculation functions with automated tests for numerical functions and question content.

## Engineering-quality principles

- State assumptions and units where they affect the answer.
- Keep the verified answer key separate from internal legacy answer markings.
- Correct ambiguous or inconsistent question data instead of silently forcing a mismatched choice.
- Use deterministic calculation functions rather than runtime-generated arithmetic.
- Reuse components and calculation functions rather than duplicating logic.
- Treat calculator outputs as educational estimates and verify assumptions before engineering use.

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
- `/topics` — lesson topic directory
- `/practice` — choose a lesson for guided practice
- `/practice?topic=<topic-id>` — guided practice for one lesson
- `/problems` — searchable/filterable 140-question bank
- `/problems/[id]` — question detail and worked solution
- `/calculators` — calculator library
- `/calculators/complex` — complex-number and phasor calculator
- `/calculators/[slug]` — additional power-system calculators

## Calculator assumptions

- **Transmission-line parameters:** transposed three-phase line, geometric-mean phase spacing, conductor GMR for inductance, physical radius for capacitance; ground and bundle effects are excluded.
- **Short-line model:** balanced three-phase, per-phase series impedance, receiving voltage as reference.
- **Nominal-T/nominal-π:** total per-phase series impedance and total shunt admittance.
- **Per-unit conversion:** voltage bases must refer to corresponding transformer sides and consistent line/phase conventions.
- **Symmetrical components:** phase values entered as rectangular complex numbers in a common reference frame.
- **Fault current:** three-phase fault level assumes a balanced fault; the SLG option uses real sequence impedances and a solid fault.
- **Long-line model:** uniform distributed parameters, balanced operation, and receiving voltage as reference.

These tools are intended for study and preliminary calculations. They do not replace a validated network model, protection study, equipment rating check, or professional engineering review.

## Content and validation

Each question has a solution status, answer key, given values where applicable, assumptions, equations, calculation steps, and a final answer. When a statement was underdetermined or inconsistent with its choices, the record was revised to make the intended model explicit. Automated tests, lint, and production build run through GitHub Actions.

A subject-matter expert review is recommended before using the worked solutions or calculator outputs for formal instruction or engineering decisions.

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
