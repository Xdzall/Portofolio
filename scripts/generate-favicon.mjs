/**
 * Generate portfolio favicons using the installed Lucide BriefcaseBusiness.
 * Requires sharp; pass its package directory as the first argument when the
 * bundled runtime supplies it instead of this project's node_modules.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BriefcaseBusiness } from "lucide-react";

const require = createRequire(import.meta.url);
const sharp = require(process.argv[2] || "sharp");
const publicDir = resolve(dirname(fileURLToPath(import.meta.url)), "../public");
const glyph = renderToStaticMarkup(
  React.createElement(BriefcaseBusiness, {
    width: 48,
    height: 48,
    x: 8,
    y: 10,
    stroke: "#f4f3ed",
    strokeWidth: 1.9,
  }),
);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" role="img" aria-label="Ghazali portfolio">
  <rect width="64" height="64" rx="15" fill="#18312c"/>
  ${glyph}
</svg>
`;

await mkdir(publicDir, { recursive: true });
await writeFile(resolve(publicDir, "favicon.svg"), svg);
for (const [filename, size] of [
  ["favicon-32.png", 32],
  ["apple-touch-icon.png", 180],
]) {
  await sharp(Buffer.from(svg), { density: 288 })
    .resize(size, size)
    .png()
    .toFile(resolve(publicDir, filename));
  process.stdout.write(`${filename}: ${size}x${size}\n`);
}
process.stdout.write("favicon.svg: 64x64 vector\n");
