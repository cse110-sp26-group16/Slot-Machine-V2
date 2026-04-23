import { describe, it, expect } from 'vitest';
import { calculateJackpotIncrement } from '../../../src/game/logic.js';

describe('Progressive Jackpot Logic', () => {
  it('always increments the jackpot value', () => {
    const initial = 987654;
    const next = calculateJackpotIncrement(initial);
    expect(next).toBeGreaterThan(initial);
  });

  it('increments by at least 500 tokens', () => {
    const initial = 1000;
    const next = calculateJackpotIncrement(initial);
    expect(next - initial).toBeGreaterThanOrEqual(500);
  });
});