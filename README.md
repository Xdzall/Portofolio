# Ghazali — sculptural portfolio

A React + Vite portfolio with the interface and page structure of the team's [reference portfolio](https://portfolio.gugum.my.id/). An ivory/teal light theme and forest/teal dark theme accompany the interactive male Perseus sculpture from the earlier Musee-inspired design.

## Run locally

```sh
npm install
npm run dev -- --host 127.0.0.1 --port 5173
npm run build
npm run preview
```

## Editing

- `src/data/resume.js`: profile, education, experience, projects, and skills.
- `src/App.jsx`: five pages, browser-history navigation, project links, contact form, theme switch, and motion control.
- `src/index.css`: responsive light/dark theme tokens, floating navigation, cards, and locally hosted fonts.
- `src/components/3d/SculptureScene.jsx`: orbit controls, scene lighting, material, loading/error handling, and GPU resource disposal.
- `src/components/3d/smoothSculpturePelvis.js`: localized mesh smoothing that removes explicit anatomy while preserving the sculpture's pose and drapery.
- `public/models/perseus.glb`: 3.75 MB compressed museum scan.
- `public/models/draco/`: local geometry decoder; no runtime decoder CDN required.
- `public/credits.txt`: sculpture provenance and design credits.

The Three.js module is loaded when the sculpture is needed. Phones, touch devices, low-memory devices, and data-saving connections start with a small themed preview of the same sculpture; select **Enable 3D** to load the interactive model. Desktop loads it automatically as the panel approaches the viewport. **Still view** releases the scene's GPU resources. Warm stone material, a directional key light, cool rim light, and softer fill reveal the sculpture's details. Lights and halo colors adapt to the active theme without reloading the model. The scene respects reduced motion, draws only on demand when paused, stops entirely in hidden tabs or outside the viewport, and caps mobile rendering at 30 fps with DPR 1. Drag horizontally or use arrow keys to orbit; Home resets the view. Vertical touch swipes preserve page scrolling. Load failures preserve the preview and offer retry; a failed JavaScript download offers a page reload. Inter and JetBrains Mono are hosted locally with their OFL licenses.

The theme initially follows the system preference. The sun/moon control changes it and saves the choice in local storage. An early head script applies the saved theme before the first paint. Both themes cover all five pages and native form controls.

The sculpture's pelvis is smoothed once during model loading. This changes a small vertex region without deleting faces or hiding anatomy behind the camera. Both lightweight previews are captured from that edited model, with unavailable 3D controls hidden.

Navigation keeps its sliding active indicator using a CSS transform, without loading Framer Motion on the current pages. Project screenshots use responsive WebP variants with lazy loading and asynchronous decoding. Mobile surfaces avoid large blur filters, form inputs use 16px text to prevent focus zoom, and controls have larger touch targets. The browser favicon and Apple touch icon use Lucide's BriefcaseBusiness glyph instead of a profile photograph.

`node scripts/check-scene-render-loop.mjs` checks render scheduling, frame caps, visibility, damping, and cleanup. `scripts/optimize-project-images.py` regenerates project WebP images with Pillow. `scripts/generate-favicon.mjs` and `scripts/optimize-sculpture-posters.mjs` accept an optional Sharp package path. Poster sources are in `design-evidence/mobile-performance`; the development-only `?capturePoster` mode exposes the rendered PNG and its theme through the scene's DOM attributes.

The contact form validates fields and opens an email draft addressed to Ghazali; it does not send messages through a server. Copy email, personal social links, the local CV, and project links are functional. AutoChef is deployed live on Vercel (https://autochef.vercel.app/) with its authentic landing page preview, and its backend repository remains linked.

Routes are `/`, `/about`, `/experience`, `/projects`, and `/contact`. The build creates an HTML entry for each route so direct links and refreshes work on static hosts with directory-index support. Legacy section hashes are mapped to their corresponding pages.

## Validation

Production build and targeted ESLint pass. Desktop and mobile browser checks are recorded in `design-qa.md`. The repository-wide lint command also checks the retained legacy portfolio components; those currently have pre-existing errors. Vendor decoder files are excluded from ESLint.

No deployment is performed by this change.
