# Power Systems Lab

A responsive learning web app for **Power Systems 1** and **Power Systems 2**. It will organize problems by topic, provide reviewed step-by-step solutions, and offer deterministic engineering calculators.

> **Current state:** project scaffold and content-audit workflow. The question inventory and worked solutions are not yet imported. The source PDF contains 140 questions; each item must be transcribed and checked before being marked verified.

## Principles

- Preserve original problem wording, choices, numbering, and source section.
- Keep source identity separate from the app's topic taxonomy.
- Treat solutions as pending until formulas, substitutions, units, assumptions, and final answers have been reviewed.
- Use tested deterministic functions for engineering calculations, not AI-generated arithmetic at runtime.
- Use shared UI and solution-rendering components to avoid duplicate logic and inconsistent steps.
- Design mobile-first and test phone, tablet, and desktop layouts.

## Stack

- Next.js App Router + React
- TypeScript
- Tailwind CSS
- KaTeX for equation rendering
- Vitest for numerical and content tests
- Vercel deployment target

## Getting started

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Initial build sequence

1. Inventory the 140 source questions and preserve their source identifiers.
2. Assign provisional topics while retaining original section labels.
3. Build question-bank navigation and a reusable solution renderer.
4. Implement one calculator with validated inputs and automated tests.
5. Import and verify content in batches.
6. Expand the calculator library, perform responsive QA, and deploy.

## Verification policy

A problem may be present in the bank while its solution is pending. Only solutions marked `verified` after technical review should be presented as approved worked answers. A marked answer in the source is not automatically treated as correct.

## Project structure

```text
app/                  Next.js routes
components/            Reusable interface and feature components
content/               Course, topic, and problem data
lib/calculations/      Pure, tested numerical functions
lib/validation/        Input and content validation
lib/search/            Problem filtering and search
tests/                 Calculation and content tests
public/diagrams/       Reviewed diagrams
docs/                  Architecture and content audit notes
```
