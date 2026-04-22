/** @typedef {import('./grid.js').Grid} Grid */

const PAYOUTS = {
  Q: 5,
  K: 10,
  A: 15,
};

const SYMBOLS = Object.keys(PAYOUTS);
const WILD = 'W';

/**
 * Checks a single line for a win.
 * @param {string[]} line The line to check.
 * @returns {number} The payout for the line, or 0 if it's not a winning line.
 */
function evaluateLine(line) {
  const nonWildSymbol = line.find(symbol => symbol !== WILD);

  // If the line is all wilds, it pays as the highest symbol.
  const checkSymbol = nonWildSymbol || 'A';

  if (SYMBOLS.includes(checkSymbol)) {
    const isWinningLine = line.every(
      symbol => symbol === checkSymbol || symbol === WILD
    );
    if (isWinningLine) {
      return PAYOUTS[checkSymbol];
    }
  }

  return 0;
}

/**
 * Evaluates a 3x3 grid and returns the total payout.
 * @param {Grid} grid The 3x3 grid to evaluate.
 * @returns {number} The total payout.
 */
export function evaluateGrid(grid) {
  let totalPayout = 0;

  // Paylines are the 3 horizontal rows
  const paylines = [
    grid[0], // Top row
    grid[1], // Middle row
    grid[2], // Bottom row
  ];

  for (const line of paylines) {
    totalPayout += evaluateLine(line);
  }

  return totalPayout;
}
