import { mkdir, readFile, writeFile } from "node:fs/promises";
import {
  education,
  experience,
  profile,
  projects,
} from "../src/data/resume.js";

// Each route gets a real HTML entry so direct links and refreshes work on
// static hosts. The entry also carries route-specific SEO tags and a static
// text version of the page, so crawlers and link previews see content before
// (or without) JavaScript. React replaces the static markup when it mounts.

const SITE = "https://portofolio.mghazali.my.id";
const OG_IMAGE = `${SITE}/og-image.png`;
const output = new URL("../dist/", import.meta.url);

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const list = (items) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
const link = (href, label) => `<a href="${esc(href)}">${esc(label)}</a>`;

const nav = `<nav>${[
  ["/", "Home"],
  ["/about", "About"],
  ["/experience", "Experience"],
  ["/projects", "Projects"],
  ["/contact", "Contact"],
]
  .map(([href, label]) => link(href, label))
  .join(" · ")}</nav>`;

const contactLinks = `<p>${[
  link(`mailto:${profile.email}`, profile.email),
  link(profile.linkedin, "LinkedIn"),
  link(profile.github, "GitHub"),
].join(" · ")}</p>`;

const experienceHtml = experience
  .map(
    (job) =>
      `<article><h3>${esc(job.role)} — ${esc(job.company)}</h3><p>${esc(job.period)} · ${esc(job.tech.join(", "))}</p>${list(job.points)}</article>`,
  )
  .join("");

const projectsHtml = projects
  .map((project) => {
    const links = [
      project.live && link(project.live, "Live site"),
      project.github && link(project.github, "Source code"),
    ].filter(Boolean);
    return `<article><h3>${esc(project.name)}: ${esc(project.subtitle)}</h3><p>${esc(project.role)} · ${esc(project.tech.join(", "))}</p><p>${esc(project.description)}</p>${list(project.points)}${links.length ? `<p>${links.join(" · ")}</p>` : ""}</article>`;
  })
  .join("");

const educationHtml = `<p>${esc(education.institution)} — ${esc(education.degree)}, ${esc(education.period)}, GPA ${esc(education.gpa)}</p>`;

const shortSummary =
  "Full Stack Developer from Surabaya and PENS Informatics Engineering graduate";

const routes = [
  {
    path: "/",
    title: `${profile.name} — Full Stack Developer`,
    description: `${shortSummary}, building manufacturing systems at PT Panasonic Manufacturing Indonesia, the TapInAja NFC platform, and client web portals.`,
    body: `<h1>${esc(profile.name)}</h1><p>${esc(profile.title)} · Surabaya, Indonesia</p><p>${esc(profile.summary)}</p>${contactLinks}`,
  },
  {
    path: "/about",
    title: `About — ${profile.name}`,
    description: `About ${profile.name}: ${shortSummary.toLowerCase()} working with C#, ASP.NET, Blazor, Vue, Next.js, SQL Server, and PostgreSQL.`,
    body: `<h1>About ${esc(profile.name)}</h1><p>${esc(profile.summary)}</p><h2>Education</h2>${educationHtml}`,
  },
  {
    path: "/experience",
    title: `Experience — ${profile.name}`,
    description: `Experience of ${profile.name}: Full Stack Developer Intern at PT Panasonic Manufacturing Indonesia, co-founder of TapInAja, and freelance web developer.`,
    body: `<h1>Experience</h1>${experienceHtml}`,
  },
  {
    path: "/projects",
    title: `Projects — ${profile.name}`,
    description: `Projects by ${profile.name}: ${projects.map((p) => p.name).join(", ")}.`,
    body: `<h1>Projects</h1>${projectsHtml}`,
  },
  {
    path: "/contact",
    title: `Contact — ${profile.name}`,
    description: `Contact ${profile.name}, Full Stack Developer in Surabaya, by email or LinkedIn.`,
    body: `<h1>Contact ${esc(profile.name)}</h1>${contactLinks}`,
  },
];

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: "Ghazali",
  jobTitle: profile.title,
  url: `${SITE}/`,
  image: OG_IMAGE,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Surabaya",
    addressCountry: "ID",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Politeknik Elektronika Negeri Surabaya (PENS)",
  },
  worksFor: { "@type": "Organization", name: experience[0].company },
  sameAs: [profile.linkedin, profile.github],
  knowsAbout: [
    "C#",
    "ASP.NET Core",
    "Blazor",
    "SQL Server",
    "Vue 3",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Docker",
  ],
};

const headTags = (route) => {
  const url = `${SITE}${route.path}`;
  return [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    `<meta name="author" content="${esc(profile.name)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${route.path === "/" ? "profile" : "website"}" />`,
    `<meta property="og:site_name" content="${esc(profile.name)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(profile.name)}, ${esc(profile.title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<script type="application/ld+json">${JSON.stringify(person).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
};

const template = await readFile(new URL("index.html", output), "utf8");
const titlePattern = /<title>[\s\S]*?<\/title>/;
const descriptionPattern = /<meta\s+name="description"[\s\S]*?\/>/;
const rootPattern = '<div id="root"></div>';
for (const pattern of [titlePattern, descriptionPattern]) {
  if (!pattern.test(template)) throw new Error(`index.html is missing ${pattern}`);
}
if (!template.includes(rootPattern)) throw new Error("index.html is missing the root element");

for (const route of routes) {
  const html = template
    .replace(descriptionPattern, "")
    .replace(titlePattern, headTags(route))
    .replace(
      rootPattern,
      `<div id="root"><main class="static-page">${nav}${route.body}</main></div>`,
    );
  const directory =
    route.path === "/" ? output : new URL(`${route.path.slice(1)}/`, output);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL("index.html", directory), html);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) =>
      `  <url><loc>${SITE}${route.path}</loc><lastmod>${today}</lastmod><priority>${route.path === "/" ? "1.0" : "0.8"}</priority></url>`,
  )
  .join("\n")}
</urlset>
`;
await writeFile(new URL("sitemap.xml", output), sitemap);
