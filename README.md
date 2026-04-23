# Slot-Machine-V2
Tech Warmup II Assignment

More info about the research part is in `plan/research-overview.md`

## Running the App

This is a static site, but it uses ES modules, so you need to serve it over HTTP (opening `index.html` directly via `file://` will not work).

From the project root, pick one:

```bash
# Option 1: Python (no install needed on macOS/Linux)
python3 -m http.server 8000 --directory src

# Option 2: Node (uses npx, no global install)
npx serve src
```

Then open the URL printed in the terminal (e.g. `http://localhost:8000` for Python, or whatever port `serve` reports).

To stop the server, press `Ctrl+C` in the terminal.
