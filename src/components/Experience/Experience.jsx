import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience } from '../../data/resume.js';

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  const expData = experience || [];

  return (
    <section id="experience" className="py-24 bg-[#0a0a0f] relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-[#2a2a3a]"></div>
            <span className="text-xs font-mono text-[#00d4aa] uppercase tracking-widest">Journey</span>
            <div className="h-[1px] w-8 bg-[#2a2a3a]"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#e4e4e7] tracking-tight">Work Experience</h2>
        </div>

        <div ref={ref} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#6c63ff] via-[#00d4aa] to-transparent opacity-30"></div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-12"
          >
            {expData.map((exp, idx) => (
              <motion.div key={idx} variants={itemVariants} className="relative pl-12 md:pl-24">
                {/* Glowing Dot */}
                <div className="absolute left-[10px] md:left-[26px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#00d4aa] shadow-[0_0_15px_#00d4aa] ring-4 ring-[#0a0a0f]"></div>
                
                <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-6 md:p-8 hover:border-[#6c63ff]/50 transition-colors group shadow-lg">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-[#e4e4e7] group-hover:text-[#6c63ff] transition-colors">
                        {exp.role || exp.title}
                      </h3>
                      <p className="text-base md:text-lg text-[#00d4aa] font-semibold mt-0.5">{exp.company}</p>
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#1a1a26] border border-[#2a2a3a] text-xs font-mono text-[#a1a1aa] shrink-0">
                      {exp.period}
                    </span>
                  </div>
                  
                  <ul className="space-y-2.5 mb-6">
                    {(exp.points || exp.achievements)?.map((point, i) => (
                      <li key={i} className="text-[#a1a1aa] text-sm md:text-base flex items-start gap-2.5 leading-relaxed">
                        <span className="text-[#6c63ff] mt-0.5 text-base">▹</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {(exp.tech || exp.techStack) && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[#2a2a3a]">
                      {(exp.tech || exp.techStack).map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-[#0a0a0f] border border-[#2a2a3a] text-xs font-mono text-[#a1a1aa]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
