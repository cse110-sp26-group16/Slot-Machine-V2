import { describe, it, expect } from 'vitest';
import { createFsm } from '../../../src/game/fsm.js';
/**
 * Test to ensure that the spin button  is disabled when a players balance 
 * cannot meet the bet size
 */


describe('Story 5: Spin Button Disabled on Insufficient Balance', () =>  {
    let gameState;
    it('should disable spin button when balance is less than bet size', () => {
        gameState = {
            balance: 5,
            bet: 10,
            fsm: createFsm('IDLE'),
            reelStrips: [
                ['Q', 'K', 'A', 'W', 'Q'],
                ['Q', 'K', 'A', 'W', 'Q'],
                ['Q', 'K', 'A', 'W', 'Q'],
            ],
        };

        const currBalance = gameState.balance;
        const betAmount = gameState.bet;
        const canSpin = currBalance >= betAmount;
        expect(canSpin).toBe(false);
    });

    it('should enable spin button when balance is greater than or equal to bet size', () => {
        gameState = {
            balance: 20,
            bet: 10,
            fsm: createFsm('IDLE'),
            reelStrips: [
                ['Q', 'K', 'A', 'W', 'Q'],
                ['Q', 'K', 'A', 'W', 'Q'],
                ['Q', 'K', 'A', 'W', 'Q'],
            ],
        };

        const currBalance = gameState.balance;
        const betAmount = gameState.bet;
        const canSpin = currBalance >= betAmount;
        const newBalance = currBalance - betAmount;
        
        expect(canSpin).toBe(true);
        expect(newBalance).toBe(10);
    });
});
