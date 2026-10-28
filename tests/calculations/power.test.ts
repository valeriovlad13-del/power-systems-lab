import { describe, expect, it } from "vitest";
import {
  calculateLineParameters,
  calculateLongLine,
  calculateNominalModel,
  calculateShortLine,
  calculateSingleLineToGroundFault,
  calculateThreePhaseFault,
  calculateSymmetricalComponents,
  convertPerUnit,
} from "@/lib/calculations/power";

describe("power-system calculation library", () => {
  it("calculates equivalent phase spacing and positive line parameters", () => {
    const result = calculateLineParameters({
      spacingABm: 4, spacingBCm: 5, spacingCAm: 6, conductorGmrM: 0.01, conductorRadiusM: 0.012,
    });
    expect(result.gmdM).toBeCloseTo(Math.cbrt(120), 8);
    expect(result.inductanceMilliHenryPerKm).toBeGreaterThan(0);
    expect(result.capacitanceMicroFaradPerKm).toBeGreaterThan(0);
  });

  it("rejects invalid conductor geometry", () => {
    expect(() => calculateLineParameters({
      spacingABm: 1, spacingBCm: 1, spacingCAm: 1, conductorGmrM: 2, conductorRadiusM: 0.01,
    })).toThrow(/smaller than/i);
  });

  it("calculates short-line current, losses, and efficiency", () => {
    const result = calculateShortLine({
      receivingVoltageKV: 33, realPowerMW: 10, powerFactor: 0.9,
      resistanceOhmPerPhase: 2, reactanceOhmPerPhase: 5, powerFactorType: "lagging",
    });
    expect(result.currentA).toBeCloseTo(194.39, 1);
    expect(result.sendingVoltageKV).toBeGreaterThan(33);
    expect(result.copperLossKW).toBeGreaterThan(0);
    expect(result.efficiencyPercent).toBeGreaterThan(0);
    expect(result.efficiencyPercent).toBeLessThan(100);
  });

  it("returns the expected nominal-T and nominal-pi ABCD structure", () => {
    const common = { resistanceOhm: 8, reactanceOhm: 30, conductanceSiemens: 0, susceptanceSiemens: 0.0004 };
    const t = calculateNominalModel({ ...common, model: "T" });
    const pi = calculateNominalModel({ ...common, model: "pi" });
    expect(t.A).toEqual(t.D);
    expect(pi.A).toEqual(pi.D);
    expect(t.B.re).not.toBe(pi.B.re);
    expect(pi.C.im).toBeLessThan(common.susceptanceSiemens);
  });

  it("converts per-unit values between bases", () => {
    expect(convertPerUnit({ oldPerUnit: 0.15, oldBaseMVA: 10, newBaseMVA: 100, oldBaseKV: 13.8, newBaseKV: 13.8 }).newPerUnit).toBeCloseTo(1.5);
  });

  it("separates a balanced positive-sequence set", () => {
    const result = calculateSymmetricalComponents({
      vaRe: 120, vaIm: 0, vbRe: -60, vbIm: -103.923048, vcRe: -60, vcIm: 103.923048,
    });
    expect(Math.hypot(result.positive.re, result.positive.im)).toBeCloseTo(120, 4);
    expect(Math.hypot(result.zero.re, result.zero.im)).toBeCloseTo(0, 4);
    expect(Math.hypot(result.negative.re, result.negative.im)).toBeCloseTo(0, 4);
  });

  it("calculates three-phase fault current from fault MVA", () => {
    expect(calculateThreePhaseFault({ faultMVA: 100, lineVoltageKV: 11 }).faultCurrentKA).toBeCloseTo(5.2486, 3);
  });

  it("calculates solid SLG fault current from real sequence impedances", () => {
    expect(calculateSingleLineToGroundFault({
      lineVoltageKV: 11, positiveSequenceOhm: 0.2, negativeSequenceOhm: 0.2, zeroSequenceOhm: 0.6,
    }).faultCurrentA).toBeCloseTo(19052.56, 1);
  });

  it("calculates long-line constants and finite operating results", () => {
    const result = calculateLongLine({
      resistanceOhmPerKm: 0.05, reactanceOhmPerKm: 0.35,
      conductanceMicroSiemensPerKm: 0, susceptanceMicroSiemensPerKm: 3.5,
      lengthKm: 250, receivingVoltageKV: 220, receivingCurrentA: 300,
      powerFactor: 0.9, powerFactorType: "lagging",
    });
    expect(result.sendingVoltageKV).toBeGreaterThan(0);
    expect(result.sendingCurrentA).toBeGreaterThan(0);
    expect(Number.isFinite(result.voltageRegulationPercent)).toBe(true);
    expect(Number.isFinite(result.efficiencyPercent)).toBe(true);
  });

  it("supports a zero-shunt-admittance long-line limit", () => {
    const result = calculateLongLine({
      resistanceOhmPerKm: 0.05, reactanceOhmPerKm: 0.35,
      conductanceMicroSiemensPerKm: 0, susceptanceMicroSiemensPerKm: 0,
      lengthKm: 100, receivingVoltageKV: 110, receivingCurrentA: 100,
      powerFactor: 1, powerFactorType: "lagging",
    });
    expect(result.A.re).toBeCloseTo(1);
    expect(result.C.re).toBeCloseTo(0);
    expect(Number.isFinite(result.sendingVoltageKV)).toBe(true);
  });
});
