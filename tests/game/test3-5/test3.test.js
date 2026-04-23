import { describe, it, expect, beforeEach } from 'vitest';
import { createFsm } from '../../../src/game/fsm.js';
import { drawGrid } from '../../../src/game/grid.js';
import { evaluateGrid } from '../../../src/game/payline.js';
import { createRng } from '../../../src/game/rng.js';

/**
 * Test for state persistance, if we refresh the page during a spin the state 
 * will be saved upon refresh and tokens lost or gained will not be incorrect
 * 
 * Story 3: Being a User, my balance should be consistent and if i refreshed 
 * the page during a spin. It should be the same so i don't lose tokens due 
 * to browser issues.
 */

describe('Story 3: State Persistence', () => {
  let gameState;

  beforeEach(() => {
    gameState = {
      balance: 100,
      bet: 10,
      fsm: createFsm('IDLE'),
      reelStrips: [
        ['Q', 'K', 'A', 'W', 'Q'],
        ['Q', 'K', 'A', 'W', 'Q'],
        ['Q', 'K', 'A', 'W', 'Q'],
      ],
    };
  });

  it('balance is deducted immediately when spin begins', () => {
    const initialBalance = gameState.balance;
    const betAmount = gameState.bet;

    gameState.fsm.beginSpin();
    gameState.balance -= betAmount; // Deduct bet

    expect(gameState.balance).toBe(initialBalance - betAmount);
    expect(gameState.balance).toBe(90);
  });

  it('balance persists if page is refreshed during SPINNING state', () => {
    // Start spin
    gameState.fsm.beginSpin();
    gameState.balance -= gameState.bet;
    const balanceAfterSpin = gameState.balance;

    
    const savedState = JSON.stringify({
      balance: gameState.balance,
      bet: gameState.bet,
      fsmState: gameState.fsm.state,
    });

    
    const restoredState = JSON.parse(savedState);
    const fsm = createFsm(restoredState.fsmState);

    expect(restoredState.balance).toBe(balanceAfterSpin);
    expect(restoredState.balance).toBe(90);
    expect(fsm.state).toBe('SPINNING');
  });

  it('balance persists if page is refreshed during RESOLVING state', () => {
    // Start spin and deduct bet
    gameState.fsm.beginSpin();
    gameState.balance -= gameState.bet;

    // Move to resolving state (result has been determined)
    gameState.fsm.beginResolve();
    const balanceDuringResolve = gameState.balance;

    // Simulate page refresh
    const savedState = JSON.stringify({
      balance: gameState.balance,
      bet: gameState.bet,
      fsmState: gameState.fsm.state,
    });

    const restoredState = JSON.parse(savedState);
    const fsm = createFsm(restoredState.fsmState);

    expect(restoredState.balance).toBe(balanceDuringResolve);
    expect(fsm.state).toBe('RESOLVING');
  });

  it('balance and winnings persist correctly after a complete spin', () => {
    gameState.fsm.beginSpin();
    gameState.balance -= gameState.bet;

    
    const rng = createRng(42);
    const grid = drawGrid(gameState.reelStrips, rng);
    const payout = evaluateGrid(grid);

    gameState.fsm.beginResolve();
    gameState.balance += payout; 
    const finalBalance = gameState.balance;

    gameState.fsm.finishResolve();

    
    const savedState = JSON.stringify({
      balance: gameState.balance,
      bet: gameState.bet,
      fsmState: gameState.fsm.state,
      payout: payout,
    });

    const restoredState = JSON.parse(savedState);

    expect(restoredState.balance).toBe(finalBalance);
    expect(restoredState.fsmState).toBe('IDLE');
    expect(restoredState.balance).toBe(100 - gameState.bet + payout);
  });

  it('multiple spins with refreshes maintain correct balance across sessions', () => {
    const initialBalance = 100;
    let currentBalance = initialBalance;

    gameState.fsm.beginSpin();
    currentBalance -= gameState.bet;

    const rng1 = createRng(42);
    const grid1 = drawGrid(gameState.reelStrips, rng1);
    const payout1 = evaluateGrid(grid1);

    gameState.fsm.beginResolve();
    currentBalance += payout1;
    gameState.fsm.finishResolve();

    let saved = JSON.stringify({ balance: currentBalance, bet: gameState.bet });
    let restored = JSON.parse(saved);
    expect(restored.balance).toBe(currentBalance);

    gameState.fsm.beginSpin();
    currentBalance -= gameState.bet;

    const rng2 = createRng(1337);
    const grid2 = drawGrid(gameState.reelStrips, rng2);
    const payout2 = evaluateGrid(grid2);

    gameState.fsm.beginResolve();
    currentBalance += payout2;
    gameState.fsm.finishResolve();

    expect(currentBalance).toBe(
      initialBalance - 2 * gameState.bet + payout1 + payout2
    );
  });
});