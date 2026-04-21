# Research Overview

Put all research artifacts in the `raw-research/` directory. When you do your research add to your section under the member contributions and update the research summary as needed

## Research Summary

**Slot Machine Mechanics:**

Modern slot machines rely on random number generators to determine the results of individual spins. Games revolve around paylines, which are specific patterns where symbols must match for a payout. There are also special symbols such as wilds and scatters that change up the game and usually help the player. Slot machines are designed to always give the house the better odds, and there are multiple metrics to analyze the risk / potential payouts of a slot machine such as RTP and volatility. 

**Wireframing & UI Sketching:**
Structural planning focuses on defining the user journey through low-fidelity blueprints. By establishing a clear visual hierarchy and mapping out essential components, like the play area, dashboard, and action buttons, the design ensures intuitive navigation. This skeletal framework serves as a functional anchor for the project, allowing for rapid iteration of the layout before any visual styling or code implementation begins.

**Edge Cases & Error States:**
To avoid desync states and financial calculation errors, then we should treat the slot machine as a **Strict Finite-State Machine (FSM). Some of the stuff I found is to differentiate game logic from UI/Animation timing so we can ensure that browser cosntraints does not affect the game. Make sure the transactions are atomic for every spin andw e are using integer-based currency. System is designed to be resilient against re-entrancy, race condition, and of course floating-point bugs.

**Accessibility Considerations:**
To ensure the game is inclusive, the design focuses on minimizing cognitive and physical barriers. This involves supporting reduced-motion modes to prevent discomfort from animations, ensuring all game actions are keyboard-accessible with clear focus states, and providing multi-modal feedback (combining text, color, and layout) so results aren't dependent on a single sensory cue. High color contrast and logical timing for transitions are also prioritized to maintain readability and ease of use.

**Visual Themes:**
The visual theme of a slot machine game plays a major role in both presentation and usability. From the images collected, the strongest designs consistently keep the reels as the main focus, use high contrast so symbols are easy to recognize, and maintain a unified style across the screen. A clear visual direction helps the game feel more polished and intentional instead of random or unfinished.

## Member Contributions

### Jordan

Researched slot machine mechanics and jargon, exploring how slot machines work, paylines, metrics such as RTP and volatility, and special symbols such as wild symbols and scatter symbols.

### Yuval

### Alec

### Angelo

Research and documented technical edge cases and error states. Established an idea for the FSM architecture as well as the protection protocols for re-entrancy to ensure the gameplay is consistent and the state is persistent in environmental mishaps.

### Bowen

Researched wireframing and UI sketching methodologies, focusing on creating low-fidelity blueprints to map user journeys. Established a structural hierarchy for the slot interface and identified core components like the reels and dashboard to serve as a technical anchor for development.

### Fariba

### Harvey

Research visual theme and art direction for the slot machine, and collected and analyzed reference images showing strong reel-centered layouts, readable high-contrast symbols, and consistent themed interfaces such as pirate and fantasy styles. 

### Jenny
Researched and documented accessibility standards for motion-heavy interfaces. Established guidelines for reduced-motion support, keyboard navigation, and multi-modal feedback systems to ensure the game remains usable for players with visual, motor, or cognitive impairments.

### Koji

### Roy
