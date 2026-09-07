# Ghazali — sculptural portfolio

A React + Vite portfolio inspired by the dark editorial design and scroll-driven sculpture of [Musee](https://musee.barvian.me/). The central subject is a real 3D scan of Antonio Canova's male figure Perseus, rendered with an original dark material and luminous ring.

## Run locally

```sh
npm install
npm run dev -- --host 127.0.0.1 --port 5173
npm run build
npm run preview
```

## Editing

- `src/data/resume.js`: profile, education, experience, projects, and skills.
- `src/App.jsx`: portfolio sections, navigation dialog, project disclosures, contacts, and motion control.
- `src/index.css`: responsive editorial design.
- `src/components/3d/SculptureScene.jsx`: camera keyframes (`poses`), scene lighting, material, loading/error handling, and GPU resource disposal.
- `public/models/perseus.glb`: 3.75 MB compressed museum scan.
- `public/models/draco/`: local geometry decoder; no runtime decoder CDN required.
- `public/credits.txt`: sculpture provenance and design credits.

The Three.js module is lazy-loaded. The scene respects the system reduced-motion preference, supports pausing, and stops rendering in hidden tabs. A local sculpture image is used if WebGL or model loading fails. Section navigation, native project/skill disclosures, focus-trapped navigation, copy email, and real project/contact links work without a backend. Fonts use Inter with a system fallback and Baskerville/Times New Roman for display text.

## Validation

Production build and targeted ESLint pass. Desktop and mobile browser checks are recorded in `design-qa.md`. The repository-wide lint command also checks the retained legacy portfolio components; those currently have pre-existing errors. Vendor decoder files are excluded from ESLint.

No deployment is performed by this change.
