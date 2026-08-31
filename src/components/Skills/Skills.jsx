import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../../data/resume.js';

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
  };

  const categories = [
    {
      title: 'Programming Languages',
      items: skills?.languages || [],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
      )
    },
    {
      title: 'Frameworks & Libraries',
      items: skills?.frameworks || [],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
      )
    },
    {
      title: 'Databases & Storage',
      items: skills?.databases || [],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
      )
    },
    {
      title: 'Tools, DevOps & Cloud',
      items: skills?.tools || [],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
      )
    }
  ];

  const softSkills = skills?.soft || [];
  const spokenLangs = skills?.languages_spoken || [];

  return (
    <section id="skills" className="py-24 bg-[#0a0a0f] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-[#2a2a3a]"></div>
            <span className="text-xs font-mono text-[#00d4aa] uppercase tracking-widest">Capabilities</span>
            <div className="h-[1px] w-8 bg-[#2a2a3a]"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#e4e4e7] tracking-tight">Skills & Tech Stack</h2>
          <p className="text-[#a1a1aa] mt-3 max-w-xl text-base">Technologies, tools, and platforms I work with to build robust solutions.</p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-[#12121a] rounded-2xl p-6 md:p-8 border border-[#2a2a3a] hover:border-[#6c63ff]/50 transition-all shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-[#1a1a26] text-[#00d4aa] border border-[#2a2a3a]">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-[#e4e4e7]">{cat.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2.5">
                {cat.items.map((item, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-lg bg-[#1a1a26] border border-[#2a2a3a] text-sm text-[#a1a1aa] hover:text-[#e4e4e7] hover:border-[#00d4aa]/50 hover:bg-[#00d4aa]/5 transition-all font-mono"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Soft Skills & Spoken Languages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {softSkills.length > 0 && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-6 md:p-8"
            >
              <h3 className="text-lg font-bold text-[#e4e4e7] mb-5 flex items-center gap-2">
                <span className="text-[#00d4aa]">✦</span> Soft Skills
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {softSkills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1a1a26] border border-[#2a2a3a]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-xs md:text-sm font-medium text-[#a1a1aa]">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {spokenLangs.length > 0 && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-6 md:p-8"
            >
              <h3 className="text-lg font-bold text-[#e4e4e7] mb-5 flex items-center gap-2">
                <span className="text-[#6c63ff]">✦</span> Spoken Languages
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {spokenLangs.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#1a1a26] border border-[#2a2a3a] flex flex-col">
                    <span className="font-semibold text-sm text-[#e4e4e7]">{item.language}</span>
                    <span className="text-xs text-[#00d4aa] font-mono mt-1">{item.level}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
