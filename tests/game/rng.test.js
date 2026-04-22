import { describe, it, expect } from 'vitest';
import { createRng, RngError } from '../../src/game/rng';

describe('createRng', () => {
  it('should produce a deterministic sequence for the same seed', () => {
    const rng1 = createRng(42);
    const rng2 = createRng(42);
    const sequence1 = Array.from({ length: 10 }, () => rng1());
    const sequence2 = Array.from({ length: 10 }, () => rng2());
    expect(sequence1).toEqual(sequence2);
  });

  it('should produce different sequences for different seeds', () => {
    const rng1 = createRng(42);
    const rng2 = createRng(1337);
    const sequence1 = Array.from({ length: 10 }, () => rng1());
    const sequence2 = Array.from({ length: 10 }, () => rng2());
    expect(sequence1).not.toEqual(sequence2);
  });

  it('should only produce values in the range [0, 1)', () => {
    const rng = createRng(Date.now());
    for (let i = 0; i < 100; i++) {
      const value = rng();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });

  it('should throw RngError if the generator produces NaN', () => {
    const badGenerator = () => NaN;
    const rng = createRng(0, badGenerator);
    expect(() => rng()).toThrow(RngError);
  });

  it('should throw RngError if the generator produces a value >= 1', () => {
    const badGenerator = () => 2;
    const rng = createRng(0, badGenerator);
    expect(() => rng()).toThrow(RngError);
  });

  it('should throw RngError when seed is NaN', () => {
    expect(() => createRng(NaN)).toThrow(RngError);
  });

  it('should throw RngError when seed is Infinity', () => {
    expect(() => createRng(Infinity)).toThrow(RngError);
  });

  it('should throw RngError when seed is not a number', () => {
    // @ts-ignore
    expect(() => createRng('42')).toThrow(RngError);
  });

  it('should throw RngError when the generator produces a negative value', () => {
    const badGenerator = () => -0.5;
    const rng = createRng(0, badGenerator);
    expect(() => rng()).toThrow(RngError);
  });
});
