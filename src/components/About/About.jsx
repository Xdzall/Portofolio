import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { profile, education } from '../../data/resume.js';

export default function About() {
  const [imgError, setImgError] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { label: 'Projects', value: '5+' },
    { label: 'Languages', value: '8+' },
    { label: 'Industry Exp', value: '1 yr' },
    { label: 'GPA', value: education?.gpa?.split(' ')?.[0] || '3.56' },
  ];

  return (
    <section id="about" className="py-24 bg-[#0a0a0f] relative overflow-hidden" ref={ref}>
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#6c63ff]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center gap-12 md:gap-16"
        >
          {/* Left: Avatar / Photo */}
          <div className="w-full md:w-5/12 flex justify-center">
            <div className="relative group">
              {/* Outer decorative ring & glow */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-[#6c63ff] via-[#a855f7] to-[#00d4aa] opacity-75 blur-md group-hover:opacity-100 transition duration-500 group-hover:scale-105"></div>
              
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-[#12121a] border border-[#2a2a3a] p-3 overflow-hidden shadow-2xl">
                {!imgError ? (
                  <img 
                    src="/images/profile.jpg" 
                    alt={profile?.name || "Muhammad Ghazali Nur Rahman"} 
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover rounded-2xl shadow-inner transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#1a1a26] to-[#0a0a0f] flex flex-col items-center justify-center border border-[#2a2a3a]">
                    <span className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#6c63ff] to-[#00d4aa]">
                      GH
                    </span>
                    <span className="text-xs text-[#a1a1aa] mt-2 font-mono">{profile?.title}</span>
                  </div>
                )}

                {/* Floating badge */}
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-[#0a0a0f]/90 border border-[#00d4aa]/40 backdrop-blur-md flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse"></span>
                  <span className="text-xs font-mono text-[#e4e4e7]">PENS Student</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="w-full md:w-7/12">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-mono text-[#00d4aa] uppercase tracking-widest">About Me</span>
              <div className="h-[1px] w-12 bg-[#2a2a3a]"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-[#e4e4e7] mb-6 leading-tight">
              Passionate Full Stack Developer & Tech Enthusiast
            </h2>
            
            <div className="space-y-4 text-[#a1a1aa] mb-10 text-base md:text-lg leading-relaxed">
              <p>
                Hello! I'm <strong className="text-[#e4e4e7]">{profile?.name}</strong>, an Informatics Engineering student at <strong className="text-[#00d4aa]">{education?.institution || 'PENS'}</strong> with a GPA of <strong className="text-[#00d4aa]">{education?.gpa || '3.56 / 4.0'}</strong>.
              </p>
              <p>
                I have a strong foundation in full-stack development, spanning modern frontend frameworks, scalable backend architectures, and database systems. Having developed production-level monitoring dashboards at <span className="text-[#e4e4e7]">PT Panasonic</span> and built AI/NLP powered web apps, I strive to deliver performant and intuitive digital experiences.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#12121a]/80 backdrop-blur-sm border border-[#2a2a3a] rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-lg hover:border-[#6c63ff]/50 hover:bg-[#1a1a26] transition-all group"
                >
                  <span className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#6c63ff] to-[#00d4aa] mb-1 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </span>
                  <span className="text-xs text-[#a1a1aa] uppercase tracking-wider font-medium font-mono">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
