# Final Report — Tech Warmup II: Generative AI as an Engineering Tool

**Team 16 · CSE 110 · April 22, 2026**

Team members: Jordan, Yuval, Alec, Angelo, Bowen, Fariba, Harvey, Jenny, Koji, Roy.

---

## 1. TL;DR

We used a single harness (Gemini CLI) with a single model (Gemini 2.5 Pro) to rebuild the slot machine from scratch, driven end-to-end by prompts and logged verbatim in `plan/ai-use-log.md`. The game works: themed AI-satire visuals, a real lever-pull spin, a 3×3 grid with payline evaluation, integer currency, accessibility floor, paytable modal, settings menu, and a full Vitest suite covering RNG, grid, paylines, FSM, and a story-level test.

Our bottom-line finding is narrower than "AI is good" or "AI is bad":

- **AI was excellent at code that has a contract.** The FSM, RNG, grid draw, payline evaluator — things we could write a Vitest assertion against — landed mostly in one prompt and stayed fixed.
- **AI was poor at code without a contract.** Visual polish, animation timing, and layout alignment dominated our re-prompt budget. Ten of our twenty-six logged iterations are just spin-animation fixes (entries 12–22).
- **Planning artifacts carried more of the weight than the model did.** Research excerpts, invariants in `GEMINI.md`, and prompt templates in `ai-plan.md` were the difference between one-shot success and re-prompt spirals.

---

## 2. Setup and process

### 2.1 Harness and model

- **Harness:** Gemini CLI, same for every driver, every session.
- **Model:** Gemini 2.5 Pro, exclusively. We never escalated, never fell back to Flash. The rationale is in `plan/ai-plan.md` §1: we were graded on code quality and process discipline, not throughput, and a slower model that gets it right first-pass beats a faster model that needs three re-prompts.

### 2.2 Guardrails we fed the agent

Three documents shaped every turn:

1. `GEMINI.md` at the repo root — eight non-negotiable invariants (FSM shape, integer currency, authoritative outcome, spin lock, state persistence, RNG-fails-closed, accessibility floor, ethical rails) plus a hard rule that the agent does not commit.
2. `plan/ai-plan.md` — the full workflow: driver/observer roles, prompt templates, log schema, quality gate.
3. `plan/raw-research/*` — nine research documents quoted into prompts by excerpt, never by "read the folder."

The key discipline was **paste the paragraph, don't link the folder.** The agent behaves measurably differently when the research is in the prompt window versus when it's "somewhere in the repo."

### 2.3 Driver workflow

Each slice followed the loop in `ai-plan.md` §7:

pick slice → write failing test → prompt (with quoted research + invariants) → review diff → run quality gate → adversarial pass → log entry → human commit.

Commits were always human-authored. The `git log` shows 85 commits across 10 authors; zero are attributed to the agent.

### 2.4 Research and planning

Before the first line of code, we produced:

- `plan/research-overview.md` covering mechanics, wireframing, edge cases, accessibility, visual themes, tech stack, animation, and sound.
- Nine raw-research docs under `plan/raw-research/`.
- Three personas (`Maya`, `Darren`, `Priya`) in `plan/personas/personas.md`, scoped explicitly to the "light route" described in the player research.
- Five user stories in `plan/user-stories/user-stories.md`, driving feature priorities (instant play, readable UI, themed immersion, bonus/feedback moments, shareability).

This research is not decoration. It shows up verbatim in prompts — the animation research in entry 8, the accessibility doc in entry 1, the visual-themes doc in entries 2–5, the user stories in entry 8. Every prompt that asked the agent to make a design decision was fed the research paragraph that constrained it.

---

## 3. What we built

A themed, accessible, tested 3×3 slot machine running on vanilla HTML/CSS/JS (per the `Vanilla JS vs React/Vue` research decision).

### 3.1 Game logic (`src/game/`)

| Module       | Purpose                                                                      | Lines |
| ------------ | ---------------------------------------------------------------------------- | ----: |
| `rng.js`     | Seeded RNG with validated output (fails closed).                             |    48 |
| `grid.js`    | Deterministic 3×3 grid draw from reel strips.                                |    55 |
| `payline.js` | Payline evaluator with wild-symbol support.                                  |    55 |
| `fsm.js`     | `IDLE → SPINNING → RESOLVING → IDLE` with explicit illegal-transition guard. |    87 |
| `logic.js`   | Glue: bet validation, integer math, spin orchestration.                      |    50 |

All five have Vitest coverage under `tests/game/`: `rng.test.js`, `grid.test.js`, `payline.test.js`, `fsm.test.js`, and a higher-level `story.test.js` exercising a full spin flow.

### 3.2 UI (`src/index.html`, `src/styles/main.css`, `src/ui/main.js`)

- **Theme:** "Sentient Slots — More Fun Than Paperclips." Cyberpunk-dystopian AI satire, with custom SVG symbols (AI head, neural net, RAM chip, IDE, system gear, GPU, network globe, BTC, ROI chart, plus a wild). No emoji, per entry 24/25 feedback.
- **Spin interaction:** a pullable lever (not a button) next to the reels — pulling it down past a threshold triggers the spin, per entries 23–24.
- **Dashboard (left):** Jackpot counter (randomly incremented), RTP (96%), Balance, Bet with `+` / `−` controls, Last Win.
- **Modals/menus:** Paytable modal with per-symbol payouts; settings menu with an animation toggle; mute toggle; all keyboard-reachable.
- **Accessibility:** `aria-live` for status messages, `aria-pressed` / `aria-expanded` / `aria-haspopup` on toggles, keyboard-focusable lever, `prefers-reduced-motion` media query collapses animation.
- **Win/lose feedback:** a fixed-width win/lose band so long status messages never resize the slot chassis (entry 27/28 fix).

### 3.3 Code footprint

Roughly 1,900 lines across source and tests:

- `src/index.html` — 315 lines (most of it SVG symbol defs and the paytable).
- `src/styles/main.css` — 698 lines.
- `src/ui/main.js` — 423 lines.
- `src/game/*.js` — 295 lines.
- `tests/game/*.js` — 472 lines.

---

## 4. Data: what the log actually shows

The log has 26 entries (minimum was 20). We categorize them by intent:

| Category                                            | Entries                                    |  Count |
| --------------------------------------------------- | ------------------------------------------ | -----: |
| UI scaffolding + theme                              | 1, 2, 3, 4, 5, 6, 7                        |      7 |
| Feature wiring (logic ↔ UI, bet controls, features) | 8, 9, 10, 11                               |      4 |
| **Spin animation iteration**                        | **12, 13, 14, 15, 17, 18, 19, 20, 21, 22** | **10** |
| Interaction redesign (lever) + layout               | 23, 24, 25, 26                             |      4 |
| Status-message box width bug                        | 27, 28                                     |      2 |

### 4.1 The animation tax

The headline number: **10 of 26 logged turns were spent iterating on a single feature — the reel spin animation.** That is 38% of our entire AI budget.

What went wrong, in order:

1. **12** — animation didn't trigger; DOM wasn't updated after spin.
2. **13** — animation was too short; needed blur and a 3s duration.
3. **14** — symbols disappeared mid-spin and looked un-scrambled.
4. **15** — abrupt snap between "animation landing" and "final result."
5. **17** — not an animation issue but related: long status messages expanded the chassis.
6. **18** — first spin worked, second spin did not (state reset bug).
7. **19** — residual visual jump after landing.
8. **20** — another variant of the post-landing snap, caused by DOM rebuild.
9. **21** — misalignment in the 3×3 viewport after landing.
10. **22** — extra vertical offset remaining after landing.

Every one of these was re-prompt work on the same feature. Each was framed carefully, each cited the invariants, and each produced a "fix" that either regressed something else or didn't fully land. We did not hand-edit — we kept re-prompting per the plan.

### 4.2 Where the model succeeded first-shot

Four commits in `git log` stand out: `feat(game): deterministic 3x3 grid draw from reel strips`, `feat(game): payline evaluator with wild symbol support`, `feat(game): finite-state machine with explicit illegal-transition guard`, `feat(game): validate RNG seed and cover negative output path`. These are the game-logic modules, and they were all test-first: Vitest assertions were written before the prompt, pasted into the prompt, and the model produced working code in one pass.

That is the single cleanest pattern we observed. **A contract in the prompt is worth ten words of English.**

### 4.3 Commits and contributors

`git log --oneline | wc -l` → 85 commits. Author distribution (commits each): Jordan 20, Roy 18, Asespene 11, Yuval 11, Angelo 7, Jennifer 5, Fariba 3+1, Alec 1+1+1, nakazawak 2, Endless1010 2, lurany 2. Every commit is a human. No agent authorship.

### 4.4 Hand-edits

Per the rule in `ai-plan.md` §4, hand-edits were allowed only after two failed prompt attempts and had to be logged. In practice we hand-edited rarely — a commit message like `fix fat finger on the logic.js` (`a033e5a`) is an example of a human-authored typo correction, not a hand-written feature. The spin-animation thrash (§4.1) could have been shortcut with hand-editing much earlier, but the experiment was the point: we wanted to measure whether prompting alone could finish the job.

---

## 5. Discussion — answering the assignment's learning goals

### 5.1 Challenges when using AI for quality software

- **Visual/timing feedback loops are the weak point.** Code with a Vitest assertion gets fixed in one turn. Code whose "correct" state can only be judged by a human watching the screen needs many turns, and each turn has re-regression risk. Animation is not a bug category — it's a process category.
- **Model "fixes" have regression blast radius.** Entry 18 shows it clearly: fixing the landing-jump broke repeated spins. A strong code review habit (or a Playwright E2E test for "click spin twice") would have caught this sooner than the next driver session did.
- **Consistency is hard across turns.** Even with one model and one harness, class names, event-listener placement, and CSS structure drifted between sessions. The linter and stylelint caught the shallow drift; deeper architectural drift (where state lives, how reels rebuild) required a human to notice.

### 5.2 How important is research?

Very. The research set the invariants (`GEMINI.md`) and those invariants were the only thing that kept slices from sprawling. A concrete example: because `errorState-edgeCases-research.md` specified "authoritative outcome before animation," the FSM work in entries 12–22 never re-opened the question of _what the correct outcome was_. The model only had to fix how it was displayed. Without that constraint, the animation thrash would also have been a correctness thrash.

Research also directly shaped user-visible features: RTP display (from `slot-machine-mechanics-research.md`), reduced-motion behavior (`accessibility-considerations-research.md`), and the "commit to one theme" call (`visual-themes-research.md`).

### 5.3 How do planning and precision influence outcomes?

Two observations:

- **Prompt specificity tracks diff quality almost linearly.** Entry 12 (a focused, bug-pinned prompt with file and function names) produced a clean diff. Entries where multiple issues were bundled (entry 9 has six sub-bullets covering jackpot increments, labels, button sizes, balance bugs, bet controls, and position) produced sprawling diffs that needed follow-ups.
- **Named invariants survive; paraphrased invariants don't.** Prompts that literally said "§5.2 integer currency only" kept the math correct. Prompts that said "please keep it tidy" did not.

### 5.4 User and domain centered thinking

Every feature in the final build ties back to a persona or story:

| Feature                                          | Driving persona / story                       |
| ------------------------------------------------ | --------------------------------------------- |
| Instant play, no signup                          | Maya (story 1), Priya                         |
| One-obvious-action lever                         | Maya (story 2)                                |
| Themed SVG symbol set + background               | Darren (story 3), visual-themes research      |
| Paytable modal, RTP display, jackpot counter     | Darren (story 4)                              |
| Adjustable bet (`+` / `−` buttons)               | Darren                                        |
| Win-text satire on wins _and_ losses             | Story 4, Priya                                |
| Mute toggle, `prefers-reduced-motion`, aria-live | Maya (on bus), Jenny's accessibility research |

We did not implement the share/screenshot feature Priya implies (story 5). That was a scope call — the spin-animation tax ate the session budget we would have used for it.

### 5.5 Team norms and discipline

Three things carried the most weight:

1. **Verbatim prompt logging.** The assignment's requirement to paste prompts in the log made us write better prompts, because we knew they'd be read.
2. **The observer role** (`ai-plan.md` §4). When we actually used it, it caught bundled prompts before they went out. When we skipped it, re-prompt counts climbed.
3. **Quality gate before commit.** The gate kept lint/test/JSDoc rot from compounding. Where it slipped, drift appeared — that's why the CSS file is 698 lines.

### 5.6 Will our team use AI going forward?

Qualified yes. We would use it on the next project under these conditions:

- **Test-first for any module with a contract.** Non-negotiable.
- **Visual/animation work gets a shorter prompt budget and an earlier hand-edit exit.** We wasted 10 turns learning this.
- **One concern per prompt; bundled prompts are a smell.**
- **Keep the invariant file (`GEMINI.md`) short and numbered.** Being able to cite `§5.4` in a prompt is more effective than re-describing the rule.
- **Humans still commit, humans still review diffs.** The agent is a writer, not a maintainer.

What we would _not_ do again:

- Use AI as the primary author for visual design iteration. The right use there is "implement this Figma" or "match this reference," not "make it prettier."
- Bundle unrelated fixes into a single prompt.
- Let a slice run without a failing test when one was possible.

---

## 6. Limitations and honest caveats

- **Sample size of one.** One team, one model, one harness, one project. Anything we say about Gemini 2.5 Pro vs. another model is _not_ supported by this data.
- **Our animation problems may have been a CSS-architecture issue, not a model issue.** A cleaner CSS module structure would have shortened the re-prompt chain even with the same model.
- **We never explicitly tested the `state persistence across refresh` invariant end-to-end.** The FSM supports it; the Playwright smoke suite described in `ai-plan.md` §6 was not fully realized. This is a known gap.
- **The model's adversarial review pass (`ai-plan.md` §3.5) was run inconsistently.** Where we did run it (early FSM work), it was useful. Where we skipped it (later UI entries), regressions slipped in.

---

## 7. Conclusion

AI coding assistants make software engineers faster at the parts of the job that have a contract, and slower at the parts that don't. Our log is concrete evidence of that: FSM + RNG + paylines in one pass each, spin animation in ten passes. The planning artifacts — research, invariants, personas, prompt templates, the log itself — did more to produce good code than the model upgrade ever could have. The model was a capable implementer; the discipline was the engineering.

We built a better slot machine than V1, with meaningfully better accessibility, correctness, and theming. We also built a playbook for when to use AI and when not to. That playbook, more than the game, is what we'll carry into the next project.

---

## Appendix A — Artifacts

- Source: `src/index.html`, `src/styles/main.css`, `src/ui/main.js`, `src/game/*.js`.
- Tests: `tests/game/*.js` (Vitest).
- Plan: `plan/ai-plan.md`, `plan/ai-use-log.md`, `GEMINI.md`.
- Research: `plan/research-overview.md`, `plan/raw-research/*`.
- Personas and stories: `plan/personas/personas.md`, `plan/user-stories/user-stories.md`.
