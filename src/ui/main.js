import { createFsm } from '../game/fsm.js';
import { createRng } from '../game/rng.js';
import { evaluateGrid } from '../game/payline.js';
import { drawGrid } from '../game/grid.js';
// Modular logic imports
import { 
    calculateBalance, 
    resolveSpin, 
    adjustBetAmount, 
    calculateJackpotIncrement,
    togglePreference 
} from '../game/logic.js';

document.addEventListener('DOMContentLoaded', () => {
    // Game constants
    const REEL_STRIPS = [
        ['AI', 'ML', 'RAM', 'IDE', 'SYS', 'GPU', 'NET', 'BTC', 'ROI', 'AI', 'ML', 'RAM'],
        ['IDE', 'SYS', 'GPU', 'NET', 'BTC', 'ROI', 'AI', 'ML', 'RAM', 'IDE', 'SYS', 'GPU'],
        ['AI', 'ML', 'RAM', 'IDE', 'SYS', 'GPU', 'NET', 'BTC', 'ROI', 'W', 'W', 'W'],
    ];
    const SVG_NS = 'http://www.w3.org/2000/svg';

    // DOM Elements
    const muteToggleButton = document.getElementById('mute-toggle');
    const leverHandle = document.getElementById('spin-lever');
    const leverTrack = document.getElementById('lever-track');
    const paytableButton = document.getElementById('paytable-button');
    const settingsButton = document.getElementById('settings-button');
    const infoModal = document.getElementById('info-modal');
    const closeModalButton = document.getElementById('close-modal-button');
    const settingsMenu = document.getElementById('settings-menu');
    const toggleAnimationsButton = document.getElementById('toggle-animations-button');
    const body = document.body;
    const balanceElement = document.getElementById('balance');
    const betElement = document.getElementById('current-bet');
    const lastWinElement = document.getElementById('last-win');
    const reelsContainer = document.querySelector('.reels');
    const statusMessageElement = document.getElementById('status-message');
    const jackpotCounterElement = document.querySelector('#jackpot-counter span');
    const winLoseMessageElement = document.getElementById('win-lose-message');

    // Game State
    const gameState = {
        fsm: createFsm(),
        balance: 1000,
        bet: 10,
        lastWin: 0,
        rng: createRng(Date.now()),
        currentSpinResult: null,
        isMuted: false,
        animationsEnabled: true
    };

    /**
     * Build a single reel tile containing an SVG icon.
     */
    function createReelElement(symbol) {
        const reel = document.createElement('div');
        reel.className = 'reel';
        const svg = document.createElementNS(SVG_NS, 'svg');
        svg.setAttribute('class', 'reel-icon');
        svg.setAttribute('viewBox', '0 0 100 100');
        const use = document.createElementNS(SVG_NS, 'use');
        use.setAttribute('href', `#sym-${symbol.toLowerCase()}`);
        svg.appendChild(use);
        reel.appendChild(svg);
        return reel;
    }

    /**
     * Centralized balance update that triggers UI changes.
     */
    function updateBalance(newBalance) {
        gameState.balance = newBalance;
        balanceElement.textContent = newBalance;
        updateLeverState();
    }

    /**
     * Requirement for Story 5: Spin is only allowed if balance covers the bet.
     */
    function canPullLever() {
        return gameState.fsm.canModifyBet() && gameState.balance >= gameState.bet;
    }

    /**
     * Updates lever visual state and accessibility attributes.
     */
    function updateLeverState() {
        if (!leverHandle) {return;}
        leverHandle.setAttribute('aria-disabled', String(!canPullLever()));
    }

    /**
     * Core spin handler using Story 1 deduction logic.
     */
    function handleSpin() {
        if (!canPullLever()) {return;}

        reelsContainer.classList.remove('reels-stopped');
        winLoseMessageElement.textContent = '';
        
        // FSM Transition
        gameState.fsm.beginSpin();
        
        // Story 1: Use modular logic for initial deduction
        updateBalance(calculateBalance(gameState.balance, gameState.bet));
        
        statusMessageElement.textContent = 'Inference in progress...';
        updateLeverState();

        const grid = drawGrid(REEL_STRIPS, gameState.rng);
        const payout = evaluateGrid(grid) * gameState.bet;
        gameState.currentSpinResult = { grid, payout };

        const reelCols = reelsContainer.querySelectorAll('.reel-col');
        const reelHeight = 110;
        const reelsData = [];

        reelCols.forEach((col, colIndex) => {
            const finalGridCol = [grid[0][colIndex], grid[1][colIndex], grid[2][colIndex]];
            const newReel = Array.from({ length: 5 }, () => REEL_STRIPS[colIndex]).flat().concat(finalGridCol);
            col.innerHTML = '';
            newReel.forEach(symbol => col.appendChild(createReelElement(symbol)));
            
            const finalTranslateY = -(newReel.length - 3) * reelHeight;
            reelsData.push({ col, finalTranslateY });
            col.style.transform = 'translateY(0)';
        });

        void reelsContainer.offsetHeight;
        reelsContainer.classList.add('reels-spinning');
        reelsData.forEach(data => {
            data.col.style.transform = `translateY(${data.finalTranslateY}px)`;
        });

        const firstReel = reelsContainer.querySelector('.reel-col');
        firstReel.addEventListener('transitionend', handleSpinEnd, { once: true });
    }

    /**
     * Resolves results using Story 2 & 4 satirical messaging.
     */
    function handleSpinEnd() {
        if (gameState.fsm.state !== 'SPINNING') {return;}
        gameState.fsm.beginResolve();

        const { grid, payout } = gameState.currentSpinResult;
        reelsContainer.classList.remove('reels-spinning');
        reelsContainer.classList.add('reels-stopped');

        const reelCols = reelsContainer.querySelectorAll('.reel-col');
        reelCols.forEach((col, colIndex) => {
            const finalGridCol = [grid[0][colIndex], grid[1][colIndex], grid[2][colIndex]];
            col.innerHTML = '';
            finalGridCol.forEach(symbol => col.appendChild(createReelElement(symbol)));
            col.style.transform = 'translateY(0px)';
        });

        // Use resolveSpin for math and Story 4 satirical messages
        const resolution = resolveSpin(gameState.balance, 0, payout);

        if (payout > 0) {
            winLoseMessageElement.textContent = 'WIN';
            gameState.lastWin = payout;
            lastWinElement.textContent = payout;
        } else {
            winLoseMessageElement.textContent = 'LOSE';
        }
        
        // Display result message from verified logic
        statusMessageElement.textContent = resolution.message; 
        updateBalance(resolution.newBalance);

        gameState.fsm.finishResolve();
        updateLeverState();
    }

    /**
     * Progressive jackpot using verified modular increment.
     */
    function updateJackpot() {
        if (!jackpotCounterElement) {return;}
        const currentValue = parseInt(jackpotCounterElement.textContent.replace(/,/g, ''), 10);
        const newValue = calculateJackpotIncrement(currentValue);
        jackpotCounterElement.textContent = newValue.toLocaleString();
    }

    /**
     * Bet adjustment using verified bounds logic.
     */
    function adjustBet(amount) {
        if (!gameState.fsm.canModifyBet()) {return;}
        gameState.bet = adjustBetAmount(gameState.bet, amount);
        betElement.textContent = gameState.bet;
        updateLeverState();
    }

    // UI Control Listeners
    muteToggleButton?.addEventListener('click', () => {
        gameState.isMuted = togglePreference(gameState.isMuted); // Use modular toggle
        muteToggleButton.setAttribute('aria-pressed', String(gameState.isMuted));
    });

    toggleAnimationsButton?.addEventListener('click', () => {
        gameState.animationsEnabled = togglePreference(gameState.animationsEnabled);
        body.classList.toggle('animations-disabled', !gameState.animationsEnabled);
        toggleAnimationsButton.setAttribute('aria-pressed', String(gameState.animationsEnabled));
    });

    document.getElementById('increase-bet')?.addEventListener('click', () => adjustBet(5));
    document.getElementById('decrease-bet')?.addEventListener('click', () => adjustBet(-5));

    // Lever implementation
    if (leverHandle && leverTrack) {
        let dragPointerId = null;
        let dragStartY = 0;
        let currentPull = 0;

        leverHandle.addEventListener('pointerdown', (e) => {
            if (!canPullLever()) {return;}
            dragPointerId = e.pointerId;
            dragStartY = e.clientY;
            leverTrack.classList.add('is-dragging');
            leverHandle.setPointerCapture(e.pointerId);
        });

        leverHandle.addEventListener('pointermove', (e) => {
            if (e.pointerId !== dragPointerId) {return;}
            const dragMaxTravel = leverTrack.clientHeight - leverHandle.clientHeight - 8;
            currentPull = Math.max(0, Math.min(1, (e.clientY - dragStartY) / dragMaxTravel));
            leverTrack.style.setProperty('--pull', String(currentPull));
        });

        leverHandle.addEventListener('pointerup', (e) => {
            if (e.pointerId !== dragPointerId) {return;}
            dragPointerId = null;
            leverTrack.classList.remove('is-dragging');
            if (leverHandle.hasPointerCapture(e.pointerId)) {
                leverHandle.releasePointerCapture(e.pointerId);
            }
            if (currentPull >= 1) {handleSpin();}
            leverTrack.style.setProperty('--pull', '0');
            currentPull = 0;
        });
    }

    // Modal & Menu Logic
    paytableButton?.addEventListener('click', () => infoModal.hidden = !infoModal.hidden);
    closeModalButton?.addEventListener('click', () => infoModal.hidden = true);
    settingsButton?.addEventListener('click', () => {
        const expanded = settingsButton.getAttribute('aria-expanded') === 'true';
        settingsButton.setAttribute('aria-expanded', String(!expanded));
        settingsMenu.hidden = !settingsMenu.hidden;
    });

    // Final initialization
    updateLeverState();
    if (jackpotCounterElement) {setInterval(updateJackpot, 1000);}
});