import { describe, it, expect } from 'vitest';
import { evaluateGrid } from '../../src/game/payline.js';

/** @typedef {import('../../src/game/grid.js').Grid} Grid */

describe('evaluateGrid', () => {
  it('returns 0 for a grid with no winning lines', () => {
    /** @type {Grid} */
    const grid = [
      ['A', 'K', 'Q'],
      ['Q', 'A', 'K'],
      ['K', 'Q', 'A'],
    ];
    expect(evaluateGrid(grid)).toBe(0);
  });

  it('returns the correct payout for a single winning line (3xQ)', () => {
    /** @type {Grid} */
    const grid = [
      ['Q', 'Q', 'Q'],
      ['A', 'K', 'A'],
      ['K', 'A', 'K'],
    ];
    expect(evaluateGrid(grid)).toBe(5);
  });

  it('returns the correct payout for a single winning line (3xK)', () => {
    /** @type {Grid} */
    const grid = [
      ['A', 'K', 'A'],
      ['K', 'K', 'K'],
      ['Q', 'A', 'Q'],
    ];
    expect(evaluateGrid(grid)).toBe(10);
  });

  it('returns the correct payout for a single winning line (3xA)', () => {
    /** @type {Grid} */
    const grid = [
      ['A', 'K', 'Q'],
      ['Q', 'A', 'K'],
      ['A', 'A', 'A'],
    ];
    expect(evaluateGrid(grid)).toBe(15);
  });

  it('correctly uses a wild symbol to complete a line', () => {
    /** @type {Grid} */
    const grid = [
      ['A', 'W', 'A'],
      ['K', 'Q', 'K'],
      ['Q', 'K', 'Q'],
    ];
    expect(evaluateGrid(grid)).toBe(15);
  });
  
  it('correctly uses multiple wild symbols to complete a line', () => {
    /** @type {Grid} */
    const grid = [
      ['W', 'K', 'W'],
      ['A', 'Q', 'A'],
      ['Q', 'A', 'Q'],
    ];
    expect(evaluateGrid(grid)).toBe(10);
  });

  it('pays for a line of all wild symbols as the highest symbol', () => {
    /** @type {Grid} */
    const grid = [
      ['W', 'W', 'W'],
      ['A', 'K', 'Q'],
      ['Q', 'A', 'K'],
    ];
    expect(evaluateGrid(grid)).toBe(15);
  });

  it('sums the payouts of multiple winning lines', () => {
    /** @type {Grid} */
    const grid = [
      ['Q', 'Q', 'Q'], // 5
      ['K', 'K', 'K'], // 10
      ['A', 'W', 'A'], // 15
    ];
    expect(evaluateGrid(grid)).toBe(30);
  });
  
  it('returns 0 for a line with two matching symbols and no wild', () => {
    /** @type {Grid} */
    const grid = [
      ['A', 'A', 'Q'],
      ['K', 'Q', 'K'],
      ['Q', 'K', 'A'],
    ];
    expect(evaluateGrid(grid)).toBe(0);
  });

  it('correctly evaluates wins on different rows', () => {
    /** @type {Grid} */
    const grid_top_row = [
      ['A', 'A', 'A'],
      ['Q', 'K', 'Q'],
      ['K', 'Q', 'K'],
    ];
    /** @type {Grid} */
    const grid_middle_row = [
        ['Q', 'K', 'Q'],
        ['A', 'A', 'A'],
        ['K', 'Q', 'K'],
    ];
    /** @type {Grid} */
    const grid_bottom_row = [
        ['Q', 'K', 'Q'],
        ['K', 'Q', 'K'],
        ['A', 'A', 'A'],
    ];
    expect(evaluateGrid(grid_top_row)).toBe(15);
    expect(evaluateGrid(grid_middle_row)).toBe(15);
    expect(evaluateGrid(grid_bottom_row)).toBe(15);
  });
});
