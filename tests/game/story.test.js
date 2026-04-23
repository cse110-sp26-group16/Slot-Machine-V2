import { describe, it, expect } from 'vitest';
import { calculateBalance, resolveSpin, LogicError } from '../../src/game/logic.js';

describe('Core Gameplay Logic', () => {
  
  describe('calculateBalance', () => {
    it('deducts the exact stake from a positive balance', () => {
      const balance = 500;
      const stake = 50;
      const result = calculateBalance(balance, stake);

      expect(result).toBe(450);
      expect(typeof result).toBe('number');
    });

    it('allows the balance to reach zero exactly', () => {
      expect(calculateBalance(100, 100)).toBe(0);
    });

    describe('input validation', () => {
      it('throws LogicError for negative stake', () => {
        expect(() => calculateBalance(100, -10)).toThrow(LogicError);
      });

      it('throws LogicError for non-numeric inputs', () => {
        expect(() => calculateBalance('100', 10)).toThrow(LogicError);
        expect(() => calculateBalance(100, null)).toThrow(LogicError);
      });
    });
  });

  describe('resolveSpin', () => {
    const baseBalance = 100;
    const baseStake = 10;

    it('returns a mathematically correct state for wins (Story 2)', () => {
      const winnings = 50;
      const result = resolveSpin(baseBalance, baseStake, winnings);

      // verify ifthe object structure matches the component contract
      expect(result).toHaveProperty('newBalance');
      expect(result).toHaveProperty('message');

      // verify if the math: 100 - 10 + 50 = 140
      expect(result.newBalance).toBe(140);
      expect(result.message).toContain('50');
    });

    it('returns a satirical AI error message for losses (Story 4)', () => {
      const winnings = 0;
      const result = resolveSpin(baseBalance, baseStake, winnings);
      const keyThemeWords = ["hallucinated", "techbro", "simulation", "pivot"];

      // check the math: 100 - 10 + 0 = 90
      expect(result.newBalance).toBe(90);

      // check the theme requirements
      const hasThemeWord = keyThemeWords.some(word => 
        result.message.toLowerCase().includes(word)
      );
      expect(hasThemeWord).toBe(true);
    });

    describe('state integrity', () => {
      it('does not allow winnings to be a negative value', () => {
        expect(() => resolveSpin(100, 10, -50)).toThrow(LogicError);
      });

      it('maintains numeric precision for floating point balance', () => {
        const result = resolveSpin(10.5, 5.2, 0);
        expect(result.newBalance).toBeCloseTo(5.3);
      });
    });
  });
});