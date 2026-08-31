import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../../data/resume.js';

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const projData = projects || [];

  return (
    <section id="projects" className="py-24 bg-[#0a0a0f] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-[#2a2a3a]"></div>
            <span className="text-xs font-mono text-[#00d4aa] uppercase tracking-widest">Portfolio</span>
            <div className="h-[1px] w-8 bg-[#2a2a3a]"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#e4e4e7] tracking-tight">Featured Projects</h2>
          <p className="text-[#a1a1aa] mt-3 max-w-xl text-base">A collection of full-stack web applications, real-time dashboards, and tools I've built.</p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projData.map((project, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="group relative bg-[#12121a] rounded-2xl p-6 md:p-8 flex flex-col h-full border border-[#2a2a3a] hover:border-[#6c63ff]/60 transition-all shadow-xl overflow-hidden"
            >
              {/* Gradient Top Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6c63ff] via-[#a855f7] to-[#00d4aa] opacity-80 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {project.featured && (
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#00d4aa]/10 text-[#00d4aa] text-xs font-semibold border border-[#00d4aa]/30">
                        ⭐ Featured
                      </span>
                    )}
                    <span className="text-[#a1a1aa] font-mono text-xs px-2 py-0.5 rounded bg-[#1a1a26] border border-[#2a2a3a]">
                      {project.period}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#e4e4e7] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6c63ff] group-hover:to-[#00d4aa] transition-all">
                    {project.name || project.title}
                  </h3>
                  <p className="text-sm text-[#00d4aa] font-medium mt-1">{project.role}</p>
                </div>
                
                {/* Outbound Links */}
                <div className="flex gap-2">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-[#a1a1aa] hover:text-[#e4e4e7] p-2 bg-[#1a1a26] rounded-lg border border-[#2a2a3a] hover:border-[#6c63ff] hover:bg-[#6c63ff]/10 transition-all" 
                      aria-label="GitHub Repository"
                      title="View GitHub Repository"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    </a>
                  )}
                  {(project.live || project.link) && (
                    <a 
                      href={project.live || project.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-[#a1a1aa] hover:text-[#00d4aa] p-2 bg-[#1a1a26] rounded-lg border border-[#2a2a3a] hover:border-[#00d4aa] hover:bg-[#00d4aa]/10 transition-all" 
                      aria-label="Live Demo"
                      title="Live Demo"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                  )}
                </div>
              </div>
              
              <div className="mb-6 flex-grow">
                <p className="text-[#a1a1aa] text-sm md:text-base leading-relaxed mb-4">
                  {project.description}
                </p>
                {(project.points || project.features) && (
                  <ul className="space-y-2">
                    {(project.points || project.features).map((point, i) => (
                      <li key={i} className="text-xs md:text-sm text-[#a1a1aa] flex items-start gap-2">
                        <span className="text-[#00d4aa] mt-0.5 text-sm">✓</span>
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              <div className="pt-4 border-t border-[#2a2a3a] mt-auto">
                <div className="flex flex-wrap gap-2">
                  {project.tech?.map((tech, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-[#1a1a26] border border-[#2a2a3a] text-xs font-mono text-[#a1a1aa] group-hover:border-[#6c63ff]/30 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
