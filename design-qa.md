# Design QA — Ghazali portfolio

final result: passed

Verified 9 October 2026. No actionable P0/P1/P2 findings remain within the requested scope.

## Visual truth and evidence

The five-page UI follows https://portfolio.gugum.my.id/. Own identity, Panasonic experience, AutoChef and the male Perseus sculpture are preserved. Ivory/teal and forest/teal palettes, brighter lighting and removal of explicit anatomy are intentional changes requested by the user.

Evidence root: `design-evidence/gugum-ui/`.

- Source: `source-{home,about,experience,projects,contact}-{desktop,mobile}.png`.
- Final implementation: `themes/{light,dark}-{home,about,experience,projects,contact}-{desktop,mobile}.png`.
- Combined source/light/dark inputs opened and inspected: `themes/qa-triple-{home,about,experience,projects,contact}-{desktop,mobile}.jpg`.
- Focused controls: `themes/qa-triple-{nav,form,card}.jpg`.
- Focused lighting/geometry: `themes/qa-final-face.jpg`, `themes/qa-final-pelvis-angles.jpg`, `themes/qa-four-orbit.jpg`.
- Scrolled comparisons: `themes/qa-final-{home-sculpture,about-lower,experience-lower,projects-lower,projects-menu}-mobile.jpg`.
- Extra states: `themes/sculpture-fallback-desktop.png`, `themes/dark-contact-small.png`.

Desktop captures: 1440 × 900 CSS and image pixels. Mobile: 390 × 844; narrow check: 320 × 700. Captures use density 1 and were compared without rescaling. Comparison sheets add a label strip. The user's initial screenshot uses a different viewport and identifies the lighting problem, rather than a spacing target.

States include loaded home, both themes on all routes, paused orbit, lower content, RKD dropdown, contact controls and model-load failure. Focused crops were needed for small UI text, face shading and mesh continuity.

## Comparison history and resolved findings

1. **[P2, resolved] Sculpture detail was too dark.** Warm stone material and directional key/rim/fill lighting replace the black treatment. The first bright iteration washed out highlights; reduced exposure and ambient/fill intensity restored face, torso and cloth detail. Final face and orbit comparisons preserve shading in both themes.
2. **[P2, resolved] Explicit anatomy remained on the scan.** Local smoothing changes 438 vertices in a small pelvis region, retains topology and welds seam vertices. The decoded-mesh check verifies unchanged positions elsewhere. Four browser angles show smooth removal without visible holes. The fallback photo uses an upper-body crop.
3. **[P2, resolved] Mobile theme control overlapped Send Message.** It now shares the header row with navigation. Compact spacing and a Home icon keep the 44 px control visible at 320 px. Revised Contact screenshots show an unobstructed CTA.
4. **[P2, resolved] Panasonic metadata was cramped.** Mobile company/date metadata now stacks into separate rows; revised Experience comparisons are readable.
5. **[P2, resolved] Teal small text lacked contrast on tinted fills.** A separate accent-text token gives checked ratios of badge 5.36:1 light / 5.83:1 dark, dropdown hover 5.45 / 5.00, and placeholders 4.52 / 6.37. Muted text also exceeds 4.5:1.
6. **[P2, resolved] Narrow navigation overflow.** Responsive spacing fits navigation and theme control within the 314 px body at a 320 px viewport.
7. A manual theme override ref preserves the session choice when storage fails, even after a system-theme change.
8. **[P2, resolved] Updated AutoChef landing screenshot was cropped.** Its wide image now uses `object-fit: contain` without hover enlargement, preserving the logo and heading within the project slot in both themes.

## Required fidelity surfaces

- **Typography:** local Inter/JetBrains Mono preserve hierarchy, labels and card density; personal text wraps naturally. Mobile navigation is compact to accommodate the theme control.
- **Layout:** floating pill, desktop split hero/contact, project grid, alternating experience cards and mobile stacking remain coherent. No horizontal overflow was observed at 390/1440 px; the narrow header also fits at 320 px.
- **Colors:** both palettes cover all surfaces, borders, forms, dropdowns, icons, focus states and native form color-scheme. Requested color differences are intentional. Checked primary, secondary, placeholder and CTA text contrast passes.
- **Assets:** the real compressed museum scan remains interactive. Face/hair/cloth details are visible. Genuine shared screenshots and social icons remain; AutoChef uses the user's own image and current Vercel link.
- **Content:** personal identity, CV, education, Panasonic, TapInAja, AutoChef and shared team projects remain in resume data. No teammate identity or employment was substituted.

## Functional checks

- Both theme choices persist after reload and route navigation. The explicit saved choice overrides an emulated system preference change. Enter toggles the theme and its accessible state updates.
- Initial system fallback and pre-paint bootstrap were checked in code. Storage failure retains the manual session choice.
- Theme changes keep the scene ready. Drag/keyboard orbit, Home reset and pause work. Emulated reduced-motion startup is paused.
- Temporarily blocking the model request shows the upper-body fallback and hides the empty canvas/orbit controls. Removing the test block and reloading restores the model.
- Navigation/history, dropdown dismissal, email copy, required/email validation and trimmed-message validation were checked. Contact submission prepares a draft for the visitor to send; no message was sent.
- Lower About, skills, project cards and RKD dropdown were inspected in both palettes.

## Build and limits

- Production build and static route entries: passed.
- Targeted ESLint for App, SculptureScene, mesh helper, route-entry script and config: passed.
- `git diff --check`: passed.
- Final normal-size in-app preview: home ready, dark theme active, no overflow, and no console errors returned.
- User-facing light/dark proof: `design-evidence/gugum-ui/themes/final-preview.jpg` (1760 × 586 comparison; source captures are 1440 × 900).
- Vite reports a roughly 646 KB lazy Three.js chunk / 166 KB gzip. The scene remains lazy-loaded.
- Repository-wide lint includes pre-existing legacy-component errors; changed files pass.
- Hardware-specific GPU failures were not exhaustively simulated. Model-load failure was tested; WebGL creation/context-loss handling was reviewed.

No deployment was performed. Local preview: http://127.0.0.1:5173/.

## Checklist

- [x] Preserve reference UI and personal content.
- [x] Add persistent light/dark themes.
- [x] Improve lighting without blown highlights.
- [x] Remove explicit anatomy in the rendered mesh and fallback view.
- [x] Verify responsive controls, orbit angles and production build.
