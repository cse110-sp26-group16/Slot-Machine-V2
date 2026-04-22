# Research Overview

Put all research artifacts in the `raw-research/` directory. When you do your research add to your section under the member contributions and update the research summary as needed

## Research Summary

**Slot Machine Mechanics:**

Modern slot machines rely on random number generators to determine the results of individual spins. Games revolve around paylines, which are specific patterns where symbols must match for a payout. There are also special symbols such as wilds and scatters that change up the game and usually help the player. Slot machines are designed to always give the house the better odds, and there are multiple metrics to analyze the risk / potential payouts of a slot machine such as RTP and volatility. 

**Wireframing & UI Sketching:**
Structural planning focuses on defining the user journey through low-fidelity blueprints. By establishing a clear visual hierarchy and mapping out essential components, like the play area, dashboard, and action buttons, the design ensures intuitive navigation. This skeletal framework serves as a functional anchor for the project, allowing for rapid iteration of the layout before any visual styling or code implementation begins.

**Edge Cases & Error States:**
To avoid desync states and financial calculation errors, then we should treat the slot machine as a **Strict Finite-State Machine (FSM)**. Some of the stuff I found is to differentiate game logic from UI/Animation timing so we can ensure that browser constraints does not affect the game. Make sure the transactions are atomic for every spin andw e are using integer-based currency. System is designed to be resilient against re-entrancy, race condition, and of course floating-point bugs.

**Accessibility Considerations:**
To ensure the game is inclusive, the design focuses on minimizing cognitive and physical barriers. This involves supporting reduced-motion modes to prevent discomfort from animations, ensuring all game actions are keyboard-accessible with clear focus states, and providing multi-modal feedback (combining text, color, and layout) so results aren't dependent on a single sensory cue. High color contrast and logical timing for transitions are also prioritized to maintain readability and ease of use.

**Visual Themes:**
The visual theme of a slot machine game plays a major role in both presentation and usability. From the images collected, the strongest designs consistently keep the reels as the main focus, use high contrast so symbols are easy to recognize, and maintain a unified style across the screen. A clear visual direction helps the game feel more polished and intentional instead of random or unfinished.

## Member Contributions

### Jordan

Researched slot machine mechanics and jargon, exploring how slot machines work, paylines, metrics such as RTP and volatility, and special symbols such as wild symbols and scatter symbols.

### Yuval

Researched **user personas for slot machine game design**, focusing on different player motivations and behavior patterns. Identified key user segments such as excitement seekers, relaxation-driven players, and casual social players. Translated these personas into design implications for the game, including the need for short gameplay loops, clear visual feedback, and shareable win moments. This research helps ensure the game design aligns with diverse user goals and engagement styles.

### Alec


Researched **competitor analysis for slot machine games**, examining existing digital slot interfaces and common design patterns used in similar products. Identified key features across competitors such as bonus rounds, spin mechanics, reward animations, and user retention strategies. Also analyzed how different games balance visual complexity with usability, particularly in maintaining clear reel visibility while still using engaging themes and effects. This research informs design decisions by highlighting industry standards and opportunities for differentiation in our own implementation.

### Angelo

Research and documented technical edge cases and error states. Established an idea for the FSM architecture as well as the protection protocols for re-entrancy to ensure the gameplay is consistent and the state is persistent in environmental mishaps.

### Bowen

Researched wireframing and UI sketching methodologies, focusing on creating low-fidelity blueprints to map user journeys. Established a structural hierarchy for the slot interface and identified core components like the reels and dashboard to serve as a technical anchor for development.


### Fariba

Researched the **tech stack decisions for the slot machine project**, comparing **Vanilla JavaScript vs React/Vue** and **Canvas vs DOM-based rendering**. Found that Vanilla JavaScript is sufficient because the game logic is self-contained (spin, calculate results, update balance) and does not require a heavy framework. Concluded that React would add unnecessary complexity for this use case.

Also evaluated rendering options and determined that a DOM-based approach is more suitable than Canvas, since the interface is driven by discrete UI state updates rather than continuous animations or real-time graphics.

### Harvey

Research visual theme and art direction for the slot machine, and collected and analyzed reference images showing strong reel-centered layouts, readable high-contrast symbols, and consistent themed interfaces such as pirate and fantasy styles. 

### Jenny
Researched and documented accessibility standards for motion-heavy interfaces. Established guidelines for reduced-motion support, keyboard navigation, and multi-modal feedback systems to ensure the game remains usable for players with visual, motor, or cognitive impairments.

### Koji

Researched **animation and feedback patterns in slot machine games**, focusing on how motion and visual response are used to communicate game state changes. Analyzed common animation sequences such as reel spinning, easing transitions, symbol alignment, and win celebrations. Also examined feedback timing, including how quickly results are revealed after a spin and how layered effects (flash, shake, particle effects) reinforce perceived reward. This research helps guide how animations should clearly separate input (spin action) from outcome (result reveal), while keeping feedback visually engaging without overwhelming the user.

### Roy

Researched **sound design references for slot machine games**, focusing on how audio is used to enhance player engagement and reinforce game feedback. Studied common practices such as win jingles, reel spin sounds, and layered audio effects that respond to gameplay events. Also analyzed how tempo, repetition, and sound variation are used to prevent fatigue while maintaining excitement. This research highlights how sound is tightly coupled with visual feedback to create a more immersive and responsive user experience.
