import { expect, it, describe } from 'vitest'

import { calculateBalance, resolveSpin } from '../src/game/logic';

describe('AI Slot Machine Core Gameplay Loop Test', () => {
    

    // Story Test 1
    // AAA Pattern; Arrange, Act, and Assert

    it('how much at stake should be deducted from the balance when the spin starts', () => {
        const balance = 100;
        const stake = 10;

        const expectedResult = 90;

        const actualResult = calculateBalance(balance, stake);


        expect(actualResult).toBe(expectedResult);
    })


    // Story Test 2
    it('the display should mathematically display the correct win message', () => {
        const balance = 100;
        const stake = 10;

        const winnings = 50;

        const expectedBalance = 140;
        const expectedMessage = "50"

        const actualResult = resolveSpin(balance, stake, winnings);

        expect(actualResult.newBalance).toBe(expectedBalance);

        expect(actualResult.message).toContain(expectedMessage);


    })

    // Story Test 4
    it('show that there is satirical "AI Hallucination" messages on a loss', () => {
        const balance = 100;
        const stake = 10;

        const winning = 0;
        const expectedBalance = (balance - stake) + winning;

        const keyThemeWords = ["hallucinated", "techbro"];

        
        const actualResult = resolveSpin(balance, stake, winning);

        expect(actualResult.newBalance).toBe(expectedBalance)
        
        const containsThemeWord = keyThemeWords.some(word =>
            actualResult.message.toLowerCase().includes(word)
        );


        expect(containsThemeWord).toBe(true);



    })
    
})