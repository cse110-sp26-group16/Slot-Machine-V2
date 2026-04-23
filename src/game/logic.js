export class LogicError extends Error {
  constructor(message) {
    super(message);
    this.name = 'LogicError';
  }
}

// Story 1 & 2 Functions
export function calculateBalance(balance, stake) {
  if (typeof balance !== 'number' || typeof stake !== 'number') {
    throw new LogicError('Non-numeric values provided to calculateBalance');
  }
  if (stake < 0) {throw new LogicError('Stake cannot be negative');}
  return balance - stake;
}

export function resolveSpin(balance, stake, winnings) {
  if (typeof balance !== 'number' || typeof stake !== 'number' || typeof winnings !== 'number') {
    throw new LogicError('All spin resolution parameters must be numeric');
  }
  if (winnings < 0) {throw new LogicError('Winnings cannot be a negative value');}
  const newBalance = balance - stake + winnings;
  const message = winnings > 0 ? `Win! +${winnings}` : "Error: The model hallucinated a payout.";
  return { newBalance, message };
}

// Integrated Feature Functions
export function calculateJackpotIncrement(currentJackpot) {
  return currentJackpot + (Math.floor(Math.random() * 1000) + 500);
}

export function adjustBetAmount(currentBet, adjustment, minBet = 5) {
  const newBet = currentBet + adjustment;
  return newBet >= minBet ? newBet : currentBet;
}

export function togglePreference(currentState) {
  return !currentState;
}