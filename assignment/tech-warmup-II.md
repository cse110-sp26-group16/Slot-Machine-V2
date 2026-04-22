# Tech Warmup II: Generative AI as an Engineering Tool?

**A De-Risk Activity for Using AI in an SWE Context**

**Due:** Wednesday by 11:59pm
**Points:** 30
**Available:** Apr 17 at 9am – Apr 22 at 11:59pm

---

## Purpose

After our personal and technical warm-up we hopefully have an emerging team that sees that AI might offer value, but that there are worries in terms of readability and appropriate use when building quality software.

This warm-up activity should help us determine if/how we might use AI going forward to do a larger software project using AI tools.

This is a different experiment, though the topic (slot machine) is the same.

Remember, this is an experiment: we measure, we observe, and we report.

**WE DO NOT FORCE AN ANSWER**

---

## 1. The Premise

You and your team will use a generative AI coding assistant limited to the following three options:

- OpenAI's Codex
- Claude Code
- Gemini CLI command line

You will use your harness to attempt to build a dramatically improved version of the self-contained slot machine game we did in the last experiment.

In this exercise we want to see if we can harness AI tools to build a significantly better version of the game that adheres to broadly held software engineering practices.

To do this we want to move away from a luck driven approach and see how much a more strategic approach can help us.

---

## 2. Learning Goals

By the end of this exercise your team should be able to answer:

- What challenges we are likely to run into when using AI when building software engineering quality software.
- How important research is to developing the model of software you would like to produce.
- How planning and precision directly influence software outcomes.
- How user and domain centered thinking is required for success.
- How team norms and discipline is required for good outcomes.
- If and how AI will be used in your team's software engineering process.

Like the previous warm-up if performed properly the team should be stronger afterwards as we practice — dividing work, seeing our strengths and weakness in the software process, building a shared understanding of software and quality, and just getting to know each other better!

---

## 3. Rules (Read Carefully)

These rules exist to keep the warm-up clean. Violating any of them invalidates your warm-up and may result in reduce team points.

### Research and Planning Period

This is already in progress and started in lecture on Thursday, but you should be gathering the raw materials about slot machine apps, features, the jargon used, possible visual themes, features, types of users, and everything that might be useful to eventually be used in AI prompting. You may find the tool **Miro** useful for ideation and collection. You may also leverage GitHub as well to plan your project/milestones/issues.

Your GitHub repository for this exercise will have a top-level `plan` directory. In that directory, keep your research artifacts in a directory named `raw-research`. This directory may have anywhere from one to several documents. One may point to a Miro board, while there may be many if your team chooses not to use Miro.

Your research period should probably last until no longer than **Sunday night (April 19, 2026)**.

- Treat this as an internal milestone to help keep your team on track.
- All members must perform some research looking up information, writing thoughts, making wireframes, gathering assets, or anything else you think you should do. Research should include both domain (the problem space) and user (see below) related artifacts.
- A document named `research-overview.md` should be placed in the `plan` directory that provides a summary of your research and a team roster detailing what each member did during the research effort.

### User Focused Activities

As part of your research and planning effort, you should create at least **two persona documents** and **five user stories**.

- These are minimums; there could be many more.
- We must see that you consider user needs and acceptance and that it relates to the software you build. As there is no correct answer here we just need to see that you have attempted this type of thinking.

### Pre-Defined and Continued Documented Approach

You must document your initial strategy for using the LLM (skill files, small increments, agents, adversarial use of LLMs, etc.)

You must then document what you find as you go in real time.

We need to see `ai-plan.md` and `ai-use-log` as you go along.

You may find that you can update the `ai-plan` as you go so you are not required to stick with a process if it isn't working for you. Beyond this there are no limits on how you use the AI tool.

- You may use as few or many turns as you wish.
- You may use skills or MCPs.
- You may use `<insert approach>`, or whatever approach you prefer to move forward.

At every point you must document what you do. You must document what you learn as you go forward.

### Notes on "hand-editing" the code

- You may read the code.
- You may evaluate the code.
- You may touch the code, but only after you try and fail to make a correction with the AI (via prompting).
- You must note this in your logs.
- We should see **you** committing and not Claude or another agent so we know that was done. Do not prompt the agent to commit on your behalf.
- You should however be attempting to see just how much you can let the agents do so hand-editing should not be your default.

### Everything goes in the repo incrementally

- All artifacts for code, test, etc. must be found in your repo.
- We should be able to see commits, issues (if you use them), and every artifact produced by yourself or the agent.
- Things happening outside of the repo will not be graded.

### Meeting Basic Software Engineering Standards

Your code must be:

- **Linted:** source code should be checked for quality. This includes HTML validation, CSS use, and JS style and usage.
- **Documented:** Source code must be appropriately documented. JavaScript should use JSDocs with type annotations.
- **Tested:** Unit tests are required at a bare minimum. End-to-end tests with **Playwright** are suggested. Do this as you go — don't save it for the end. You may even want to experiment with writing some tests first and having the LLM write code solving those tests!
- **Clean:** Following the principles of clean code you should use:
  - Meaningful names.
  - Small functions and classes.
  - Avoid duplicate code (Don't Repeat Yourself — DRY).
  - Handle errors.
  - Appropriate abstraction and modularity.
  - Be easy to update.

Clear code matters more than clever code — the goal is a codebase that reads as if one person wrote the whole thing — not a team of people using an agent(s). LLMs can make this consistency hard to maintain, which is why tools like linters are essential. Run these tools as code is being generated. Fix issues as you go, not after the fact.

**Repository Best Practices:** Practice good repo hygiene. Make sure your repository is properly updated with frequent and clear commits. Clean up junk files, use `.gitignore`, and keep your workspace clean as the TAs will look at it later.

### Consistent harness usage

- You must always use the same harness you start with.
- Explain your rationale for which model you use within your agent (i.e. Why Opus vs. Sonnet vs. Haiku).
- You are free to change your strategy as you go along. If you do, make sure to log your change (and reason for it) in your log documentation.

---

## 6. Final Product & Presentation

Work until you are satisfied that you have built a significantly better slot machine than you had before, and that it adheres to the software engineering basics mentioned to the best of your ability.

- You can stop the process after a minimum of **20 entries in your log**. However, there is no limit on the number of turns you can take after that (try not to go into debt) as long as you are finished prior to **Wednesday April 22, 11:59PM**.
- Once you are done, create a directory called `final-report` in your repository.
- Write a final report distilling your findings about the process of engineering with AI and save it as `FINAL-REPORT.md`.
- A good report will have extensive coverage on your process, your data, and meaningful discussion on your results with easy to follow formatting.
- Refer to Lab 1 and 2 on how to make use of Markdown formatting to make your report readable.
- Summarize your report into a presentation.
- The presentation should be a set of **4-7 slides max**. Include your slide deck as a PDF in your `final-report` directory.
- You may include a short video demo of the final candidate and/or its code.
- A video of your presentation is required and may be **no longer than 4 minutes**.
- Presentation matters — if you choose to present your slides in your video, make sure your audience can see them.
- Make sure your audio is clean and listenable.
- The best presentation will be selected by the team's mentor TA and reviewed in class or Slack. Honorable mentions may also be selected.

---

## A Final Note

Other than being a slot machine and adhering to the software engineering minimums you are welcome and encouraged to be experiment in this warm-up — this is by design.

We are practicing ideation at a small scale and forcing you to work on both creative and technical problems without a predefined rubric. As such we expect some folks to feel quite lost.

That is okay.

Reach out to the TAs or even to other teams and strategize. Feel free to ask questions to other teams in the general Slack channel.

We also are fine with many different approaches in using AI. We expect to see some wildly different outcomes. If you find you are having a different experience than other teams that doesn't mean you are "wrong".

I may have a particular hypothesis about what is likely to happen here and you may as well, but none of us should be too hasty in our conclusions or disappointment or validated by the data we collect.

Aim to be neutral and open.

As SWEs in training we must not take faith-level views here about AI in the dev process.
