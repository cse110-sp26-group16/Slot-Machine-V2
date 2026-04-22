import { describe, it, expect, vi } from 'vitest';
import { drawGrid, GridError } from '../../src/game/grid.js';
import { createRng } from '../../src/game/rng.js';

describe('drawGrid', () => {
  it('is deterministic for a given seeded RNG', () => {
    const reelStrips = [
      ['A', 'B', 'C', 'D', 'E'],
      ['F', 'G', 'H', 'I', 'J'],
      ['K', 'L', 'M', 'N', 'O'],
    ];
    const rng1 = createRng(12345);
    const rng2 = createRng(12345);
    const grid1 = drawGrid(reelStrips, rng1);
    const grid2 = drawGrid(reelStrips, rng2);
    expect(grid1).toEqual(grid2);
  });

  it('returns a 3x3 grid with string cells from reel strips', () => {
    const reelStrips = [
      ['A', 'B', 'C', 'D'],
      ['X', 'Y', 'Z'],
      ['1', '2', '3', '4', '5'],
    ];
    const rng = createRng(12345);
    const grid = drawGrid(reelStrips, rng);

    expect(grid).toBeInstanceOf(Array);
    expect(grid.length).toBe(3);
    grid.forEach(row => {
      expect(row).toBeInstanceOf(Array);
      expect(row.length).toBe(3);
    });

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        expect(typeof grid[row][col]).toBe('string');
        expect(reelStrips[col].includes(grid[row][col])).toBe(true);
      }
    }
  });

  it('wraps around the reel strip correctly', () => {
    const reelStrips = [
      ['A', 'B', 'C'],
      ['A', 'B', 'C'],
      ['A', 'B', 'C'],
    ];
    const rng = vi.fn().mockReturnValue(0.99);
    const grid = drawGrid(reelStrips, rng);
    
    // startIndex = Math.floor(0.99 * 3) = 2
    // column should be [strip[2], strip[0], strip[1]] = ['C', 'A', 'B']
    for (let col = 0; col < 3; col++) {
      expect(grid[0][col]).toBe('C');
      expect(grid[1][col]).toBe('A');
      expect(grid[2][col]).toBe('B');
    }
  });

  it('maintains reel independence', () => {
    const reelStrips = [
      ['A', 'B', 'C', 'D'],
      ['X', 'Y', 'Z'],
      ['1', '2', '3', '4', '5'],
    ];
    const rng = createRng(54321);
    const grid = drawGrid(reelStrips, rng);

    // Check column 0
    for (let row = 0; row < 3; row++) {
      expect(['A', 'B', 'C', 'D']).toContain(grid[row][0]);
    }
    // Check column 1
    for (let row = 0; row < 3; row++) {
      expect(['X', 'Y', 'Z']).toContain(grid[row][1]);
    }
    // Check column 2
    for (let row = 0; row < 3; row++) {
      expect(['1', '2', '3', '4', '5']).toContain(grid[row][2]);
    }
  });

  describe('input validation', () => {
    const rng = () => 0.5;

    it('throws GridError for null reelStrips', () => {
      expect(() => drawGrid(null, rng)).toThrow(GridError);
    });

    it('throws GridError for less than 3 reels', () => {
      const reelStrips = [['A', 'B', 'C'], ['A', 'B', 'C']];
      expect(() => drawGrid(reelStrips, rng)).toThrow(GridError);
    });

    it('throws GridError for more than 3 reels', () => {
      const reelStrips = [['A', 'B', 'C'], ['A', 'B', 'C'], ['A', 'B', 'C'], ['A', 'B', 'C']];
      expect(() => drawGrid(reelStrips, rng)).toThrow(GridError);
    });
    
    it('throws GridError if a strip is not an array', () => {
        const reelStrips = [['A', 'B', 'C'], ['A', 'B', 'C'], 'not-an-array'];
        expect(() => drawGrid(reelStrips, rng)).toThrow(GridError);
    });

    it('throws GridError for a reel strip shorter than 3 symbols', () => {
      const reelStrips = [['A', 'B'], ['A', 'B', 'C'], ['A', 'B', 'C']];
      expect(() => drawGrid(reelStrips, rng)).toThrow(GridError);
    });
  });
});
