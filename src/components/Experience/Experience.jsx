import { useEffect, useRef } from 'react';
import { experience } from '../../data/resume';
import TechIcon from '../TechIcon/TechIcon';
import './Experience.css';

export default function Experience() {
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
    <section className="experience section" id="experience">
      <div className="container fade-in" ref={ref}>
        <span className="section-label">Experience</span>
        <h2 className="section-title">Where I've Worked</h2>
        <p className="section-subtitle">
          Professional roles that sharpened my engineering skills.
        </p>

        <div className="experience__timeline">
          {experience.map((exp, i) => (
            <div className="experience__item" key={i}>
              <div className="experience__marker">
                <div className="experience__dot" />
                <div className="experience__line" />
              </div>

              <div className="experience__card">
                <div className="experience__header">
                  <div>
                    <h3 className="experience__role">{exp.role}</h3>
                    <p className="experience__company">{exp.company}</p>
                  </div>
                  <span className="experience__period">{exp.period}</span>
                </div>

                <ul className="experience__points">
                  {exp.points.map((point, j) => (
                    <li key={j}>{point}</li>
                  ))}
                </ul>

                <div className="experience__tags">
                  {exp.tech.map((t) => (
                    <span className="tag" key={t}>
                      <TechIcon name={t} size={16} />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
