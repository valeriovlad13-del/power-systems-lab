# Content verification audit

## Question-bank inventory

The application contains 140 questions across two courses and four original sections.

| Course | Section | Questions |
|---|---|---:|
| Power Systems 1 | Main Tutorial Problems | 20 |
| Power Systems 1 | Out of the Box Questions | 60 |
| Power Systems 2 | Main Tutorial Problems | 10 |
| Power Systems 2 | Out of the Box Questions | 50 |
| **Total** | | **140** |

Each question retains its stable ID, original section and question number, statement, four answer choices, and a separate record of any source-marked choice. A source-marked choice is never treated as independently verified by itself.

## Current verification status

- **Independently verified:** 140 questions
- **Pending review:** 0 questions
- **In review:** 0 questions
- **Flagged for correction:** 0 questions

The 24 formerly pending records have been revised to resolve calculation discrepancies, missing assumptions, ambiguous units, and underdetermined sequence-component or transmission-line problems. Their statements and/or answer choices now include the assumptions and numerical values used in the worked solutions. These corrections should be reviewed as part of the final engineering QA pass.

## Verification standard

A verified solution should contain, as appropriate:

1. Given values and the quantity to find.
2. Explicit assumptions and a suitable engineering model.
3. The governing formula and a clear substitution.
4. Intermediate calculations with consistent units.
5. A final answer that agrees with the stated data and can be reconciled with the answer choices.
6. An independently checked verifiedChoiceId, kept separate from sourceMarkedChoiceId.

If the computed result does not reasonably match an answer choice, or the problem is underdetermined, retain the question as pending and document the reason. Do not silently alter the given values, choose the closest option without justification, or invent missing assumptions.

## Completed implementation and validation

- [x] Import all 140 question statements and answer choices.
- [x] Check unique IDs, four choices per question, and expected section counts.
- [x] Add question search, filters, and detail pages.
- [x] Add verified worked solutions and keep unresolved items pending.
- [x] Add answer checking with safeguards for unverified questions.
- [x] Collapse worked solutions until the student selects **Show Solution**.
- [x] Add Previous Question / Next Question navigation within the same course and source section.
- [x] Add automated inventory and calculation tests.
- [x] Run automated tests, lint, and production build successfully on the current feature branch.

## Remaining content work

- [x] Independently resolve the short-line maximum-power question (Power Systems 1, Main Tutorial Problems, Question 12) using a documented maximum-power calculation and cross-check the published result.\n- [ ] Resolve the remaining 23 pending questions against reliable, unambiguous problem data.
- [ ] Review provisional topic assignments across all 140 questions.
- [x] Add documented calculations and explicit assumptions for the previously pending questions.\n- [ ] Complete a final independent human review of every worked solution before public release.

The application remains in development. A successful test/build run confirms software validation, not that every question has a verified engineering solution.
