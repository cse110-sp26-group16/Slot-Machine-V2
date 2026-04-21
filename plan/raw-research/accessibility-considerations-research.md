# Accessibility Considerations

## Why Accessibility Matters in This Experiment

Accessibility isn’t just something extra to add at the end—it’s part of what makes software actually usable. For this assignment, it’s also a good way to judge how useful AI tools really are. If the code we generate looks nice but ignores accessibility, or if we have to constantly fix it ourselves, that tells us something important about the limits of these tools.

Since we’re building a slot machine-style game with lots of animation and feedback, it’s pretty easy to accidentally make something that looks cool but is hard (or impossible) for some people to use.

---

### 1. Motion and Animation

Slot games rely a lot on animation, but too much can be a problem:

- constant motion can be distracting
- flashing effects can be uncomfortable
- long or chaotic animations make the game harder to follow

**What to aim for:**

- keep animations short and simple
- avoid flashing or rapid blinking
- support reduced motion (using `prefers-reduced-motion`)
- make sure the game still makes sense without animation

---

### 2. Clear Feedback

If feedback is only visual, some users will miss important information.

**What to aim for:**

- always pair animation with text (e.g., “Win”, “Try Again”)
- use multiple signals (color + text + layout changes)
- make results clear even if animations are turned off

---

### 3. Color and Contrast

Bright colors are common in slot-style games, but they can hurt readability.

**What to aim for:**

- keep strong contrast between text and background
- don’t rely only on color to show outcomes
- use colors consistently (e.g., wins always look the same way)

---

### 4. Keyboard Accessibility

A lot of generated UIs assume mouse input only, which is limiting.

**What to aim for:**

- make sure all actions (spin, reset, etc.) work with a keyboard
- include visible focus states
- keep tab navigation logical and predictable

---

### 5. Structure and Screen Readers

AI often generates layouts with lots of generic `<div>` elements, which don’t help accessibility.

**What to aim for:**

- use semantic HTML (`button`, `main`, `section`, etc.)
- label controls clearly
- announce important updates like results or balance changes
- don’t rely only on visual layout to explain what’s happening

---

### 6. Timing and Readability

If everything happens too fast, users can’t keep up.

**What to aim for:**

- give players enough time to read results
- don’t rush transitions between states
- make reel stopping and outcomes easy to follow

---

## Using Accessibility in Prompts

If we want better results from AI, we have to be specific. Accessibility won’t just happen on its own.

**Examples of better prompts:**

- “Make all controls keyboard accessible with visible focus states”
- “Use semantic HTML and include ARIA labels where needed”
- “Respect prefers-reduced-motion and offer a low-motion version”
- “Do not rely on color alone to communicate results”

Being clear like this should lead to more consistent output.

---

## Why This Matters for the Experiment

Accessibility connects directly to the goals of this assignment:

- **Challenges with AI:** it often skips important usability details
- **Planning:** accessibility needs to be considered early
- **Prompt quality:** better instructions lead to better results
- **User focus:** accessibility forces us to think about different users
- **Team consistency:** everyone needs to follow the same patterns

---

## Takeaways

- Motion and animation should support understanding, not distract from it
- Important information (like results or wins) needs to be clear without relying on a single cue
- Interfaces should work with different input methods, not just a mouse
- Structure and semantics matter for users who rely on assistive technologies
- Slowing things down slightly can make the game easier to follow and more usable

Overall, accessibility comes down to making sure the game is clear, readable, and usable for as many people as possible.
