# Architecture decisions

## Initial content storage
Use version-controlled TypeScript or JSON files for the first release. Add a database only when user accounts or live editing are justified.

## Numerical calculations
Keep calculations in pure TypeScript functions and test them with Vitest. UI components call the functions and format results. Do not use AI to perform engineering arithmetic at runtime.

## Solution verification
`pending` is the default status. A solution may be marked `verified` only after checking formulas, substitutions, units, intermediate values, assumptions, and final answer.

## Reusable UI
Build one problem-detail route and shared solution-step renderer. Calculator pages may share field, validation, formula, and result UI primitives, while formula implementations remain separate and testable.
