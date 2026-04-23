import { describe, it, expect } from 'vitest';
// We use ../../../ to go up three levels to the root src folder
import { adjustBetAmount } from '../../../src/game/logic.js';

describe('Bet Adjustment Logic', () => {
  it('increases the bet correctly', () => {
    expect(adjustBetAmount(10, 5)).toBe(15);
  });

  it('decreases the bet correctly', () => {
    expect(adjustBetAmount(15, -5)).toBe(10);
  });

  it('prevents the bet from dropping below the minimum (5)', () => {
    expect(adjustBetAmount(5, -5)).toBe(5);
  });
});