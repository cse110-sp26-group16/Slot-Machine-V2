document.addEventListener('DOMContentLoaded', () => {
    const muteToggleButton = document.getElementById('mute-toggle');
    const spinButton = document.getElementById('spin-button');
    const paytableButton = document.getElementById('paytable-button');

    if (muteToggleButton) {
        muteToggleButton.addEventListener('click', () => {
            const isPressed = muteToggleButton.getAttribute('aria-pressed') === 'true';
            muteToggleButton.setAttribute('aria-pressed', !isPressed);
            console.log(`Mute toggled. New state: ${!isPressed ? 'muted' : 'unmuted'}`);
        });
    }

    if(spinButton) {
        spinButton.addEventListener('click', () => {
            console.log('Spin button clicked.');
        });
    }

    if(paytableButton) {
        paytableButton.addEventListener('click', () => {
            console.log('Paytable button clicked.');
        });
    }
});
