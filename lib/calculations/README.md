# Calculation engine

Keep engineering formulas in pure TypeScript functions, separate from React components. The calculator interface should collect inputs and display results; it must not duplicate numerical formulas.

## Available calculation modules

- `complex.ts`: rectangular/polar complex arithmetic.
- `power.ts`: line inductance/capacitance estimates, short-line model, nominal-T/nominal-π ABCD constants, per-unit conversion, symmetrical components, three-phase and single-line-to-ground fault current, and long-line ABCD calculations.

## Requirements for new formulas

Each function should:
- Validate finite values, positive bases, and physically meaningful ranges.
- Document units, assumptions, sign conventions, and the model's limitations.
- Return structured numeric results rather than UI-formatted strings.
- Handle edge cases explicitly, including zero shunt admittance where a limit is defined.
- Have automated tests for normal, boundary, and invalid inputs.
- Use consistent three-phase, line-to-line, per-phase, and per-unit conventions.

Use SI units internally where practical. Convert units at the input/output boundary and label every input and result. Do not treat an approximate model as a substitute for detailed studies, equipment ratings, or protection coordination.
