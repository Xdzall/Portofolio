# UI reference adaptation

- Reference: https://portfolio.gugum.my.id/
- Preserved: personal identity, own CV, GPA 3.56, AutoChef, Panasonic experience, TapInAja co-founder work, existing male Perseus GLB.
- UI: Inter typography, centered floating pill navigation, five pages, alternating experience cards, skill matrix, two-column project cards, RKD dropdown, contact form and copy email.
- Theme update: ivory/teal light mode and forest/teal dark mode across all pages. Sun/moon control saves the visitor's choice; first visit follows the system preference. Warm stone sculpture material, directional lighting and halo colors adapt to the theme without recreating the model.
- Own technical-focus information replaces teammate-only certificates.
- Source screenshots and responsive comparisons: `design-evidence/gugum-ui/`.
- Local shared-project screenshots and social icons were extracted from the public team reference. Inter and JetBrains Mono fonts are hosted locally with official OFL licenses.
- Authentic AutoChef landing page screenshot was captured from its live deployment on Vercel (https://autochef.vercel.app/).
- AutoChef is live at https://autochef.vercel.app/, with its Live button pointing to the deployment and the backend repository linked in the codebase.
- Contact form opens a mailto draft to the user's own address after native and trimmed-message validation. No third-party form recipient or teammate API key is used. Sending is completed by the visitor in their email app.
- The Three.js scene now has transparent background, drag/keyboard orbit, Home reset, pause/reduced motion, local loading/fallback assets and GPU cleanup.
- Static route entry files are generated after Vite build for direct links and refreshes.
- `npm run build` and targeted ESLint passed. Browser tests and final visual results are in `design-qa.md`.
