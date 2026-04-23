import { createFsm } from '../game/fsm.js';
import { createRng } from '../game/rng.js';
import { evaluateGrid } from '../game/payline.js';
import { drawGrid } from '../game/grid.js';

document.addEventListener('DOMContentLoaded', () => {
    // Game constants
    const REEL_STRIPS = [
        ['AI', 'ML', 'RAM', 'IDE', 'SYS', 'GPU', 'NET', 'BTC', 'ROI', 'AI', 'ML', 'RAM'],
        ['IDE', 'SYS', 'GPU', 'NET', 'BTC', 'ROI', 'AI', 'ML', 'RAM', 'IDE', 'SYS', 'GPU'],
        ['AI', 'ML', 'RAM', 'IDE', 'SYS', 'GPU', 'NET', 'BTC', 'ROI', 'W', 'W', 'W'],
    ];
    const SVG_NS = 'http://www.w3.org/2000/svg';

    /**
     * Build a single reel tile containing an SVG icon referencing the sprite sheet.
     * @param {string} symbol
     * @returns {HTMLDivElement}
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
        updateLeverState();
    }

    /**
     * Returns whether the lever can currently be pulled.
     * @returns {boolean}
     */
    function canPullLever() {
        return gameState.fsm.canModifyBet() && gameState.balance >= gameState.bet;
    }

    /**
     * Updates the lever's disabled state based on the current balance and bet.
     */
    function updateLeverState() {
        if (!leverHandle) {return;}
        leverHandle.setAttribute('aria-disabled', String(!canPullLever()));
    }

    /**
     * Handles the spin button click event.
     */
    function generateSpinningReels(reelStrip, finalGrid) {
        const repeatedStrip = Array.from({ length: 5 }, () => reelStrip).flat();
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
        if (!gameState.fsm.canModifyBet() || gameState.balance < gameState.bet) {
            return;
        }

        reelsContainer.classList.remove('reels-stopped');
        winLoseMessageElement.textContent = '';
        gameState.fsm.beginSpin();
        updateBalance(gameState.balance - gameState.bet);
        statusMessageElement.textContent = 'Spinning...';
        updateLeverState();

        const grid = drawGrid(REEL_STRIPS, gameState.rng);
        const payout = evaluateGrid(grid) * gameState.bet;
        gameState.currentSpinResult = { grid, payout };

        const reelCols = reelsContainer.querySelectorAll('.reel-col');
        const reelHeight = 110;
        const reelsData = [];

        reelCols.forEach((col, colIndex) => {
            const finalGridCol = [grid[0][colIndex], grid[1][colIndex], grid[2][colIndex]];
            const newReel = generateSpinningReels(REEL_STRIPS[colIndex], finalGridCol);
            col.innerHTML = '';
            newReel.forEach(symbol => {
                col.appendChild(createReelElement(symbol));
            });

            const finalTranslateY = -(newReel.length - 3) * reelHeight;
            reelsData.push({ col, finalTranslateY });

            // Ensure starting transform is 0 before adding transition class
            col.style.transform = 'translateY(0)';
        });

        // Force reflow to ensure the initial state is registered by the browser
        void reelsContainer.offsetHeight;

        // Start animation
        reelsContainer.classList.add('reels-spinning');

        // Apply target transforms
        reelsData.forEach(data => {
            data.col.style.transform = `translateY(${data.finalTranslateY}px)`;
        });

        const firstReel = reelsContainer.querySelector('.reel-col');
        firstReel.addEventListener('transitionend', handleSpinEnd, { once: true });

        spinTimeout = setTimeout(handleSpinEnd, 3000);
    }

    /**
    * Handles the end of the spin animation and resolves the spin result.
    */
    function handleSpinEnd() {
        if (gameState.fsm.state !== 'SPINNING') {
            return;
        }
        clearTimeout(spinTimeout);
        gameState.fsm.beginResolve();

        const { grid, payout } = gameState.currentSpinResult;

        // Stop the transition and mark as stopped
        reelsContainer.classList.remove('reels-spinning');
        reelsContainer.classList.add('reels-stopped');

        // Reset reels to show only the landed symbols at transform 0
        const reelCols = reelsContainer.querySelectorAll('.reel-col');
        reelCols.forEach((col, colIndex) => {
            const finalGridCol = [grid[0][colIndex], grid[1][colIndex], grid[2][colIndex]];
            col.innerHTML = '';
            finalGridCol.forEach(symbol => {
                col.appendChild(createReelElement(symbol));
            });
            // Explicitly reset the transform to 0 for a clean 3x3 alignment
            col.style.transform = 'translateY(0px)';
        });

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
        updateLeverState();
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
            updateLeverState();
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

    // Drag-to-spin lever
    if (leverHandle && leverTrack) {
        const PULL_THRESHOLD = 1;
        const MAX_REEL_PREVIEW_PX = 25;

        let dragPointerId = null;
        let dragStartY = 0;
        let dragMaxTravel = 0;
        let currentPull = 0;

        /**
         * Writes the current pull (0..1) to the track and nudges the reels
         * for the preview wiggle. Actual spinning is only triggered on release
         * when the lever reaches full pull.
         * @param {number} pull
         */
        function setPull(pull) {
            currentPull = Math.max(0, Math.min(1, pull));
            leverTrack.style.setProperty('--pull', String(currentPull));

            const previewOffset = -currentPull * MAX_REEL_PREVIEW_PX;
            const reelCols = reelsContainer.querySelectorAll('.reel-col');
            reelCols.forEach((col) => {
                col.style.transform = `translateY(${previewOffset}px)`;
            });
        }

        /**
         * Snaps the lever back to the top and clears the reel preview.
         */
        function resetLever() {
            setPull(0);
        }

        function onPointerDown(event) {
            if (!canPullLever()) {return;}
            dragPointerId = event.pointerId;
            dragStartY = event.clientY;
            dragMaxTravel = Math.max(
                1,
                leverTrack.clientHeight - leverHandle.clientHeight - 8,
            );
            leverTrack.classList.add('is-dragging');
            leverHandle.setPointerCapture(event.pointerId);
            event.preventDefault();
        }

        function onPointerMove(event) {
            if (event.pointerId !== dragPointerId) {return;}
            const delta = event.clientY - dragStartY;
            setPull(delta / dragMaxTravel);
        }

        function endDrag(event) {
            if (event.pointerId !== dragPointerId) {return;}
            dragPointerId = null;
            leverTrack.classList.remove('is-dragging');
            if (leverHandle.hasPointerCapture(event.pointerId)) {
                leverHandle.releasePointerCapture(event.pointerId);
            }

            if (currentPull >= PULL_THRESHOLD) {
                handleSpin();
                // Let the player see the lever at full pull for a beat,
                // then spring it back up.
                setTimeout(resetLever, 180);
            } else {
                resetLever();
            }
        }

        leverHandle.addEventListener('pointerdown', onPointerDown);
        leverHandle.addEventListener('pointermove', onPointerMove);
        leverHandle.addEventListener('pointerup', endDrag);
        leverHandle.addEventListener('pointercancel', endDrag);

        leverHandle.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter' && e.key !== ' ') {return;}
            e.preventDefault();
            if (!canPullLever()) {return;}
            setPull(1);
            handleSpin();
            setTimeout(resetLever, 180);
        });
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
    updateLeverState();


    // Initialize jackpot counter
    if (jackpotCounterElement) {
        setInterval(updateJackpot, 1000);
    }
});
