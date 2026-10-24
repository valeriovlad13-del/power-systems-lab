# Source content audit

## Source inventory

Source file: `Power Systems Analysis 1 & 2 - Problems and Choices.pdf`

| Course | Original section | Source question numbers | Imported |
|---|---|---:|---:|
| Power Systems 1 | Main Tutorial Problems | 1–20 | 20 |
| Power Systems 1 | Out of the Box Questions | 1–60 | 60 |
| Power Systems 2 | Main Tutorial Problems | 1–10 | 10 |
| Power Systems 2 | Out of the Box Questions | 1–50 | 50 |
| **Total** | | | **140** |

Every imported question currently has four answer choices and the source's asterisk-marked option stored separately from verified answer data.

## Verification status

- Independently worked and verified: 4
  - Power Systems 1, Main Tutorial Problems 1
  - Power Systems 1, Main Tutorial Problems 2
  - Power Systems 1, Main Tutorial Problems 4
  - Power Systems 1, Main Tutorial Problems 5
- Pending solution review: 136
- Topic assignment: provisional; inspect each classification against the problem statement before treating it as final.

## Audit rules

1. Preserve original wording, answer choices, numbering, and source section.
2. Add PDF page references when confirmed.
3. Flag unreadable symbols, ambiguous notation, missing data, or suspected source errors.
4. Topic assignments must not replace source section labels.
5. Keep solutions `pending` until formulas, substitutions, units, assumptions, and final answers are independently checked.
6. Never assume an asterisk-marked source answer is correct without verification.
7. Record `sourceMarkedChoiceId` and `verifiedChoiceId` separately.

## Remaining work

- [x] Import all 140 question statements and answer choices
- [x] Check source-section counts and unique IDs
- [x] Create searchable question bank and question detail pages
- [x] Add first four independently checked solutions
- [ ] Review all provisional topic assignments
- [ ] Verify the remaining 136 worked solutions in batches
- [ ] Add PDF page references to source records
- [ ] Run automated tests and production build in the development environment
