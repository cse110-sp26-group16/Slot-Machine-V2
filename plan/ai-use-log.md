# UI Prompt Log

1. Files: index.html (new), src/ui/main.js (new), src/styles/main.css (new).

  Goal: the static skeleton of the slot machine UI. No game logic yet — just
  DOM, styling, and the a11y foundation. This unblocks D3 from writing the
  Playwright smoke suite against something real.

  Constraints (see GEMINI.md §Invariants 7 and plan/raw-research/
  accessibility-considerations-research.md):
  - Spin must be a real <button type="button">, keyboard-activatable, with a
    visible focus ring (not `outline: none`).
  - prefers-reduced-motion media query in main.css — animations collapse to
    instant transitions when the user has it set.
  - aria-live="polite" region for win/loss messages, so results are conveyed
    by text in addition to color.
  - Mute toggle present (button with aria-pressed or a checkbox).

  Layout (see plan/raw-research/wireframing_ui_research.md):
  - Central 3x3 reel grid, cells show "?" placeholder.
  - Bottom-docked dashboard: balance, current bet, last win.
  - Large spin button on the right side of the dashboard.
  - "i" button placeholder for paytable — no panel behind it yet.

  Task: generate the three files. Keep src/ui/main.js tiny — just wire the
  mute toggle's aria-pressed state and log clicks to console. Balance, bet,
  and last-win values are hardcoded placeholders. Do NOT import from
  src/game/* — those stubs exist but we're not wiring logic this turn.
  Do NOT write tests in this turn — Playwright smoke belongs to D3.

  Why this first: D2 has a bootstrap problem — nothing to render logic over, and Playwright/unit tests both need DOM to exist. Shipping the
  skeleton first lets D3 write real E2E tests in their second prompt, and lets D2's own second prompt focus on wiring the actual spin flow.



2. 
Refine the slot machine to be more in line with
the visuals of a slot machine you’d see in Las Vegas or a polished, highly acclaimed slot machine app. 

Files: index.html, src/styles/main.css (primary focus), minimal updates to src/ui/main.js only if needed for class hooks. Do not add game logic.
Constraints (see GEMINI.md §Invariants 7 and plan/raw-research/ accessibility-considerations-research.md):
Take inspiration for the slot machine’s theme from plan/raw-research/competitor-analysis.md,
plan/user-stories.md (specifically, story 4: Game Theme Feedback), and plan/raw-research/visual-themes-research.md. Make sure that the theme chosen is a single theme. Ensure all elements including the reel symbols, background, dashboard, buttons, and any other UI elements have the theme applied to it. DO NOT create animation visuals in relation to the theme just yet. Replace the question mark symbols with the themed symbols. Update typography to match the theme and improve readability. Preserve all accessibility requirements and ensure layout remains responsive and uncluttered  


3. The slot machine background is too generic and does not imply a theme at all. Refine the slot machine by creating a more vibrant and eye-catching background. More details on how to refine the slot machine is written below in the “Goal” section. Refer to the theme created and the reference photos in plan/raw-research/visual-themes-research.md.

Files: index.html, src/styles/main.css, minimal updates to src/ui/main.js only if needed for class hooks. Do not add game logic.

Constraints (see GEMINI.md §Invariants 7 and plan/raw-research/ accessibility-considerations-research.md). Ensure all elements including the reel symbols, background, dashboard, buttons, and any other UI elements have the theme applied to it

Goal: Create a layered, neon-themed background using gradients and subtle lighting effects that match the slot machine’s current theme. Avoid using static image backgrounds; instead, use CSS gradients, glow, and color transitions to create depth and atmosphere. Keep the glowing symbols on the slot machine. Make the balance, bet, and last win UIs more in theme as well.


4. 






