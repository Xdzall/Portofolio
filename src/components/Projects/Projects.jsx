import { useEffect, useRef } from 'react';
import { projects } from '../../data/resume';
import TechIcon from '../TechIcon/TechIcon';
import './Projects.css';

export default function Projects() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add('visible');
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="projects section" id="projects">
      <div className="container fade-in" ref={ref}>
        <span className="section-label">Projects</span>
        <h2 className="section-title">What I've Built</h2>
        <p className="section-subtitle">
          Selected projects from professional work and personal builds.
        </p>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <div className={`projects__card ${project.featured ? 'projects__card--featured' : ''}`} key={i}>
              {project.featured && (
                <div className="projects__badge">Featured</div>
              )}

              <div className="projects__card-header">
                <div className="projects__card-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="projects__period">{project.period}</span>
              </div>

              <h3 className="projects__card-title">{project.name}</h3>
              <p className="projects__card-role">{project.role}</p>
              {project.description && (
                <p className="projects__card-desc">{project.description}</p>
              )}

              <ul className="projects__card-points">
                {project.points.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>

              <div className="projects__card-tags">
                {project.tech.map((t) => (
                  <span className="tag" key={t}>
                    <TechIcon name={t} size={15} />
                    {t}
                  </span>
                ))}
              </div>

              <div className="projects__card-links">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="projects__link"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Source
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="projects__link projects__link--live"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
