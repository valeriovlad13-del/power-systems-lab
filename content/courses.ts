export const courses = [
  {
    id: "power-systems-1",
    title: "Power Systems 1",
    sourceQuestionCount: 80,
    sourceSections: [
      { id: "main-tutorial", label: "Main Tutorial Problems", count: 20 },
      { id: "out-of-the-box", label: "Out of the Box Questions", count: 60 },
    ],
  },
  {
    id: "power-systems-2",
    title: "Power Systems 2",
    sourceQuestionCount: 60,
    sourceSections: [
      { id: "main-tutorial", label: "Main Tutorial Problems", count: 10 },
      { id: "out-of-the-box", label: "Out of the Box Questions", count: 50 },
    ],
  },
] as const;
