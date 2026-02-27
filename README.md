# Gemini Chat Navigator (Scrub-Bar)

A minimalist, high-usability navigation sidebar for Google Gemini. This extension injects a vertical "scrub-bar" that allows you to instantly navigate through long conversations by hovering and clicking on query indicators.
## 🛠 Installation

### Option 1: Developer Mode (Recommended for Updates)
1. Clone this repository: `git clone https://github.com/your-username/gemini-nav-extension.git`
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the project folder.

### Option 2: Using the .crx File
1. Go to the [Releases](link-to-your-github-releases) page of this repository.
2. Download the `gemini-navigator.crx` file.
3. Open `chrome://extensions/` in your browser.
4. **Drag and drop** the `.crx` file directly onto the page to install.

## 📁 Project Structure
* `manifest.json`: Extension configuration and permissions.
* `content.js`: Core logic for DOM mutation observing and query scrubbing.
* `style.css`: Glassmorphism UI and hitbox layout.

## 🧩 Technical Note: The Hitbox Logic
To maintain a minimalist aesthetic without sacrificing precision, the extension uses a parent-child relationship for the navigation elements:
* **Wrapper (`.nav-item-wrapper`):** A 30px tall invisible container that captures mouse events.
* **Line (`.nav-line`):** A 3px tall visual indicator centered within the wrapper.

This ensures that "scrubbing" feels fluid—you don't have to hover exactly over the 3px line to trigger the preview.
