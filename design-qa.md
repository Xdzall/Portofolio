# Design QA — Ghazali portfolio

final result: passed

## Scope and visual evidence

Adaptation of https://musee.barvian.me/ into the existing personal portfolio, with a male sculpture as explicitly requested. This is an independent portfolio implementation, not a pixel-identical museum clone.

- Source truth: `design-evidence/reference-desktop.png`, `design-evidence/reference-mobile.png`.
- Implementation: `design-evidence/portfolio-desktop.png`, `design-evidence/portfolio-mobile.png`.
- Combined comparison inputs, opened and visually inspected: `design-evidence/comparison-desktop.jpg`, `design-evidence/comparison-mobile.jpg`.
- Extra interaction evidence: `design-evidence/project-mobile.png`.
- Desktop CSS viewport: 1440 × 900. Browser screenshot exports: source 1425 × 891, implementation 1435 × 897; normalized to 1440 × 900 for comparison.
- Mobile CSS viewport: 390 × 844. Browser screenshot exports: source 375 × 812, implementation 385 × 833; normalized to 390 × 844 for comparison. Export scaling was normalized before judging layout; it is not a site overflow issue.
- State: home/hero, model fully loaded. Detailed projects, experience, navigation dialog, and contact were also inspected in the in-app browser.

## Findings and comparison history

1. Initial implementation: the top of Perseus was clipped and the sculpture was too bright. Camera distance/target height, model rotation, material color/roughness, and bloom were adjusted. The final desktop and mobile images show the male face and upper body clearly with a dark sculptural treatment. Resolved.
2. Long-page navigation: the initial header disappeared after scrolling. Header now stays fixed, with a dark background over lower sections. Desktop and mobile navigation/dialog interactions were rechecked. Resolved.
3. Pause initially returned the camera to the first pose. It now retains the current pose, stops pointer and scroll-driven motion, and resumes when enabled. The reduced-motion startup uses the intended initial rotation. Resolved.
4. Final combined comparisons show no actionable P0/P1/P2 findings within the requested adaptation scope.

## Required fidelity surfaces

- Typography: Baskerville/Times New Roman display typography follows the source serif direction. Inter replaces the source's proprietary Cera font. Large, overlapping editorial headlines and compact uppercase navigation are retained. Italic words are an intentional portfolio variation.
- Layout: full-viewport sculptural hero, fine vertical grid, left chapter indicators, right-aligned desktop headline and narrow description. Mobile uses a single-column hero and accessible menu. No horizontal overflow was observed at 390 px.
- Colors: near-black background, dark metallic sculpture, pale text, white halo, and small blue active-navigation accents. Halo softness and statue framing are intentionally adapted to Perseus's different silhouette.
- Image quality: actual locally bundled 3D museum scan, not a flat imitation. Local Draco decoder and local fallback photograph. Perseus replaces Venus as requested; the male subject and its pose account for deliberate crop/composition differences. Face, sculpture surface, and text were inspected in full-size browser screenshots as well as the combined comparison.
- Content: original profile, education, five projects, experience, programming skills, collaboration skills, spoken languages, GitHub, LinkedIn, and email retained through the shared resume data. Museum copy replaced with portfolio content. No invented employment or projects.

## Functional checks

- Hero CTA navigates to selected work; chapter indicator updates.
- Money Tracker details open and expose the correct repository URL.
- AutoChef details work on mobile and expose the existing live-project URL.
- Skill disclosure expands and displays the saved language list.
- Navigation dialog opens; initial focus moves inside; Escape closes and returns focus. Mobile menu navigation closes the dialog and reaches the selected section.
- Copy email reports Copied; mailto and social destinations match resume data. No email was sent.
- Pause/resume control updates its accessible state; motion is driven by scroll/pointer when enabled.
- Desktop and mobile 3D loading reach data-scene-status=ready.
- GPU resources/listeners are disposed on unmount. Context loss stops the render loop and shows the local image fallback.

## Build and console

- `npm run build`: passed. Vite reports a large Three.js lazy chunk (approximately 642 KB uncompressed / 165 KB gzip); the initial page bundle is approximately 54 KB gzip.
- `npx eslint src/App.jsx src/components/3d/SculptureScene.jsx eslint.config.js`: passed.
- `git diff --check`: passed.
- Repository-wide ESLint: 261 errors and 1 warning in unchanged legacy components, which are retained but no longer rendered by App. Vendor Draco code is excluded from lint.
- During development a transient HMR syntax failure was corrected; the final code builds and loads. An environment shader precision warning appeared without affecting rendering; deprecated Clock usage was replaced.

## Residual test limits

Hardware-specific WebGL failures and OS-level reduced-motion emulation were not forced in browser automation. Fallback paths and reduced-motion initialization were reviewed in code. Mail clients and external project availability were not tested by submitting anything. Further asset simplification could reduce download size, but is optional polish.

## Implementation checklist

- [x] Replace space theme with sculptural editorial portfolio.
- [x] Use an actual male statue in Three.js.
- [x] Preserve portfolio content and working navigation/contact links.
- [x] Verify desktop and mobile visual composition and primary controls.
- [x] Keep the local preview available; do not deploy without a publishing request.

Final clean-tab verification: scene ready, no horizontal overflow, and zero console errors in a newly opened preview tab. Preview remains open at http://127.0.0.1:5173/.
