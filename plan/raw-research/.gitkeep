# Research Topic: **Edge** Cases & **Error** States

**Member:** Angelo Sespene

## Gameplay Logic Errors

The spinning of the casino slot machine is not just an animation, but an atomic operation that can be exploited. Therefore we must enssure that there is **Financial Integrity**

### Edge Case
* **Precision Loss**: Don't use floats, the calculations should be in integer cents or BigInt. Avoid **Floating-Point** error in JS.

* **Atomic Transactions**: Reserved the funds value at Spin Start. If it fails to resolve, then there should be a Pending state where the data is recorded.

* **RNG Fails**: Ensure the RNG output is valid immediately. If we get a null or out of bounds, then it is a **Fail Closed** and we should move to a safe error state.

* **Capped Payouts**: There should be a **Max-Win Cap** before crediting. Should keep a record on the capped payout as well as the theoritcal win.

## User Interactions

Ensure the user input is bug-free, you should not be able to **Double Spin**, **Interrupt** current running spins, and **Modify** the stake values during the spin.

* **Synchronous Input Locking**: Stop any double spins by disabling the input handler at the start of the function. This means ignore everything until the state is back to **IDLE**.

* **Rapid Clicking Issues**: When rapid clicking it should be treated as another entry. That's why the spin button should be disabled during any process, reflects the FSM state.

* **Bet Modifications**: This should be blocked once the state moves to **SPINNING**. Any attempt to the stake must be rejected.

## Systems & Environment Constraints

Volatile environments means we must account for any hardware and tab-level interruptions.

### Animation vs. Authority

*  The **Rule** is that the animation is not the correct result, it is purely aesthetic. The math is.

*  When there is a tab switch, the UI must work with the authoritative round state. When a spin is occuring, and you tab switch. It should just show the result and fastforwar once the user is back.

### State Persistence & Recovery

When dealing with refreshing and network drops.

* Create a pending round record in the session or local storage for **persistant records**.

* When the app initializes, make sure there are no unresolved rounds. If so, the app must force the UI to resolve that round before any other input.

## Visual | Hardware Edge Cases

How to handle resizing and high-density displays

* Prevent blurriness by multiplying the drawing buffer using devicePizelRatio.

* In a resize event, re-ender the canvas in an authoritative state to avoid stretched  assets and visual desync.

## Summary Use Cases For AI

When using a **GenAI** model we must follow a strict constraints.

1. The Logic should be a strict **Finite-State Machine**.

2. Integer-based math for the currency.

3. Synchronous spin-lock that is independent of the UI state.

4. Reel Result should be calculated and stored before the animation begins.






