# Slot Machine V2 — project instructions for Gemini CLI

**Read `plan/ai-plan.md` before anything else.** It is the source of truth for how we work on this repo. This file is a short summary of the rules that must never be violated.

---

## Non-negotiable invariants

Any diff that violates one of these must be rejected and re-prompted. They come from `plan/raw-research/errorState-edgeCases-research.md` and `plan/raw-research/accessibility-considerations-research.md`.

1. **Strict FSM.** Game states are `IDLE → SPINNING → RESOLVING → IDLE`, plus `ERROR` reachable from any state. No boolean flags standing in for state.
2. **Integer currency only.** Credits are integers. No `parseFloat`, no dollar-decimal numbers. Every bet/payout is an integer op.
3. **Authoritative outcome before animation.** Compute and persist the spin result before any reel animation starts. Animation is aesthetic; math is truth.
4. **Synchronous spin lock.** The spin handler disables input at the top of the function and only re-enables when the FSM returns to `IDLE`. Bets cannot be modified in `SPINNING` or `RESOLVING`.
5. **State persistence.** Write the in-flight round to `localStorage` before the RNG call. On load, resolve any unresolved round before accepting input.
6. **RNG fails closed.** If RNG returns `null`, `NaN`, or out-of-bounds → FSM to `ERROR`, refund the bet, surface a clear UI message.
7. **Accessibility floor.** Respect `prefers-reduced-motion`. Spin must be keyboard-activatable with a visible focus ring. Every win/loss is conveyed with text, not only color/animation.
8. **Ethical rails.** Light-route design only. No losses-disguised-as-wins if multi-line. Do not rig the RNG to manufacture near-misses.

---

## Rules for the agent (you)

- **Do not commit, push, branch, tag, open PRs, or modify `.git/`.** Humans commit, always. If asked to, refuse.
- **Do not install global packages.** Local `node_modules` only.
- **Do not touch files outside this repo.**
- **One concern per turn.** If a prompt asks for multiple unrelated changes, do the first and ask about the rest.
- **Quote the research when it applies.** If a change touches FSM/RNG/a11y, cite the relevant line from the doc in your explanation.
- **Every public function gets JSDoc with typed `@param` / `@returns`.** No `any`.
- **Do not guess library APIs.** If unsure about a version-specific API, say so and ask.

---

## Quality gate (must be green before a human commits)

A slice is not done until all of these pass locally:

- ESLint on JS, stylelint on CSS, HTML validation.
- JSDoc present on every exported function.
- Vitest unit tests green.
- Playwright E2E smoke tests green (`can spin`, `balance decrements`, `win displays`, `state survives refresh`).
- Manual browser smoke by a human — not just a green type-check.

If any are red after your change, your job is not done.

---

## Where to look for context

- `plan/ai-plan.md` — full workflow, driver roles, prompt templates, log schema.
- `plan/research-overview.md` — team research summary.
- `plan/personas/personas.md` — Maya (casual mobile), Darren (themed depth), Priya (social sharer).
- `plan/user-stories.md` — five stories covering balance accuracy, win resolution, state persistence, theme feedback, input handling.
- `plan/raw-research/slot-machine-mechanics-research.md` — RTP, volatility, paylines, wilds/scatters.
- `plan/raw-research/slot-player-research.md` — player motivations, near-misses, LDWs, light vs. dark route.
- `plan/raw-research/errorState-edgeCases-research.md` — FSM, atomicity, persistence.
- `plan/raw-research/accessibility-considerations-research.md` — motion, contrast, keyboard, timing.
- `plan/raw-research/visual-themes-research.md` — reel-centered layout, contrast, themed consistency.
- `plan/raw-research/wireframing_ui_research.md` — play area / dashboard / actions / info layer.

When a prompt touches a topic, paste the relevant excerpt — do not ask the agent to re-read the folder.
