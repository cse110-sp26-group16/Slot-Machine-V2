# Wireframing and UI Sketching Research

## What is a Wireframe?

A wireframe is a **low-fidelity visual guide** that represents the skeletal framework of a digital interface. In the context of our slot game, it acts as a blueprint to arrange elements like the reels, balance display, and buttons without getting distracted by colors, fonts, or complex animations.

The primary goal is to prioritize **functionality and user flow** over aesthetics. By stripping away the "polish," we can identify if the layout is intuitive or if the "Spin" button is too far from the "Bet" controls.

## UI Sketches vs. Digital Wireframes

The research suggests a two-step approach to the design process:

* **UI Sketches (Hand-drawn):** These are fast, messy, and disposable. They allow for rapid brainstorming of different layouts (e.g., placing the prize table on a separate screen versus an overlay).
* **Digital Wireframes (Mid-fidelity):** Tools like Figma or Balsamiq are used to create more precise versions. These establish consistent spacing, alignment, and "hit zones" for buttons.

## Essential Components for the Slot Interface

Based on the mechanics research, our wireframes must include specific "zones" to ensure the player has all the necessary information:

1.  **The Play Area:** The central focus where the reels (usually a 3x3 or 3x5 grid) are located.
2.  **The Dashboard:** A dedicated area for the balance, current bet amount, and the most recent win.
3.  **Action Buttons:** Large, accessible buttons for "Spin," "Max Bet," and "Auto-play."
4.  **Information Layer:** A way to access the Paytable and RTP settings, usually tucked into a "hamburger" menu or an "i" icon.

## User Flow and Hierarchy

A common mistake in UI design is making every element compete for attention. In a slot game, the **visual hierarchy** should guide the eye in a specific order:
* **Step 1:** Check Balance/Bet (Dashboard)
* **Step 2:** Initiate Action (Spin Button)
* **Step 3:** Watch Outcome (Reels)
* **Step 4:** Confirm Result (Win Display)

Wireframes help us test this "loop" to ensure the eye isn't jumping erratically across the screen.

## Why We Use Low-Fidelity First

Starting with simple boxes and labels prevents "design lock-in." It is much easier to delete a square drawn on a napkin than it is to refactor a fully styled CSS component. 

* **Clarity:** It ensures the team agrees on *where* things go before we argue about *how* they look.
* **Efficiency:** It identifies "dead ends" in the navigation (e.g., getting stuck in a settings menu with no back button).
* **Accessibility:** We can plan for larger tap targets and high-contrast layouts from the very beginning.

## Implementation for the AI Workflow

Since we are utilizing AI tools to generate the final code, the wireframe serves as our **prompting anchor**. Instead of asking the AI to "make a slot game," we can use the wireframe to provide specific structural instructions:

> "Create a layout with a central 3x5 grid, a bottom-docked status bar for the balance, and a large circular spin button on the right-hand side."

## Takeaways for the Project

* **Iterate on paper first:** Don't touch the computer until the layout "loop" feels natural.
* **Standardize button placement:** Keep the most important actions within thumb's reach for mobile users.
* **Define states in the wireframe:** Sketch out what the screen looks like during a "Big Win" overlay versus a standard spin.
* **Don't overcomplicate:** A clean, empty layout is better than one cluttered with unnecessary icons.

## Sources

1. https://www.nngroup.com/articles/draw-wireframe-even-if-you-cant-draw/
2. https://www.interaction-design.org/literature/topics/wireframing
