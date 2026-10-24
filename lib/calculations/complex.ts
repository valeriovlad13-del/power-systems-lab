export interface ComplexNumber {
  re: number;
  im: number;
}

export interface PolarComplex {
  magnitude: number;
  angleDegrees: number;
}

function assertFinite(value: number, label: string): void {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number.`);
  }
}

export function complexAdd(a: ComplexNumber, b: ComplexNumber): ComplexNumber {
  assertFinite(a.re, "a.re");
  assertFinite(a.im, "a.im");
  assertFinite(b.re, "b.re");
  assertFinite(b.im, "b.im");
  return { re: a.re + b.re, im: a.im + b.im };
}

export function complexMultiply(a: ComplexNumber, b: ComplexNumber): ComplexNumber {
  assertFinite(a.re, "a.re");
  assertFinite(a.im, "a.im");
  assertFinite(b.re, "b.re");
  assertFinite(b.im, "b.im");
  return {
    re: a.re * b.re - a.im * b.im,
    im: a.re * b.im + a.im * b.re,
  };
}

export function complexToPolar(value: ComplexNumber): PolarComplex {
  assertFinite(value.re, "real part");
  assertFinite(value.im, "imaginary part");
  const magnitude = Math.hypot(value.re, value.im);
  // Choose 0° for zero to avoid an undefined atan2 interpretation in the UI.
  const angleDegrees = magnitude === 0 ? 0 : (Math.atan2(value.im, value.re) * 180) / Math.PI;
  return { magnitude, angleDegrees };
}

export function polarToComplex(value: PolarComplex): ComplexNumber {
  assertFinite(value.magnitude, "magnitude");
  assertFinite(value.angleDegrees, "angle");
  if (value.magnitude < 0) throw new Error("Magnitude must be zero or positive.");
  const radians = (value.angleDegrees * Math.PI) / 180;
  return {
    re: value.magnitude * Math.cos(radians),
    im: value.magnitude * Math.sin(radians),
  };
}

export function complexDivide(a: ComplexNumber, b: ComplexNumber): ComplexNumber {
  assertFinite(a.re, "a.re");
  assertFinite(a.im, "a.im");
  assertFinite(b.re, "b.re");
  assertFinite(b.im, "b.im");
  const denominator = b.re * b.re + b.im * b.im;
  if (denominator === 0) throw new Error("Cannot divide by zero complex number.");
  return {
    re: (a.re * b.re + a.im * b.im) / denominator,
    im: (a.im * b.re - a.re * b.im) / denominator,
  };
}
