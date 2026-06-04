import { useEffect, useRef } from 'react';
import { education } from '../../data/resume';
import './About.css';

const highlights = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 6 3 6 3s3 0 6-3v-5" />
      </svg>
    ),
    label: 'Education',
    value: education.degree,
    detail: `${education.institution} | ${education.gpa}`,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    label: 'Specialization',
    value: 'Full Stack Development',
    detail: 'Frontend, Backend & Mobile',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    label: 'Languages',
    value: 'Indonesian (Fluent)',
    detail: 'English (Intermediate)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    label: 'Server',
    value: 'IIS, VPS, Linux Ubuntu',
    detail: 'Deployment & Configuration',
  },
];

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add('visible');
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about section" id="about">
      <div className="container fade-in" ref={ref}>
        <span className="section-label">About Me</span>
        <h2 className="section-title">Who I Am</h2>
        <p className="section-subtitle">
          A passionate developer who thrives at the intersection of design and engineering.
        </p>

        <div className="about__grid">
          <div className="about__photo-col">
            <div className="about__photo-wrapper">
              <div className="about__photo">
                {/* Replace src with your photo path: /images/profile.jpg */}
                <img
                  src="/images/profile.jpg"
                  alt="Muhammad Ghazali Nur Rahman"
                  className="about__photo-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="about__photo-fallback" style={{ display: 'none' }}>
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="about__photo-label">Your Photo</span>
                </div>
              </div>
              <div className="about__photo-ring" />
            </div>
          </div>

          <div className="about__content">
            <div className="about__text">
              <p>
                I'm a Diploma student in Informatics Engineering at PENS with hands-on
                experience building production-grade web applications. My work spans
                from monitoring dashboards to material control systems and
                NLP-powered recommendation engines.
              </p>
              <p>
                I believe great software starts with understanding the problem deeply,
                then choosing the right architecture to solve it cleanly. I enjoy
                working across the full stack — from crafting responsive UIs to
                designing robust backends.
              </p>
            </div>

            <div className="about__cards">
              {highlights.map((item) => (
                <div className="about__card" key={item.label}>
                  <div className="about__card-icon">{item.icon}</div>
                  <div>
                    <h4 className="about__card-label">{item.label}</h4>
                    <p className="about__card-value">{item.value}</p>
                    <p className="about__card-detail">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
