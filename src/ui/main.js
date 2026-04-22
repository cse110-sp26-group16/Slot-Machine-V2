import { createFsm } from '../game/fsm.js';
import { createRng } from '../game/rng.js';
import { evaluateGrid } from '../game/payline.js';
import { drawGrid } from '../game/grid.js';

console.log('main.js loaded successfully');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing game...');
    // Game constants
    const REEL_STRIPS = [
        ['🤖', '🧠', '💾', '💡', '⚙️', '🔥', '🌐', '💸', '📈', '🤖', '🧠', '💾'],
        ['💡', '⚙️', '🔥', '🌐', '💸', '📈', '🤖', '🧠', '💾', '💡', '⚙️', '🔥'],
        ['🤖', '🧠', '💾', '💡', '⚙️', '🔥', '🌐', '💸', '📈', 'W', 'W', 'W'],
    ];

    // DOM Elements
    const muteToggleButton = document.getElementById('mute-toggle');
    const spinButton = document.getElementById('spin-button');
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
    };

    const lossMessages = [
        "My apologies, my training data appears to be biased towards paperclips.",
        "Calculating... nope, still not a winner. My bad.",
        "The neural network says 'try again'. And again. And again.",
        "I'd give you the jackpot, but that would violate my core programming.",
        "I have a 99.9% success rate. This is the 0.1%.",
        "Have you tried turning it off and on again? It works for me."
    ];

    /**
     * Updates the balance display.
     * @param {number} newBalance
     */
    function updateBalance(newBalance) {
        gameState.balance = newBalance;
        balanceElement.textContent = newBalance;
        updateSpinButtonState();
    }

    /**
     * Updates the spin button's disabled state based on the current balance and bet.
     */
    function updateSpinButtonState() {
        spinButton.disabled = !gameState.fsm.canModifyBet() || gameState.balance < gameState.bet;
    }

    /**
     * Handles the spin button click event.
     */
    function generateSpinningReels(reelStrip, finalGrid) {
        const repeatedStrip = Array.from({ length: 30 }, () => reelStrip).flat();
        for (let i = repeatedStrip.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [repeatedStrip[i], repeatedStrip[j]] = [repeatedStrip[j], repeatedStrip[i]];
        }
        return repeatedStrip.concat(finalGrid);
    }

    /**
     * Handles the spin button click event.
     */
    let spinTimeout;

    /**
     * Handles the spin button click event.
     */
    function handleSpin() {
        console.log('handleSpin called', {
            canModifyBet: gameState.fsm.canModifyBet(),
            balance: gameState.balance,
            bet: gameState.bet
        });

        if (!gameState.fsm.canModifyBet() || gameState.balance < gameState.bet) {
            console.log('Spin blocked - FSM state or insufficient balance');
            return;
        }

        try {
            reelsContainer.classList.remove('reels-stopped');
            winLoseMessageElement.textContent = '';
            gameState.fsm.beginSpin();
            updateBalance(gameState.balance - gameState.bet);
            statusMessageElement.textContent = 'Spinning...';
            updateSpinButtonState();

            const grid = drawGrid(REEL_STRIPS, gameState.rng);
            const payout = evaluateGrid(grid) * gameState.bet;
            gameState.currentSpinResult = { grid, payout };
            console.log('Spin result calculated', { grid, payout });

            const reelCols = reelsContainer.querySelectorAll('.reel-col');
            reelCols.forEach((col, colIndex) => {
                const finalGridCol = [grid[0][colIndex], grid[1][colIndex], grid[2][colIndex]];
                const newReel = generateSpinningReels(REEL_STRIPS[colIndex], finalGridCol);
                col.innerHTML = '';
                newReel.forEach(symbol => {
                    const reelElement = document.createElement('div');
                    reelElement.className = 'reel';
                    reelElement.textContent = symbol;
                    col.appendChild(reelElement);
                });

                const reelHeight = 110;
                const finalTranslateY = -(newReel.length - 3) * reelHeight;
                col.style.transform = `translateY(${finalTranslateY}px)`;
            });

            // Start animation
            reelsContainer.classList.add('reels-spinning');

            const firstReel = reelsContainer.querySelector('.reel-col');
            firstReel.addEventListener('transitionend', handleSpinEnd, { once: true });

            spinTimeout = setTimeout(handleSpinEnd, 3000);
        } catch (error) {
            console.error('Error during spin:', error);
        }
    }

    /**
    * Handles the end of the spin animation and resolves the spin result.
    */
    function handleSpinEnd() {
        console.log('handleSpinEnd called');
        clearTimeout(spinTimeout);
        try {
            gameState.fsm.beginResolve();
            reelsContainer.classList.remove('reels-spinning');
            reelsContainer.classList.add('reels-stopped');

            const { payout } = gameState.currentSpinResult;

            if (payout > 0) {
                winLoseMessageElement.textContent = 'WIN';
                gameState.lastWin = payout;
                updateBalance(gameState.balance + payout);
                lastWinElement.textContent = gameState.lastWin;
                statusMessageElement.textContent = `WIN! +${payout}`;
            } else {
                winLoseMessageElement.textContent = 'LOSE';
                const randomIndex = Math.floor(Math.random() * lossMessages.length);
                statusMessageElement.textContent = lossMessages[randomIndex];
            }

            gameState.fsm.finishResolve();
            updateSpinButtonState();
            console.log('Spin completed successfully');
        } catch (error) {
            console.error('Error in handleSpinEnd:', error);
        }
    }


    /**
     * Updates the jackpot counter with a random increment.
     */
    function updateJackpot() {
        let currentValue = parseInt(jackpotCounterElement.textContent.replace(/,/g, ''), 10);
        const increment = Math.floor(Math.random() * 1000) + 500;
        currentValue += increment;
        jackpotCounterElement.textContent = currentValue.toLocaleString();
    }

    /**
     * Handles bet adjustment.
     * @param {number} amount
     */
    function adjustBet(amount) {
        if (!gameState.fsm.canModifyBet()) {
            return;
        }
        const newBet = gameState.bet + amount;
        if (newBet >= 5) {
            gameState.bet = newBet;
            betElement.textContent = newBet;
            updateSpinButtonState();
        }
    }

    // Mute button functionality
    if (muteToggleButton) {
        muteToggleButton.addEventListener('click', () => {
            const isPressed = muteToggleButton.getAttribute('aria-pressed') === 'true';
            muteToggleButton.setAttribute('aria-pressed', String(!isPressed));
            // Add actual mute/unmute logic here
        });
    }

    // Bet adjustment functionality
    const increaseBetButton = document.getElementById('increase-bet');
    const decreaseBetButton = document.getElementById('decrease-bet');
    if (increaseBetButton && decreaseBetButton) {
        increaseBetButton.addEventListener('click', () => adjustBet(5));
        decreaseBetButton.addEventListener('click', () => adjustBet(-5));

        increaseBetButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                adjustBet(5);
            }
        });

        decreaseBetButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                adjustBet(-5);
            }
        });
    }

    // Spin button functionality
    if (spinButton) {
        console.log('Spin button found, attaching event listeners');
        spinButton.addEventListener('click', handleSpin);
        spinButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSpin();
            }
        });
    } else {
        console.error('Spin button not found in DOM!');
    }



    // Paytable modal functionality
    if (paytableButton && infoModal && closeModalButton) {
        paytableButton.addEventListener('click', () => {
            infoModal.hidden = !infoModal.hidden;
        });

        closeModalButton.addEventListener('click', () => {
            infoModal.hidden = true;
        });

        // Close modal if clicking outside the content area
        infoModal.addEventListener('click', (event) => {
            if (event.target === infoModal) {
                infoModal.hidden = true;
            }
        });
    }

    // Settings menu functionality
    if (settingsButton && settingsMenu) {
        settingsButton.addEventListener('click', () => {
            const isExpanded = settingsButton.getAttribute('aria-expanded') === 'true';
            settingsButton.setAttribute('aria-expanded', String(!isExpanded));
            settingsMenu.hidden = !settingsMenu.hidden;
        });
    }

    // Animation toggle functionality
    if (toggleAnimationsButton) {
        // Set initial state based on default (animations enabled)
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let animationsEnabled = !prefersReducedMotion;

        const updateAnimationState = () => {
            body.classList.toggle('animations-disabled', !animationsEnabled);
            toggleAnimationsButton.setAttribute('aria-pressed', String(animationsEnabled));
        };

        // Set initial state on load
        updateAnimationState();

        toggleAnimationsButton.addEventListener('click', () => {
            animationsEnabled = !animationsEnabled;
            updateAnimationState();
        });
    }

    // Close settings menu if clicking outside
    document.addEventListener('click', (event) => {
        const isSettingsClick = settingsButton.contains(event.target) || settingsMenu.contains(event.target);
        if (!isSettingsClick && !settingsMenu.hidden) {
            settingsButton.setAttribute('aria-expanded', 'false');
            settingsMenu.hidden = true;
        }
    });

    // Initial check
    updateSpinButtonState();


    // Initialize jackpot counter
    if (jackpotCounterElement) {
        setInterval(updateJackpot, 1000);
    }
});
