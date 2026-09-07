import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowUp,
  Grid2X2,
  X,
  Pause,
  Play,
  Code2,
  BriefcaseBusiness,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import {
  profile,
  education,
  experience,
  projects,
  skills,
} from "./data/resume";
const SculptureScene = lazy(() => import("./components/3d/SculptureScene"));
const chapters = [
  ["home", "Home"],
  ["about", "About"],
  ["work", "Selected work"],
  ["experience", "Experience"],
  ["contact", "Contact"],
];

export default function App() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [paused, setPaused] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [copied, setCopied] = useState(false);
  const menuButton = useRef(null),
    menuRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -55% 0px" },
    );
    document
      .querySelectorAll("main > section")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const links = menuRef.current.querySelectorAll("a, button");
    links[0]?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
      if (event.key === "Tab") {
        const first = links[0],
          last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);
  const closeMenu = () => {
    setMenuOpen(false);
    menuButton.current?.focus();
  };
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="scene-wrap" aria-hidden="true">
        <Suspense
          fallback={
            <div className="scene-loading">Preparing the sculpture</div>
          }
        >
          <SculptureScene paused={paused} />
        </Suspense>
      </div>
      <div className="architectural-grid" aria-hidden="true" />
      <header className={`site-header ${active !== "home" ? "scrolled" : ""}`}>
        <a className="wordmark" href="#home" aria-label="Ghazali home">
          GHAZALI
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {chapters.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
              aria-current={active === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <button
          className="icon-button menu-button"
          ref={menuButton}
          aria-label="Open navigation"
          aria-expanded={menuOpen}
          aria-controls="navigation-menu"
          onClick={() => setMenuOpen(true)}
        >
          <Grid2X2 size={21} strokeWidth={1.5} />
        </button>
      </header>
      <nav className="chapter-nav" aria-label="Page chapters">
        {chapters.map(([id, label], i) => (
          <a
            href={`#${id}`}
            key={id}
            className={active === id ? "active" : ""}
            aria-label={`${i + 1}. ${label}`}
            aria-current={active === id ? "location" : undefined}
          >
            <span className="chapter-line" />
            <span className="chapter-tooltip">{label}</span>
          </a>
        ))}
      </nav>
      <main id="main" tabIndex={-1}>
        <section id="home" className="hero chapter">
          <div className="hero-eyebrow eyebrow">
            Personal portfolio <span>Vol. 01 / 2026</span>
          </div>
          <div className="hero-content">
            <h1>
              The art of
              <br />
              <span>building</span>
              <br />
              <em>digital.</em>
            </h1>
            <div className="hero-description">
              <p className="eyebrow">
                Muhammad Ghazali
                <br />
                Nur Rahman
              </p>
              <p>
                Full Stack Developer.
                <br />
                Turning thoughtful ideas into meaningful digital experiences.
                Crafted with purpose, down to the last detail.
              </p>
              <a className="text-link" href="#work">
                Explore my work <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="hero-bottom">
            <a href="#about" className="scroll-link">
              <ArrowDown size={15} /> Scroll to discover
            </a>
            <span className="eyebrow">Code. Craft. Curiosity.</span>
          </div>
        </section>
        <section id="about" className="about chapter editorial-section">
          <div className="section-index eyebrow">01 / Behind the work</div>
          <div className="editorial-column">
            <h2>
              A curious mind.
              <br />
              <em>A builder at heart.</em>
            </h2>
            <p className="lead">{profile.summary}</p>
            <p>
              I work across the entire stack, connecting considered interfaces
              with reliable systems. From the first sketch to the final
              deployment, I care about how things look, feel, and work.
            </p>
            <div className="education">
              <span className="eyebrow">Currently learning at</span>
              <h3>
                Politeknik Elektronika
                <br />
                Negeri Surabaya
              </h3>
              <p>
                {education.degree}
                <br />
                {education.period}{" "}
                <span className="education-gpa">GPA {education.gpa}</span>
              </p>
            </div>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              A look inside my GitHub <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
        <section id="work" className="work chapter editorial-section">
          <div className="section-index eyebrow">02 / The collection</div>
          <div className="work-content">
            <div className="section-heading">
              <h2>
                Selected <em>work.</em>
              </h2>
              <span className="eyebrow">2025 — 2026</span>
            </div>
            <p className="section-intro">
              A selection of applications, experiments, and problems turned into
              possibilities.
            </p>
            <div className="project-list">
              {projects.map((project, i) => (
                <details className="project" key={project.name}>
                  <summary>
                    <span className="project-number">0{i + 1}</span>
                    <span className="project-title">
                      {project.name}
                      <small>{project.role}</small>
                    </span>
                    <span className="project-year">{project.period}</span>
                    <ArrowUpRight
                      className="project-arrow"
                      size={25}
                      strokeWidth={1}
                    />
                  </summary>
                  <div className="project-detail">
                    <p>{project.description}</p>
                    <ul>
                      {project.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    <div className="tech-tags">
                      {project.tech.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      <a
                        className="text-link"
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View source <Code2 size={16} />
                      </a>
                      {project.live && (
                        <a
                          className="text-link"
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Visit project <ArrowUpRight size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section
          id="experience"
          className="experience chapter editorial-section"
        >
          <div className="section-index eyebrow">03 / Practice & process</div>
          <div className="editorial-column">
            <h2>
              Built through
              <br />
              <em>experience.</em>
            </h2>
            {experience.map((job) => (
              <article className="job" key={job.company}>
                <span className="eyebrow">{job.period}</span>
                <h3>{job.company}</h3>
                <p className="job-role">{job.role}</p>
                <ul>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
            <div className="toolkit">
              <h3>The tools behind the craft.</h3>
              {[
                ["Languages", skills.languages],
                ["Frameworks", skills.frameworks],
                ["Databases", skills.databases],
                ["Tools", skills.tools],
                ["Collaboration", skills.soft],
                [
                  "Spoken languages",
                  skills.languages_spoken.map(
                    (item) => item.language + " — " + item.level,
                  ),
                ],
              ].map(([label, items]) => (
                <details className="skill-group" key={label}>
                  <summary>
                    {label}
                    <span>{items.length}</span>
                  </summary>
                  <div className="tech-tags">
                    {items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="contact chapter editorial-section">
          <div className="section-index eyebrow">04 / The next chapter</div>
          <div className="contact-content">
            <p className="eyebrow">Have an idea in mind?</p>
            <h2>
              Let’s make
              <br />
              <em>something matter.</em>
            </h2>
            <a href={`mailto:${profile.email}`} className="contact-cta">
              Start a conversation <ArrowUpRight size={28} strokeWidth={1} />
            </a>
            <div className="email-row">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button
                className="icon-button"
                onClick={copyEmail}
                aria-label="Copy email address"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
              <span className="copy-status" role="status">
                {copied ? "Copied" : ""}
              </span>
            </div>
            <div className="socials">
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Code2 size={16} /> GitHub <ArrowUpRight size={13} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <BriefcaseBusiness size={16} /> LinkedIn{" "}
                <ArrowUpRight size={13} />
              </a>
              <a href={`mailto:${profile.email}`}>
                <Mail size={16} /> Email <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
          <footer>
            <span>© {new Date().getFullYear()} Ghazali</span>
            <a href="/credits.txt" target="_blank" rel="noreferrer">
              Art & credits
            </a>
            <a href="#home">
              Back to top <ArrowUp size={14} />
            </a>
          </footer>
        </section>
      </main>
      <button
        className="motion-control"
        aria-label={
          paused ? "Enable sculpture animation" : "Pause sculpture animation"
        }
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused ? <Play size={12} /> : <Pause size={12} />}
        <span>{paused ? "Motion off" : "Motion on"}</span>
      </button>
      {menuOpen && (
        <div
          className="menu-overlay"
          id="navigation-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          ref={menuRef}
        >
          <div className="menu-top">
            <span className="wordmark">GHAZALI</span>
            <button
              className="icon-button"
              aria-label="Close navigation"
              onClick={closeMenu}
            >
              <X />
            </button>
          </div>
          <nav aria-label="Expanded navigation">
            {chapters.map(([id, label], i) => (
              <a key={id} href={`#${id}`} onClick={closeMenu}>
                <span>0{i + 1}</span>
                {label}
                <ArrowUpRight strokeWidth={1} />
              </a>
            ))}
          </nav>
          <a className="menu-email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>
      )}
    </>
  );
}
