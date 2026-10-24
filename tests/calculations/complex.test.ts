import { describe, expect, it } from "vitest";
import {
  complexAdd,
  complexDivide,
  complexMultiply,
  complexToPolar,
  polarToComplex,
} from "@/lib/calculations/complex";

describe("complex-number calculations", () => {
  it("adds complex numbers", () => {
    expect(complexAdd({ re: 3, im: 2 }, { re: 1, im: -5 })).toEqual({ re: 4, im: -3 });
  });

  it("multiplies complex numbers", () => {
    expect(complexMultiply({ re: 3, im: 2 }, { re: 1, im: -5 })).toEqual({ re: 13, im: -13 });
  });

  it("converts rectangular to polar form", () => {
    const result = complexToPolar({ re: 0, im: 2 });
    expect(result.magnitude).toBeCloseTo(2);
    expect(result.angleDegrees).toBeCloseTo(90);
  });

  it("converts polar to rectangular form", () => {
    const result = polarToComplex({ magnitude: 10, angleDegrees: 0 });
    expect(result.re).toBeCloseTo(10);
    expect(result.im).toBeCloseTo(0);
  });

  it("divides complex numbers", () => {
    const result = complexDivide({ re: 1, im: 1 }, { re: 1, im: -1 });
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(1);
  });

  it("rejects division by zero", () => {
    expect(() => complexDivide({ re: 1, im: 0 }, { re: 0, im: 0 })).toThrow(/zero complex/i);
  });

  it("rejects non-finite values", () => {
    expect(() => complexAdd({ re: Number.NaN, im: 0 }, { re: 1, im: 0 })).toThrow(/finite/i);
  });
});
