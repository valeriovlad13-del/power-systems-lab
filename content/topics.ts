// Proposed taxonomy. Confirm assignments after auditing every source question.
export const topics = [
  { id: "line-parameters", courseId: "power-systems-1", title: "Conductor Resistance and Line Parameters", description: "Conductor resistance, inductance, capacitance, GMR/GMD, spacing, and bundled conductors." },
  { id: "line-performance", courseId: "power-systems-1", title: "Transmission-Line Performance", description: "Sending-end and receiving-end quantities, voltage regulation, and losses." },
  { id: "efficiency-power", courseId: "power-systems-1", title: "Transmission Efficiency and Maximum Power", description: "Efficiency, allowable losses, and power-transfer limits." },
  { id: "short-medium-lines", courseId: "power-systems-1", title: "Short and Medium Transmission Lines", description: "Short-line model, nominal-T and nominal-π models, and ABCD constants." },
  { id: "long-lines", courseId: "power-systems-1", title: "Long Transmission Lines", description: "Distributed parameters, propagation constants, characteristic impedance, and long-line equations." },
  { id: "surge-sil", courseId: "power-systems-1", title: "Surge Phenomena and SIL", description: "Surge impedance, surge impedance loading, and propagation velocity." },
  { id: "per-unit", courseId: "power-systems-2", title: "Per-Unit System", description: "Base quantities and impedance conversion across equipment bases." },
  { id: "complex-phasors", courseId: "power-systems-2", title: "Complex Numbers and Phase Operators", description: "Rectangular and polar forms, phase operators, and phasors." },
  { id: "symmetrical-components", courseId: "power-systems-2", title: "Symmetrical Components", description: "Positive-, negative-, and zero-sequence components and phase reconstruction." },
  { id: "sequence-networks", courseId: "power-systems-2", title: "Sequence Impedances and Networks", description: "Sequence impedances and interconnected sequence networks." },
  { id: "fault-levels", courseId: "power-systems-2", title: "Short-Circuit Capacity and Fault Levels", description: "Fault MVA, equivalent reactance, and short-circuit levels." },
  { id: "fault-analysis", courseId: "power-systems-2", title: "Symmetrical and Unsymmetrical Faults", description: "Three-phase, line-to-line, single-line-to-ground, and double-line-to-ground faults." },
  { id: "generator-transients", courseId: "power-systems-2", title: "Generator Transient and Subtransient Analysis", description: "Generator reactances and short-circuit behavior over time." },
  { id: "neutral-grounding", courseId: "power-systems-2", title: "Neutral Grounding and Fault-Current Limitation", description: "Grounding approaches and their influence on fault current." },
] as const;
