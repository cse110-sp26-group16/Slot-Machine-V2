document.addEventListener('DOMContentLoaded', () => {
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
    const reelsContainer = document.querySelector('.reels');
    const statusMessageElement = document.getElementById('status-message');
    const jackpotCounterElement = document.querySelector('#jackpot-counter span');

    const lossMessages = [
        "My apologies, my training data appears to be biased towards paperclips.",
        "Calculating... nope, still not a winner. My bad.",
        "The neural network says 'try again'. And again. And again.",
        "I'd give you the jackpot, but that would violate my core programming.",
        "I have a 99.9% success rate. This is the 0.1%.",
        "Have you tried turning it off and on again? It works for me."
    ];

    /**
     * Updates the spin button's disabled state based on the current balance and bet.
     */
    function updateSpinButtonState() {
        const balance = parseInt(balanceElement.textContent, 10);
        const bet = parseInt(betElement.textContent, 10);
        spinButton.disabled = balance < bet || reelsContainer.classList.contains('reels-spinning');
    }

    /**
     * Handles the spin button click event.
     */
    function handleSpin() {
        if (reelsContainer.classList.contains('reels-spinning')) {
            return; // Already spinning
        }

        reelsContainer.classList.add('reels-spinning');
        statusMessageElement.textContent = 'Spinning...';
        spinButton.disabled = true;

        // Stop the spinning after a random duration
        setTimeout(() => {
            reelsContainer.classList.remove('reels-spinning');
            
            // For now, assume a loss and show a witty message
            const randomIndex = Math.floor(Math.random() * lossMessages.length);
            statusMessageElement.textContent = lossMessages[randomIndex];

            updateSpinButtonState(); // Re-evaluate button state
        }, 3000); // Spin for 3 seconds
    }

    /**
     * Updates the jackpot counter with a random increment.
     */
    function updateJackpot() {
        let currentValue = parseInt(jackpotCounterElement.textContent.replace(/,/g, ''), 10);
        const increment = Math.floor(Math.random() * 10) + 1;
        currentValue += increment;
        jackpotCounterElement.textContent = currentValue.toLocaleString();
    }

    // Mute button functionality
    if (muteToggleButton) {
        muteToggleButton.addEventListener('click', () => {
            const isPressed = muteToggleButton.getAttribute('aria-pressed') === 'true';
            muteToggleButton.setAttribute('aria-pressed', String(!isPressed));
            // Add actual mute/unmute logic here
        });
    }

    // Spin button functionality
    if (spinButton) {
        spinButton.addEventListener('click', handleSpin);
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

    // Disable spin button if balance is too low
    if (balanceElement && betElement && spinButton) {
        const observer = new MutationObserver(updateSpinButtonState);

        observer.observe(balanceElement, { childList: true, subtree: true });
        observer.observe(betElement, { childList: true, subtree: true });

        // Initial check
        updateSpinButtonState();
    }

    // Initialize jackpot counter
    if (jackpotCounterElement) {
        setInterval(updateJackpot, 1000);
    }
});
