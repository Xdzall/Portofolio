import { copyFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

// Real entry files keep direct links and refreshes working on static hosts.
const output = new URL("../dist/", import.meta.url);
for (const route of ["about", "experience", "projects", "contact"]) {
  const directory = new URL(`${route}/`, output);
  await mkdir(directory, { recursive: true });
  await copyFile(
    fileURLToPath(new URL("index.html", output)),
    fileURLToPath(new URL("index.html", directory)),
  );
}
