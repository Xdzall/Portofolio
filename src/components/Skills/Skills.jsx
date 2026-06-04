import { useEffect, useRef } from 'react';
import { skills } from '../../data/resume';
import TechIcon from '../TechIcon/TechIcon';
import './Skills.css';

const categories = [
  { label: 'Languages', items: skills.languages, icon: 'code' },
  { label: 'Frameworks & UI', items: skills.frameworks, icon: 'layers' },
  { label: 'Databases', items: skills.databases, icon: 'database' },
  { label: 'Infrastructure & Tools', items: skills.tools, icon: 'tool' },
];

const softSkills = skills.soft;

const icons = {
  code: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  layers: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  database: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
    </svg>
  ),
  tool: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
};

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
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
    <section className="skills section" id="skills">
      <div className="container fade-in" ref={sectionRef}>
        <div className="skills__top">
          <span className="section-label">Skills</span>
          <h2 className="section-title">My Tech Stack</h2>
          <p className="section-subtitle">
            Technologies I use daily to build reliable software.
          </p>
        </div>

        <div className="skills__grid">
          {categories.map((cat) => (
            <div className="skills__card" key={cat.label}>
              <div className="skills__card-header">
                <span className="skills__card-icon">{icons[cat.icon]}</span>
                <h3 className="skills__card-title">{cat.label}</h3>
              </div>
              <div className="skills__card-items">
                {cat.items.map((item) => (
                  <span className="skills__item" key={item}>
                    <TechIcon name={item} size={18} />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="skills__soft">
          <h3 className="skills__soft-title">Core Strengths</h3>
          <div className="skills__soft-items">
            {softSkills.map((skill) => (
              <span className="skills__soft-item" key={skill}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
