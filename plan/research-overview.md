# Research Overview

Put all research artifacts in the `raw-research/` directory. When you do your research add to your section under the member contributions and update the research summary as needed

## Research Summary

**Slot Machine Mechanics:**

Modern slot machines rely on random number generators to determine the results of individual spins. Games revolve around paylines, which are specific patterns where symbols must match for a payout. There are also special symbols such as wilds and scatters that change up the game and usually help the player. Slot machines are designed to always give the house the better odds, and there are multiple metrics to analyze the risk / potential payouts of a slot machine such as RTP and volatility. 


**Edge Cases & Error States:**
To avoid desync states and financial calculation errors, then we should treat the slot machine as a **Strict Finite-State Machine (FSM). Some of the stuff I found is to differentiate game logic from UI/Animation timing so we can ensure that browser cosntraints does not affect the game. Make sure the transactions are atomic for every spin andw e are using integer-based currency. System is designed to be resilient against re-entrancy, race condition, and of course floating-point bugs.

## Member Contributions

### Jordan

Researched slot machine mechanics and jargon, exploring how slot machines work, paylines, metrics such as RTP and volatility, and special symbols such as wild symbols and scatter symbols.

### Yuval

### Alec

### Angelo

Research and documented technical edge cases and error states. Established an idea for the FSM architecture as well as the protection protocols for re-entrancy to ensure the gameplay is consistent and the state is persistent in environmental mishaps.

### Bowen

### Fariba

### Harvey

### Jenny

### Koji

### Roy
