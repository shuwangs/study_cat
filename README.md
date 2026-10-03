# study_cat

StudyCat is a prototype Chrome extension that combines a focus timer with a cat companion and distraction reminders.

- [Current project status and release backlog](PROJECT_STATUS.md)
- [Implementation issues: complete product plan](docs/issues/README.md)
- [Code review, design recommendations, and publishing plan](docs/PROJECT_REVIEW.md)
- [Historical milestones](milestones.md)

The current source is not yet ready for public release. See the status tracker for implemented features, known gaps, and release acceptance checks.

## Build and Run Locally

### Prerequisites

- Install Node.js and npm.
- Install Google Chrome.
- Open a terminal in the project root (the folder containing `package.json` and `manifest.json`).

### 1. Install dependencies

```bash
npm ci
```

This installs the versions recorded in `package-lock.json`. Run it after cloning the project or when the dependency lockfile changes.

### 2. Compile the extension

```bash
npm run build
```
Build successfully before loading the extension.
This command does not start a web server or publish the extension.

### 3. Load in Chrome

1. Open `chrome://extensions` in Chrome.
2. Turn on **Developer mode**.
3. Click **Load unpacked**.
4. Select the **project root folder** containing `manifest.json`, not the `dist/` folder.
5. Open Chrome's Extensions menu, pin **StudyCat - Focus Companion**, and click its icon to open the popup.

### 4. Apply code changes

1. Edit the source files in `src/`; do not edit generated JavaScript in `dist/`.
2. Run `npm run build` again after TypeScript changes.
3. Return to `chrome://extensions` and click **Reload** on the StudyCat card.
4. Close and reopen the popup to see the updated version.

Changes to popup HTML/CSS or `manifest.json` do not need TypeScript compilation, but reload the extension and reopen the popup afterward.


## Technology Used
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS"> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML"> <img src="https://img.shields.io/badge/Google_chrome-4285F4?style=for-the-badge&logo=Google-chrome&logoColor=white" alt="Chrome Extension">




## Author
Shu Wang
