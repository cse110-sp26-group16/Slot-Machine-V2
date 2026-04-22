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

    // Mute button functionality
    if (muteToggleButton) {
        muteToggleButton.addEventListener('click', () => {
            const isPressed = muteToggleButton.getAttribute('aria-pressed') === 'true';
            muteToggleButton.setAttribute('aria-pressed', String(!isPressed));
            // Add actual mute/unmute logic here
        });
    }

    // Spin button functionality (placeholder)
    if (spinButton) {
        spinButton.addEventListener('click', () => {
            // Core game logic is not handled here
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
});
