# AI Plan — Slot Machine V2

This document is the starting contract between the team and the AI. It tells any driver on any day **how we use the LLM, what we never let it do, and how we record what happens**. The plan is living — if the workflow isn't working, we change this file and log the change in `ai-use-log.md`.

> Related artifacts: `research-overview.md`, `user-stories.md`, `personas/personas.md`, `raw-research/*.md`, `ai-use-log.md`.

---

## 1. Harness & model choice

**Harness: Gemini CLI.** Every driver, every session, same tool. Do not switch harnesses mid-project — that invalidates the experiment.

**Model: Gemini 2.5 Pro — one model for the entire project.** No switching, no escalating, no "let me try Flash for this quick thing". Every turn by every driver uses Pro.

**Why Pro specifically (not Flash, not Flash-Lite):**

- The assignment grades code quality and process discipline, not throughput. A slower model that writes better code the first time beats a faster model that needs three re-prompts.
- Our workload is dominated by the hard stuff, not the easy stuff: FSM design, payline math, integer currency, state persistence, accessibility. Those are exactly where reasoning depth pays off.
- The adversarial review pass (§3.5) is only useful with a strong reasoner. A weaker model rubber-stamps its own code.
- Consistency across drivers matters more than speed. With one model, every log entry is comparing like with like — that makes the final report honest.

**Why not Flash:** faster per turn, but it tends to skip invariants under load, which would force us to re-prompt more. The net wall-clock time isn't obviously better, and the log gets noisier.

**Never:** switch models mid-turn, silently swap to a different Gemini tier, or use any model outside Gemini CLI. If Pro is unavailable in the moment (rate limit, outage), stop driving and log it — don't fall back to Flash quietly.

---

## 2. Context & guardrails we feed the agent

All of these live at the repo root so Gemini CLI picks them up automatically:

- **`GEMINI.md`** — project-level instructions. Short. Points at this file, the research docs, and the non-negotiable rules in §5.
- **`.gitignore`** — keep the workspace clean (no `node_modules/`, `.DS_Store`, coverage reports, build artifacts).
- **Research docs** — quoted into prompts *by excerpt*, not by "read everything in `raw-research/`". Targeted beats comprehensive.

When we start a session, we open Gemini CLI from the repo root so it inherits `GEMINI.md`. We never paste the research wholesale — we quote the specific paragraph that constrains the turn.

---

## 3. Core strategy

Five principles, in priority order. If two conflict, the earlier one wins.

1. **Test-first where possible.** For any function with a clear input/output contract (RNG, payline evaluation, bet validation, currency math), write the Vitest test *before* asking Gemini for the implementation. Paste the failing test into the prompt. This is the single most reliable trick we have for getting correct code.
2. **Vertical slices, not horizontal layers.** A "slice" is one user-visible change end-to-end: UI + logic + test + doc. We do not spend a full day scaffolding CSS before anything works. Slice one of the user stories, ship it, log it, commit, then pick the next.
3. **One concern per turn.** A prompt asks for *one* thing. "Add the spin button and wire up the RNG and make it accessible" is three turns, not one. This keeps diffs reviewable and keeps the log meaningful.
4. **Quote the research, don't restate it.** When a prompt touches FSM logic, paste the relevant lines from `errorState-edgeCases-research.md`. When it touches animation, paste the `prefers-reduced-motion` bit from `accessibility-considerations-research.md`. The agent behaves differently when it sees the source, not our paraphrase.
5. **Adversarial review every slice.** After a slice is green, run a separate turn asking the agent to *attack* the code: find race conditions, integer overflow, inputs that break the FSM, a11y regressions. Log what it finds. Fix or file an issue.

---

## 4. Roles, norms, and who touches what

**Driver** — the person at the keyboard prompting Gemini. Writes the prompt, **copies the exact prompt text into `ai-use-log.md` before or immediately after sending it** (§8), reads the diff, runs the tests, writes the rest of the log entry, makes the commit.

**Observer** — a second team member on the call. Their job is to *not* type. They catch when the driver is about to hand-edit something without trying a prompt first, when a diff got too big to review, when the log entry is getting skipped, and **when a prompt got sent to Gemini without being pasted into the log**. Rotate this role every session.

**Commits are human, always.** The assignment is explicit: we commit, not the agent. Do not prompt Gemini to run `git commit`, `git push`, or modify git state. If the agent offers, say no. The git author on every commit must be a human team member.

**Hand-editing the code is allowed only after a prompt attempt fails.** The rule:

1. Try to get the fix via prompting.
2. If it's still wrong after ~2 attempts, the driver may edit by hand.
3. The log entry for that turn must say: "prompt attempts failed because X, hand-edited Y".

Hand-editing as the *default* defeats the purpose of the experiment. If you find yourself reaching for the editor, stop and ask the observer whether you've given the agent a fair shot.

**What the agent is allowed to do:** read files, propose diffs, run tests, run the linter, run the type checker, run the dev server, run Playwright. **What it is not allowed to do:** commit, push, create branches, tag releases, open PRs, modify `.git/`, install globally, or touch anything outside this repo.

---

## 5. Non-negotiable architectural guardrails

These come straight out of the research. They are pasted into every implementation prompt that touches game state. If the agent proposes something that violates one of these, we reject the diff and re-prompt.

1. **Strict finite-state machine for the game loop.** States: `IDLE → SPINNING → RESOLVING → IDLE` (plus `ERROR` as a terminal-from-anywhere state). Transitions are explicit; no ad-hoc boolean flags substituting for state.
2. **Integer currency only.** Credits are stored as integers (cents or whole tokens — decide in session 1). Never `number` representing dollars, never `parseFloat`. Every bet/payout operation is an integer op.
3. **Authoritative outcome before animation.** The result of a spin is computed and persisted *before* any reel animation starts. Animation is aesthetic, not a source of truth. Tab-switching during a spin must resolve to the already-computed outcome.
4. **Synchronous spin lock.** The spin handler disables input at the top and does not re-enable until the FSM returns to `IDLE`. Bet modifications are rejected while `SPINNING` or `RESOLVING`.
5. **State persistence across refresh.** In-flight rounds are written to `localStorage` before the RNG call. On app start, check for an unresolved round and force it to resolve before accepting new input.
6. **RNG fails closed.** If the RNG returns null, NaN, or out-of-bounds, the FSM goes to `ERROR`, the bet is refunded, and the UI says so.
7. **Accessibility floor.** `prefers-reduced-motion` respected, spin is keyboard-activatable with visible focus, every win/loss is conveyed with text *in addition to* color and animation.
8. **Ethical rails.** Light route only (short satisfying sessions, not time-on-device). No losses-disguised-as-wins if we do multi-line. No rigging the RNG to produce near-misses.

---

## 6. Quality gate (must pass before every commit)

A commit is allowed only when all of the following are green locally:

- **Lint**: ESLint on JS, stylelint on CSS, HTML validation on pages.
- **Types / JSDoc**: all exported functions have JSDoc with typed `@param` / `@returns`. (Per user's TS rule: no `any`. If we end up using TS, no `any` — use proper interfaces.)
- **Unit tests**: Vitest (or Jest — decide in session 1). All green.
- **E2E**: Playwright smoke suite green. At minimum: "can spin", "balance decrements", "win displays", "state survives refresh".
- **Manual smoke**: the driver actually ran the feature in a browser before claiming it works. Type-check passing ≠ feature working.

Whoever commits is asserting all six. If you didn't run them, don't commit.

---

## 7. Driver session workflow

Run this loop for every slice. Each loop produces at least one log entry. 20 entries is the minimum; the loop naturally hits that in ~7–10 slices.

1. **Pick a slice.** One user story row or one sub-task. Write it in the log before starting.
2. **Write the failing test.** Vitest for pure logic, Playwright for UI behavior. Commit it red if it stands alone.
3. **Prompt.** Use a template from §9. Cite the relevant research excerpt. Specify the file, the function signature, and the invariants from §5. **Paste the exact prompt into the log entry (§8) before sending** — easier to do it up front than reconstruct afterward.
4. **Review the diff.** Read it before accepting. If it's over ~80 lines, it's probably too big — ask for a smaller version or split the slice.
5. **Run the quality gate** (§6). If red, re-prompt with the failure output pasted in. If still red after ~2 attempts, hand-edit and log it.
6. **Adversarial pass.** Once green, one Pro turn asking "what's wrong with this?". Log findings. Fix or file.
7. **Log + commit.** Write the log entry (§8), `git add` specific files (not `-A`), human-authored commit.

---

## 8. Log entry schema (`ai-use-log.md`)

**Every prompt we send to Gemini is logged verbatim in the entry for its slice.** No summaries-only, no paraphrases, no "and then I asked it to fix the tests". If you typed it, paste it. Re-prompts on the same slice go in the same entry, in order, under the same `Prompts` block.

Why verbatim: the final report leans on *what we actually said to the agent and how it reacted*. Paraphrases smuggle in hindsight. The raw prompt is the only honest record.

Entry format (keep the field order consistent so the log is scannable):

```md
### Entry N — <date> — <driver name>

**Slice:** <one-line description; link to user story if applicable>
**Summary:** <one-line gist of what was attempted this entry>

**Prompts:**

<details><summary>Prompt 1 — <model, e.g. Gemini 2.5 Pro></summary>

```
<full prompt text, verbatim, exactly as sent>
```

</details>

<details><summary>Prompt 2 — re-prompt: <why we re-prompted, e.g. "first attempt violated §5.2"></summary>

```
<full prompt text, verbatim>
```

</details>

<!-- add more <details> blocks as needed, one per prompt sent -->

**Outcome:** worked | partial | failed
**Hand-edit?** No | Yes — <why prompt path failed, what we changed>
**What we learned:** <1–3 bullets about the agent's behavior, not the code>
**Commit:** <short sha>
```

Rules:

- **Paste the whole prompt.** Including any research excerpts you quoted, any pasted test code, any error output. If you pasted 200 lines of log into the prompt, the log entry gets 200 lines. That's the deal.
- **One `<details>` block per prompt sent.** A slice that took four re-prompts produces one entry with four `<details>` blocks. Not four entries.
- **Scrub nothing.** If a prompt had a typo, log the typo. If it was rude, log it. We're measuring reality.
- **Redact only secrets** — API keys, personal info. Never redact the prompt text itself.
- "What we learned" is the most valuable field — it's what the final report is built on. If you don't have anything to say, the slice was probably too small or you didn't observe carefully.
- Changing this plan counts as a log entry with `**Slice:** plan revision` and the diff summarized under "What we learned".

---

## 9. Prompt templates

Drivers adapt these — don't copy verbatim. The point is consistent framing, not ritual.

**New feature slice**

```
Context: working on <file path>. See plan/ai-plan.md §5 for invariants.
Research excerpt to honor: "<paste 2–5 lines from the relevant raw-research doc>"
Failing test (do not modify): <paste test>
Write the minimum code to make this test pass. Do not touch other files.
```

**Bug fix**

```
Bug: <what happened> on <file>:<line>. Expected: <X>. Actual: <Y>.
Reproducing test: <paste>
Invariant that must still hold: <cite §5 rule>
Propose a fix as a diff. Explain in 2 sentences why the original failed.
```

**Refactor**

```
Goal: <extract X / rename Y / DRY up Z>. No behavior change.
Files in scope: <list>. Do not touch anything outside this list.
All existing tests must still pass. Do not add new tests.
```

**Adversarial review**

```
Review <file path>. Ignore style. Find:
- Race conditions or FSM transitions that can be triggered out of order
- Integer / currency math that can under- or overflow
- Inputs that would bypass the spin lock
- a11y regressions vs plan §5.7
List findings as a checklist. Do not fix anything yet.
```

---

## 10. Open decisions (driver team resolves in session 1)

These are left open on purpose — they're real calls the team should make together, not ones the plan should preempt.

- **Stack.** Plain HTML/CSS/JS + JSDoc (the assignment's explicit hint) vs. TypeScript. JS+JSDoc is lower friction; TS catches more at compile time. Pick one before writing any module code.
- **Theme.** Story 4 in `user-stories.md` implies an "AI satire / AI hallucinations" theme, but we haven't ratified it. The visual research says *commit to one theme and do it well* — the worst outcome is hedging. Lock it in session 1.
- **Bonus mechanic.** Darren's persona is only satisfied if there's at least one special feature (bonus round, free spins, scatter mechanic). Pick one and scope it small.
- **Currency unit.** Integer cents, whole tokens, or named credits? The choice affects every math call.
- **Test runner.** Vitest or Jest. No strong preference — pick the one someone on the team has used.

Log the decisions in `ai-use-log.md` under `**Slice:** session-1 decisions` once made, and update this file to reflect them.

---

## 11. When and how to change this plan

If the workflow isn't working — agent keeps missing the invariants, the quality gate is too slow, log entries are getting skipped — **change this plan**, don't quietly deviate from it. The assignment expects the plan to evolve; what it doesn't accept is the plan and reality drifting apart silently.

Process:

1. Raise it in the driver call or Slack.
2. Edit this file.
3. Add a log entry noting the change and the reason.

---

## 12. Session 1 kickoff checklist

For whoever opens the first driving session:

- [ ] Resolve the five open decisions in §10.
- [ ] Create `GEMINI.md` at repo root pointing to this file + §5 rules.
- [ ] Scaffold: `package.json`, `.gitignore`, chosen test runner, ESLint, stylelint, Playwright.
- [ ] Green first slice: "app loads, shows a balance, spin button present but disabled" — with a Playwright test.
- [ ] First 2 log entries written in the agreed schema.
