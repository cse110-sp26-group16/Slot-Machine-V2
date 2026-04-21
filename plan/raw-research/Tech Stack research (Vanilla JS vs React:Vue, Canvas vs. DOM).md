Tech Stack research (Vanilla JS vs React/Vue, Canvas vs. DOM)  

After researching whether we should use a framework like React or plain JavaScript for a slot machine, I concluded that vanilla JavaScript is sufficient. React would introduce additional code and complexity, which could make development more difficult without offering significant benefits for this project. The slot machine logic is fairly self-contained: the user spins, the system calculates wins, and the balance updates. This does not require frequent component re-rendering.

Additionally, the AI agents we are using will have an easier time generating vanilla JavaScript, reducing the likelihood of errors. One potential downside is that if we later add features such as user accounts or a leaderboard, the codebase could become harder to manage. However, for the core game, vanilla JavaScript is enough. Therefore, it makes sense to start with vanilla JS and consider adding React later if needed.

**Canvas vs. DOM Elements:**

 Choosing between Canvas and DOM elements is important for performance. If we build the reels using standard HTML `<div>` elements, performance may suffer during fast animations. Each symbol becomes a separate DOM element that the browser must track. For example, 30–50 elements per reel across multiple reels could lead to lag. Canvas works differently. It uses a single element where everything is drawn programmatically, allowing smoother animations. The reels can run at 60 FPS more easily. However, Canvas is harder to work with. For example, click detection must be handled manually, while the DOM provides built-in event handling. Because of this, the best approach is to combine both. Use Canvas for the spinning reels and animations, and use standard HTML/CSS for UI elements such as buttons, balance display, and settings

## Following is the recommended Tech Stack

*   Canvas for reels and spinning animations
*   Standard HTML/CSS for UI elements
*   Vanilla JavaScript for game logic
*   LocalStorage to persist user balance between sessions
*   Web Audio API for sound effects

How would this affect the script that we will give to the AI?

We have to be specific in our prompts. For example, if we just say “build a slot machine,” the AI might default to React or make the reels out of divs. However, we could be more specific in our prompt, like: “Use vanilla JS. Render the reels on an HTML canvas element with requestAnimationFrame. All UI elements like buttons and balance display should be regular DOM elements outside the canvas”. Giving this prompt to AI would create the slot matching using our specific description.

Work Cited:

“Canvas API.” _MDN Web Docs_, Mozilla, [https://developer.mozilla.org/en-US/docs/Web/API/Canvas\_API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API). Accessed 20 Apr. 2026.

“Document Object Model (DOM).” _MDN Web Docs_, Mozilla, [https://developer.mozilla.org/en-US/docs/Web/API/Document\_Object\_Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model). Accessed 20 Apr. 2026.

“Optimizing Canvas.” _MDN Web Docs_, Mozilla, [https://developer.mozilla.org/en-US/docs/Web/API/Canvas\_API/Tutorial/Optimizing\_canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas). Accessed 20 Apr. 2026.

“React Documentation.” _React_, Meta, [https://react.dev](https://react.dev). Accessed 20 Apr. 2026.

“Vue.js Guide.” _Vue.js_, [https://vuejs.org](https://vuejs.org). Accessed 20 Apr. 2026.

“Web Performance: Canvas vs DOM.” _web.dev_, Google, [https://web.dev/canvas-performance/](https://web.dev/canvas-performance/). Accessed 20 Apr. 2026.