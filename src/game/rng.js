/**
 * A custom error class to signal failures in the RNG generator.
 * This allows the FSM to catch a specific error type and transition to an ERROR state.
 */
export class RngError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RngError';
  }
}

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Creates a seeded pseudo-random number generator (PRNG).
 * This ensures that for a given seed, the sequence of numbers is deterministic,
 * which is crucial for reproducible testing and potentially for resolving game state.
 *
 * @param {number} seed The initial seed for the random number generator.
 * @param {() => number} [generator=mulberry32(seed)] The underlying PRNG function.
 * @returns {() => number} A function that returns a new random number in [0, 1) each time it's called.
 * @throws {RngError} If the internal generator produces a value that is not a number (NaN) or is outside the valid [0, 1) range.
 */
export function createRng(seed, generator = mulberry32(seed)) {
  if (typeof seed !== 'number' || !Number.isFinite(seed)) {
    throw new RngError(`Invalid seed: ${seed}. Seed must be a finite number.`);
  }

  return function () {
    const value = generator();

    if (isNaN(value) || value < 0 || value >= 1) {
      // §5.6 RNG fails closed.
      throw new RngError(
        `RNG produced an invalid value: ${value}. This is a critical failure.`,
      );
    }

    return value;
  };
}
