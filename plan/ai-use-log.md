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
