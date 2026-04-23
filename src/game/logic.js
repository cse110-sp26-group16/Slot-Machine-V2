export class LogicError extends Error {
  constructor(message) {
    super(message);
    this.name = 'LogicError';
  }
}

export function calculateBalance(balance, stake) {
  if (typeof balance !== 'number' || typeof stake !== 'number') {
    throw new LogicError('Non-numeric values provided to calculateBalance');
  }

  if (stake < 0) {
    throw new LogicError('Stake cannot be negative');
  }

  return balance - stake;
}

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
}Q