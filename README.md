## Development Session — November 24, 2026

### Today's Goal
Set up the RT Tracker project files and build the main user interface layout (top bar, timeframe switcher, daily goal card, and stats row).

### What I Worked On
- Created `index.html`, `style.css`, `script.js`, and `README.md` with the HTML boilerplate.
- Built the dark top header bar with `Streak 0` and interactive `D`, `W`, and `M` buttons.
- Built the central `RT Tracker` title and `Daily running goal: 5,000 steps` card.
- Prepared the bottom `Steps 0` and `Km 0` counters.

### Features Completed
- **Feature 0 — Project Setup:** Completed and committed.
- **Feature 1 — Top Streak Bar & Timeframe Switcher (D / W / M):** Completed and committed.
- **Feature 2 — Main Title & Daily Goal Card:** Completed and committed.
- **Feature 3 — Steps & Kilometers Display:** In progress (HTML/CSS provided; needs final Live Preview verification and commit).

### Code Connection
- **Concept:** DOM Manipulation (`document.getElementById()` and `.textContent`)
- **What it does:** Allows JavaScript to find a specific HTML element by its `id` and update the text displayed on the webpage when a button is clicked.
- **My understanding:** [Add a quick sentence in your own words about how clicking D, W, or M changes the text on screen!]

### Testing
- **What I tested:** Tested the HTML boilerplate, `D / W / M` timeframe buttons, and central goal card in Live Preview.
- **Result:** Confirmed Features 0, 1, and 2 displayed properly. Feature 3 (`Steps 0` and `Km 0`) is not yet verified in Live Preview.

### Debugging
- **Problem:** Checked `index.html` structure while adding Feature 3.
- **What I tried:** Verified existing Feature 1 and Feature 2 HTML tags were valid and identified where to insert the Feature 3 `.stats-row` block.
- **Current status:** Resolved; ready to test Feature 3.

### AI Assistance
- Gemini helped break the PDF design into small features, provided commented HTML/CSS/JavaScript for Features 0–3, and helped check `index.html` structure.

### Next Session
1. Save and verify **Feature 3 (`Steps 0` and `Km 0`)** in Live Preview, then commit it to GitHub.
2. Build **Feature 4 — GPS Run Tracking & Step Calculation** (`navigator.geolocation` + test run button).