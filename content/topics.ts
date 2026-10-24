// Proposed taxonomy. Verify and assign topics after auditing the source questions.
export const topics = [
  { id: "line-parameters", courseId: "power-systems-1", title: "Conductor Resistance and Line Parameters" },
  { id: "line-performance", courseId: "power-systems-1", title: "Transmission-Line Performance" },
  { id: "efficiency-power", courseId: "power-systems-1", title: "Transmission Efficiency and Maximum Power" },
  { id: "short-medium-lines", courseId: "power-systems-1", title: "Short and Medium Transmission Lines" },
  { id: "long-lines", courseId: "power-systems-1", title: "Long Transmission Lines" },
  { id: "surge-sil", courseId: "power-systems-1", title: "Surge Phenomena and SIL" },
  { id: "per-unit", courseId: "power-systems-2", title: "Per-Unit System" },
  { id: "complex-phasors", courseId: "power-systems-2", title: "Complex Numbers and Phase Operators" },
  { id: "symmetrical-components", courseId: "power-systems-2", title: "Symmetrical Components" },
  { id: "sequence-networks", courseId: "power-systems-2", title: "Sequence Impedances and Networks" },
  { id: "fault-levels", courseId: "power-systems-2", title: "Short-Circuit Capacity and Fault Levels" },
  { id: "fault-analysis", courseId: "power-systems-2", title: "Symmetrical and Unsymmetrical Faults" },
  { id: "generator-transients", courseId: "power-systems-2", title: "Generator Transient and Subtransient Analysis" },
  { id: "neutral-grounding", courseId: "power-systems-2", title: "Neutral Grounding and Fault-Current Limitation" },
] as const;
