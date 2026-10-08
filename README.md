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
- `public/models/perseus.glb`: 3.75 MB compressed museum scan.
- `public/models/draco/`: local geometry decoder; no runtime decoder CDN required.
- `public/credits.txt`: sculpture provenance and design credits.

The Three.js module is lazy-loaded. Warm stone material, a directional key light, cool rim light, and softer fill reveal the sculpture's details. Lights and halo colors adapt to the active theme without reloading the model. The scene respects the system reduced-motion preference, supports pausing, and stops rendering in hidden tabs. Drag horizontally or use arrow keys to orbit; Home resets the view. Vertical touch swipes preserve page scrolling. A local sculpture image is used if WebGL or model loading fails. Inter and JetBrains Mono are hosted locally with their OFL licenses.

The theme initially follows the system preference. The sun/moon control changes it and saves the choice in local storage. An early head script applies the saved theme before the first paint. Both themes cover all five pages and native form controls.

The contact form validates fields and opens an email draft addressed to Ghazali; it does not send messages through a server. Copy email, personal social links, the local CV, and project links are functional. AutoChef is deployed live on Vercel (https://autochef.vercel.app/) with its authentic landing page preview, and its backend repository remains linked.

Routes are `/`, `/about`, `/experience`, `/projects`, and `/contact`. The build creates an HTML entry for each route so direct links and refreshes work on static hosts with directory-index support. Legacy section hashes are mapped to their corresponding pages.

## Validation

Production build and targeted ESLint pass. Desktop and mobile browser checks are recorded in `design-qa.md`. The repository-wide lint command also checks the retained legacy portfolio components; those currently have pre-existing errors. Vendor decoder files are excluded from ESLint.

No deployment is performed by this change.
