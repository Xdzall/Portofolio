import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Download,
  Pause,
  Play,
  Sun,
  Moon,
  House,
} from "lucide-react";
import {
  profile,
  education,
  experience,
  projects,
  skills,
} from "./data/resume";

const SculptureScene = lazy(() => import("./components/3d/SculptureScene"));
const pages = [
  ["/", "Home"],
  ["/about", "About"],
  ["/experience", "Experience"],
  ["/projects", "Projects"],
  ["/contact", "Contact"],
];
const projectImages = {
  TapInAja: "/projects/tapinaja.png",
  "PT Merdeka Sejahtera": "/projects/merdeka-sejahtera.png",
  AutoChef: "/projects/autochef-screen.png",
  "RKD Foundation Web Ecosystem": "/projects/rkd.png",
};
const skillGroups = [
  [
    "Frontend & Mobile",
    [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Vue 3",
      "Blazor",
      "Flutter",
      "Tailwind CSS",
    ],
  ],
  [
    "Backend & APIs",
    [
      "C#",
      "ASP.NET MVC",
      "ASP.NET Core",
      "Node.js",
      "Express.js",
      "Hono",
      "Laravel",
      "Python",
      "Go",
      "REST APIs",
      "WebSockets",
    ],
  ],
  [
    "Databases & ORM",
    [...skills.databases, "Entity Framework Core", "Prisma", "Sequelize"],
  ],
  [
    "Cloud & DevOps",
    [
      "Docker",
      "Docker Compose",
      "Cloudflare Workers & KV",
      "Linux",
      "Nginx",
      "IIS",
      "GitLab CI/CD",
      "GitHub Actions",
    ],
  ],
  [
    "CMS & Integrations",
    [
      "WordPress",
      "Strapi",
      "Elementor",
      "DOKU Gateway",
      "Biteship Logistics",
      "Python Automation",
    ],
  ],
];
const validateString = (props, key) =>
  typeof props[key] === "string" ? null : new Error(key + " must be a string");
const validateArray = (props, key) =>
  Array.isArray(props[key]) ? null : new Error(key + " must be an array");

function currentRoute() {
  const legacy = {
    "#home": "/",
    "#about": "/about",
    "#work": "/projects",
    "#experience": "/experience",
    "#contact": "/contact",
  };
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  return (
    legacy[window.location.hash] ??
    (pages.some(([url]) => url === path) ? path : "/")
  );
}

function SocialLinks({ includeContact = false }) {
  const links = [
    ["LinkedIn", profile.linkedin, "linkedin"],
    ["GitHub", profile.github, "github"],
    [
      "WhatsApp",
      "https://wa.me/" + profile.phone.replace(/\D/g, ""),
      "whatsapp",
    ],
    ...(includeContact ? [["Contact", "/contact", "email"]] : []),
  ];
  return (
    <div className="social-links">
      {links.map(([label, href, icon]) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          {...(href.startsWith("https:")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          <img
            src={"/icons/icon-" + icon + ".svg"}
            alt=""
            width="14"
            height="14"
          />
        </a>
      ))}
    </div>
  );
}
SocialLinks.propTypes = {
  includeContact: (props, key) =>
    props[key] === undefined || typeof props[key] === "boolean"
      ? null
      : new Error(key + " must be a boolean"),
};

function TechTags({ items }) {
  return (
    <div className="tech-tags">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}
TechTags.propTypes = { items: validateArray };

function PageHeading({ badge, title, intro }) {
  return (
    <div className="page-heading">
      <span className="page-badge">{badge}</span>
      <h1>{title}</h1>
      <p className="page-intro">{intro}</p>
    </div>
  );
}
PageHeading.propTypes = {
  badge: validateString,
  title: validateString,
  intro: validateString,
};

function HomePage({ theme }) {
  const [paused, setPaused] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  return (
    <section className="home-page" aria-label="Introduction">
      <div className="home-copy">
        <h1>Hi, I&apos;m {profile.name}</h1>
        <p className="home-title">{profile.title}</p>
        <p className="home-summary">{profile.summary}</p>
        <a
          className="download-button"
          href="/cv.pdf"
          download="Muhammad_Ghazali_Nur_Rahman_CV.pdf"
        >
          <Download size={16} /> Download CV
        </a>
        <SocialLinks includeContact />
      </div>
      <div className="sculpture-panel">
        <Suspense
          fallback={
            <div className="scene-loading" role="status">
              Loading sculpture…
            </div>
          }
        >
          <SculptureScene paused={paused} theme={theme} />
        </Suspense>
        <div className="sculpture-hint">Interactive 3D · Drag to orbit</div>
        <button
          type="button"
          className="motion-control"
          aria-pressed={paused}
          aria-label={
            paused ? "Enable sculpture animation" : "Pause sculpture animation"
          }
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? <Play size={12} /> : <Pause size={12} />}{" "}
          {paused ? "Motion off" : "Motion on"}
        </button>
      </div>
    </section>
  );
}
HomePage.propTypes = { theme: validateString };

function AboutPage() {
  return (
    <section className="content-page about-page">
      <div className="page-heading">
        <span className="page-badge">Professional Overview</span>
        <h1>Practical Engineering with Real-World Focus.</h1>
        <div className="about-copy">
          <p>{profile.summary}</p>
          <p>
            My work connects responsive interfaces with reliable systems:
            production monitoring and warehouse workflows at Panasonic, an
            edge-accelerated NFC platform at TapInAja, and client websites built
            collaboratively with my team. I care about maintainable code, clear
            user experiences, and dependable deployments.
          </p>
        </div>
      </div>
      <div className="about-details">
        <div className="education-detail">
          <span className="detail-label">Education</span>
          <div className="gpa-value">
            3.56 <small>/ 4.00 GPA</small>
          </div>
          <h3>Politeknik Elektronika Negeri Surabaya (PENS)</h3>
          <p>
            {education.degree} · {education.period}
          </p>
        </div>
        <div className="focus-detail">
          <span className="detail-label">Technical Focus</span>
          <div>
            <h4>Full Stack & Manufacturing Systems</h4>
            <p>
              ASP.NET, Blazor, PostgreSQL, SQL Server, and production workflows.
            </p>
          </div>
          <div>
            <h4>Web Platforms & Deployment</h4>
            <p>
              Next.js, Vue, WordPress, API integrations, edge caching, and
              Docker.
            </p>
          </div>
        </div>
        <div className="languages-detail">
          <span className="detail-label">Languages</span>
          <div className="gpa-value">Fluent</div>
          {skills.languages_spoken.map((item) => (
            <div key={item.language}>
              <h4>{item.language}</h4>
              <p>{item.level}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperiencePage() {
  const technologyCount = new Set(skillGroups.flatMap(([, items]) => items))
    .size;
  return (
    <section className="content-page experience-page">
      <PageHeading
        badge="Career & Capabilities"
        title="Experience. Built through practice."
        intro="Production applications, full-stack platforms, edge-accelerated caching, and containerized automated pipelines."
      />
      <div className="experience-list">
        {experience.map((job, index) => (
          <article
            key={job.company}
            className={"experience-card " + (index % 2 ? "reverse" : "")}
          >
            <div className="job-summary">
              <div className="job-meta">
                <span className="company-badge">{job.company}</span>
                <span className="job-period">{job.period}</span>
              </div>
              <h2>{job.role}</h2>
              <TechTags items={job.tech} />
            </div>
            <ul className="job-points bullet-list">
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <section
        className="skills-section"
        aria-label="Skills matrix and capabilities"
      >
        <div className="skills-heading">
          <span className="detail-label">Skills Matrix & Capabilities</span>
          <span>{technologyCount} Technologies</span>
        </div>
        <div className="skills-grid">
          {skillGroups.map(([label, items]) => (
            <div className="skill-card" key={label}>
              <h3>{label}</h3>
              <div className="skill-tags">
                {items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

function ProjectsPage() {
  const listRef = useRef(null);
  useEffect(() => {
    const closeMenus = (event) => {
      listRef.current?.querySelectorAll("details[open]").forEach((menu) => {
        if (
          event.key === "Escape" ||
          (event.type === "pointerdown" && !menu.contains(event.target))
        ) {
          menu.removeAttribute("open");
          if (event.key === "Escape") menu.querySelector("summary")?.focus();
        }
      });
    };
    document.addEventListener("pointerdown", closeMenus);
    document.addEventListener("keydown", closeMenus);
    return () => {
      document.removeEventListener("pointerdown", closeMenus);
      document.removeEventListener("keydown", closeMenus);
    };
  }, []);
  return (
    <section className="content-page projects-page">
      <PageHeading
        badge="Featured Projects"
        title="Selected Work. Built for production."
        intro="Full-stack platforms, edge-accelerated microservices, recipe recommendations, and enterprise portals."
      />
      <div className="projects-grid" ref={listRef}>
        {projects.map((project) => (
          <article className="project-card" key={project.name}>
            <div className="project-image">
              <img
                src={projectImages[project.name]}
                alt={project.name + " application preview"}
                loading="lazy"
              />
            </div>
            <div className="project-card-heading">
              <h2>{project.name}</h2>
              {project.links ? (
                <details className="project-links-menu">
                  <summary className="project-link">
                    Live <ChevronDown size={12} />
                  </summary>
                  <div className="project-links-dropdown">
                    <small>Ecosystem Portals</small>
                    {project.links.map((link) => (
                      <a
                        href={link.url}
                        key={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                        <ArrowUpRight size={12} />
                      </a>
                    ))}
                  </div>
                </details>
              ) : (
                <a
                  className="project-link"
                  href={
                    project.liveStatus === "unavailable"
                      ? project.github
                      : project.live
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    (project.liveStatus === "unavailable"
                      ? "View source for "
                      : "Visit ") + project.name
                  }
                >
                  {project.liveStatus === "unavailable" ? "Source" : "Live"}{" "}
                  <ArrowUpRight size={12} />
                </a>
              )}
            </div>
            <p className="project-description">
              {project.subtitle ?? project.description}
            </p>
            <ul className="bullet-list">
              {project.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <TechTags items={project.tech} />
            {project.liveStatus === "unavailable" && (
              <p className="source-link">
                Live preview temporarily unavailable. Explore the backend on
                GitHub.
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactPage() {
  const [copyState, setCopyState] = useState("");
  const [feedback, setFeedback] = useState("");
  const timerRef = useRef(null);
  useEffect(() => () => window.clearTimeout(timerRef.current), []);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("Copied");
    } catch {
      setCopyState("Select the email address to copy it.");
    }
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopyState(""), 2500);
  };
  const composeMessage = (event) => {
    event.preventDefault();
    const messageField = event.currentTarget.elements.namedItem("message");
    if (!messageField.value.trim()) {
      messageField.setCustomValidity("Please enter your message.");
      messageField.reportValidity();
      return;
    }
    const form = new FormData(event.currentTarget);
    const subject = "Portfolio inquiry from " + form.get("name").trim();
    const body =
      form.get("message").trim() +
      "\n\nFrom: " +
      form.get("name").trim() +
      "\nEmail: " +
      form.get("email").trim();
    window.location.href =
      "mailto:" +
      profile.email +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);
    setFeedback(
      "Your email app will open with a draft. Review it and send your message there.",
    );
  };
  return (
    <section className="contact-page">
      <div className="contact-copy">
        <h1>
          Let’s Get In <span>Touch.</span>
        </h1>
        <p className="contact-intro">
          Have a project in mind, looking for a full-stack or backend engineer,
          or simply want to connect? Send a message and let&apos;s create
          something exceptional together.
        </p>
        <div className="manual-contact">
          <p>Or just reach out manually to</p>
          <div className="email-copy">
            <a href={"mailto:" + profile.email}>{profile.email}</a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
            >
              {copyState === "Copied" ? "Copied" : "Copy"}
            </button>
          </div>
          <span className="copy-status" role="status">
            {copyState && copyState !== "Copied" ? copyState : ""}
          </span>
        </div>
        <SocialLinks />
      </div>
      <form className="contact-form" onSubmit={composeMessage}>
        <h2>Send a Direct Message</h2>
        <p className="form-intro">
          Fill out the form below, then review and send the draft in your email
          app.
        </p>
        <div className="form-fields">
          <div className="form-field">
            <label htmlFor="contact-name">
              Your Name <span>*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              placeholder="e.g. Alex Morgan"
              required
              maxLength={120}
              pattern=".*\S.*"
            />
          </div>
          <div className="form-field">
            <label htmlFor="contact-email">
              Your Email <span>*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="alex@example.com"
              required
              maxLength={254}
            />
          </div>
          <div className="form-field message-field">
            <label htmlFor="contact-message">
              Message <span>*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Describe your project, question, or opportunity…"
              rows={4}
              required
              maxLength={4000}
              onChange={(event) => event.currentTarget.setCustomValidity("")}
            />
          </div>
        </div>
        <button className="submit-button" type="submit">
          Send Message <ArrowRight size={16} />
        </button>
        <p className="form-feedback" role="status">
          {feedback}
        </p>
      </form>
    </section>
  );
}

export default function App() {
  const [route, setRoute] = useState(currentRoute);
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light",
  );
  const mainRef = useRef(null);
  const manualTheme = useRef(false);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemTheme = () => {
      if (manualTheme.current) return;
      try {
        const saved = localStorage.getItem("ghazali-theme");
        if (saved === "light" || saved === "dark") return;
      } catch {
        /* The theme still works when browser storage is unavailable. */
      }
      setTheme(media.matches ? "dark" : "light");
    };
    media.addEventListener("change", syncSystemTheme);
    return () => media.removeEventListener("change", syncSystemTheme);
  }, []);
  const toggleTheme = () => {
    manualTheme.current = true;
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    try {
      localStorage.setItem("ghazali-theme", nextTheme);
    } catch {
      /* Keep the current selection for this session. */
    }
  };
  useEffect(() => {
    const sync = () => {
      setRoute(currentRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    if (
      ["#home", "#about", "#work", "#experience", "#contact"].includes(
        window.location.hash,
      )
    )
      window.history.replaceState(null, "", currentRoute());
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);
  useEffect(() => {
    document.title =
      (pages.find(([path]) => path === route)?.[1] ?? "Home") +
      " — " +
      profile.name;
  }, [route]);
  const navigate = (event) => {
    const anchor = event.target.closest("a");
    if (
      !anchor ||
      anchor.target ||
      anchor.hasAttribute("download") ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const url = new URL(anchor.href, window.location.origin);
    if (
      url.origin !== window.location.origin ||
      !pages.some(([path]) => path === url.pathname)
    )
      return;
    event.preventDefault();
    if (route !== url.pathname)
      window.history.pushState(null, "", url.pathname);
    setRoute(url.pathname);
    window.scrollTo({ top: 0, behavior: "instant" });
    mainRef.current?.focus({ preventScroll: true });
  };
  return (
    <MotionConfig reducedMotion="user">
      <div onClick={navigate}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="ambient-light" aria-hidden="true" />
        <header className="site-header">
          <nav className="pill-nav" aria-label="Main navigation">
            {pages.map(([path, label]) => (
              <a
                key={path}
                href={path}
                aria-label={label}
                aria-current={route === path ? "page" : undefined}
              >
                {route === path && (
                  <motion.span
                    className="nav-pill"
                    layoutId="active-page"
                    transition={{ type: "spring", stiffness: 210, damping: 20 }}
                  />
                )}
                {path === "/" && (
                  <House
                    className="nav-home-icon"
                    size={16}
                    aria-hidden="true"
                  />
                )}
                <span className={path === "/" ? "nav-home-label" : undefined}>
                  {label}
                </span>
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            aria-pressed={theme === "dark"}
            title={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
          </button>
        </header>
        <main className="page-shell" id="main" ref={mainRef} tabIndex={-1}>
          {route === "/" && <HomePage theme={theme} />}
          {route === "/about" && <AboutPage />}
          {route === "/experience" && <ExperiencePage />}
          {route === "/projects" && <ProjectsPage />}
          {route === "/contact" && <ContactPage />}
        </main>
      </div>
    </MotionConfig>
  );
}
