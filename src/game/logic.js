/**
 * A custom error class to signal failures in balance or spin-resolution logic.
 * This allows callers (e.g., the FSM) to catch a specific error type and
 * transition to an ERROR state on invalid inputs.
 */
export class LogicError extends Error {
  /**
   * @param {string} message The error message.
   */
  constructor(message) {
    super(message);
    this.name = 'LogicError';
  }
}

/**
 * Deducts the stake from the current balance to produce the post-bet balance.
 *
 * @param {number} balance The player's current balance before the bet.
 * @param {number} stake The non-negative amount being wagered on the spin.
 * @returns {number} The balance after the stake has been deducted.
 * @throws {LogicError} If `balance` or `stake` is not a number, or if `stake` is negative.
 */
export function calculateBalance(balance, stake) {
  if (typeof balance !== 'number' || typeof stake !== 'number') {
    throw new LogicError('Non-numeric values provided to calculateBalance');
  }

  if (stake < 0) {
    throw new LogicError('Stake cannot be negative');
  }

  return balance - stake;
}

/**
 * Resolves a completed spin by applying the stake and winnings to the balance
 * and producing a player-facing message. Losses (winnings === 0) yield one of
 * several randomly chosen satirical "hallucination" messages.
 *
 * @param {number} balance The player's current balance before this spin.
 * @param {number} stake The amount wagered on the spin.
 * @param {number} winnings The non-negative amount awarded by the spin (0 for a loss).
 * @returns {{ newBalance: number, message: string }} The updated balance and the player-facing result message.
 * @throws {LogicError} If any parameter is not a number, or if `winnings` is negative.
 */
export function resolveSpin(balance, stake, winnings) {
  if (typeof balance !== 'number' || typeof stake !== 'number' || typeof winnings !== 'number') {
    throw new LogicError('All spin resolution parameters must be numeric');
  }

  if (winnings < 0) {
    throw new LogicError('Winnings cannot be a negative value');
  }

  const newBalance = balance - stake + winnings;

  let message = "";

  if (winnings > 0) {
    message = `Inference successful. You've been awarded ${winnings} tokens!`;
  } else {
    const hallucinations = [
      "Error: The model hallucinated a payout. Reality check: 0 tokens.",
      "Techbro pivot: This loss is actually a long-term growth metric.",
      "Simulation collapsed. Tokens diverted to GPU maintenance.",
      "Inference failed. Strategy pivot required for next sprint."
    ];
    
    const randomIndex = Math.floor(Math.random() * hallucinations.length);
    message = hallucinations[randomIndex];
  }

  return {
    newBalance,
    message
  };
}