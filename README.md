# From Idea to Interactive Learning — Gemini Canvas for Educators

A static, GitHub Pages-ready interactive workshop deck. The molecular movement is real-time canvas rendering: learners can drag/swipe to rotate the VSEPR models, zoom, pause auto-rotation, switch molecules, and show/hide lone-pair domains.

## Structure

- `index.html` — workshop presentation markup
- `css/styles.css` — responsive presentation styles
- `js/app.js` — deck navigation, VSEPR prediction activity, stoichiometry tutor, appendix
- `js/molecule-viewer.js` — interactive 3D-projected molecular viewer
- `data/molecules.json` — molecular geometry data for CH4, NH3 and H2O
- `assets/favicon.svg` — site icon
- `manifest.webmanifest` — installable web-app metadata
- `.github/workflows/deploy-pages.yml` — GitHub Pages deployment workflow
- `.nojekyll` — serve files directly without Jekyll processing

## Deploy on GitHub Pages

1. Create an empty GitHub repository.
2. Upload the contents of this folder to the repository root.
3. Commit/push to the `main` branch.
4. In **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**.
5. The included workflow deploys the site automatically on every push to `main`.

## Run locally

For the complete experience, serve the folder with a local web server rather than double-clicking `index.html`, because browsers may block local JSON requests from `file://` URLs.

Python example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

The molecule viewer contains an embedded fallback dataset, so it still works if the JSON request is unavailable.

## Molecular interaction

- Drag or swipe the molecule to rotate it in 3D.
- Use the mouse wheel or Zoom slider to change scale.
- Pause/resume automatic rotation.
- Show/hide lone-pair electron domains.
- Switch among CH4, NH3 and H2O.
- Arrow keys rotate the focused canvas for keyboard access.

The models are educational VSEPR representations. CH4 uses tetrahedral geometry; NH3 and H2O use approximate experimental bond angles for teaching, with lone-pair domains shown schematically.
