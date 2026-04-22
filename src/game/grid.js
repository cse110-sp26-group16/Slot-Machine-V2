/** @typedef {string[][]} ReelStrips */ // exactly 3 strips, one per reel (column)
/** @typedef {string[][]} Grid */ // 3x3, grid[row][col], row 0 is the top row
export class GridError extends Error {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message);
    this.name = 'GridError';
  }
}
/**
 * Draws a 3x3 grid by picking a random starting index on each reel
 * and taking 3 consecutive symbols, wrapping around the strip.
 * @param {ReelStrips} reelStrips
 * @param {() => number} rng  Returns a number in [0, 1).
 * @returns {Grid}
 * @throws {GridError} If `reelStrips` is not an array of 3 arrays, each with at least 3 symbols.
 */
export function drawGrid(reelStrips, rng) {
  if (
    !Array.isArray(reelStrips) ||
    reelStrips.length !== 3 ||
    !reelStrips.every(strip => Array.isArray(strip) && strip.length >= 3)
  ) {
    throw new GridError(
      'reelStrips must be an array of exactly 3 arrays, each of length >= 3'
    );
  }

  const grid = [
    [],
    [],
    []
  ];
  const columns = [];

  for (let i = 0; i < 3; i++) {
    const strip = reelStrips[i];
    const startIndex = Math.floor(rng() * strip.length);
    const column = [];
    for (let j = 0; j < 3; j++) {
      column.push(strip[(startIndex + j) % strip.length]);
    }
    columns.push(column);
  }

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      grid[row][col] = columns[col][row];
    }
  }

  return grid;
}
