/**
 * Encode transparent sculpture captures at original size with lossless alpha.
 * Pass sharp's package directory as the first argument when using the bundled
 * runtime rather than a local installation of sharp.
 */
import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require(process.argv[2] || "sharp");
const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = resolve(rootDir, "design-evidence/mobile-performance");
const outputDir = resolve(rootDir, "public/images");

await mkdir(outputDir, { recursive: true });
for (const theme of ["light", "dark"]) {
  const input = resolve(sourceDir, `poster-${theme}.png`);
  const output = resolve(outputDir, `sculpture-poster-${theme}.webp`);
  const result = await sharp(input)
    .webp({ quality: 88, alphaQuality: 100, effort: 6 })
    .toFile(output);
  process.stdout.write(
    `${output}: ${result.width}x${result.height}, ${result.size} bytes\n`,
  );
}
