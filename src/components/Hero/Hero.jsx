import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../../data/resume.js';
import HeroScene from '../3d/HeroScene';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020206]">
      {/* 3D Solar System & Mouse-Steered Spaceship */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Atmospheric Vignette Overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0f]/80 to-transparent pointer-events-none"></div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-start justify-center pt-24 pb-16 min-h-screen pointer-events-none">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl pointer-events-auto"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12121a]/80 backdrop-blur-md border border-[#2a2a3a] mb-6 shadow-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4aa] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00d4aa]"></span>
            </span>
            <span className="text-xs font-mono font-medium text-[#e4e4e7]">✨ Open to opportunities</span>
          </motion.div>

          {/* Name Header */}
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#e4e4e7] tracking-tight mb-4 leading-tight">
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c63ff] via-[#a855f7] to-[#00d4aa]">
              {profile?.name || 'Muhammad Ghazali Nur Rahman'}
            </span>
          </motion.h1>

          <motion.h2 variants={itemVariants} className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#a1a1aa] mb-5">
            {profile?.title || 'Full Stack Developer'}
          </motion.h2>

          <motion.p variants={itemVariants} className="text-[#a1a1aa] text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
            {profile?.summary || 'Building modern, performant, and interactive digital experiences. Explore projects below or pilot the starship through the solar system.'}
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-10">
            <a 
              href="#projects" 
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#6c63ff] to-[#00d4aa] text-white font-semibold text-sm shadow-lg shadow-[#6c63ff]/25 hover:shadow-[#00d4aa]/30 hover:scale-[1.02] transition-all active:scale-95"
            >
              View Projects
            </a>
            <a 
              href="#about" 
              className="px-7 py-3.5 rounded-xl bg-[#12121a]/80 backdrop-blur-md border border-[#2a2a3a] text-[#e4e4e7] font-semibold text-sm hover:bg-[#1a1a26] hover:border-[#6c63ff] transition-all active:scale-95"
            >
              About Me
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <a 
              href={profile?.github || '#'} 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#a1a1aa] hover:text-[#e4e4e7] p-2.5 bg-[#12121a]/80 backdrop-blur-md rounded-xl border border-[#2a2a3a] hover:border-[#6c63ff] hover:scale-110 transition-all shadow-md"
              title="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a 
              href={profile?.linkedin || '#'} 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#a1a1aa] hover:text-[#e4e4e7] p-2.5 bg-[#12121a]/80 backdrop-blur-md rounded-xl border border-[#2a2a3a] hover:border-[#00d4aa] hover:scale-110 transition-all shadow-md"
              title="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a 
              href={`mailto:${profile?.email || ''}`} 
              className="text-[#a1a1aa] hover:text-[#e4e4e7] p-2.5 bg-[#12121a]/80 backdrop-blur-md rounded-xl border border-[#2a2a3a] hover:border-[#6c63ff] hover:scale-110 transition-all shadow-md"
              title="Email"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Mouse Flight Instructions Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 1 }}
        className="absolute bottom-6 right-6 hidden md:flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#12121a]/70 backdrop-blur-md border border-[#2a2a3a]/80 text-xs font-mono text-[#a1a1aa] pointer-events-none z-10 shadow-lg"
      >
        <span className="text-[#00d4aa] animate-pulse">🚀</span>
        <span><strong className="text-[#e4e4e7]">Click & hold the mouse</strong> to fly • <strong className="text-[#e4e4e7]">Move the mouse</strong> to turn</span>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10 pointer-events-none"
      >
        <span className="text-[10px] font-mono text-[#a1a1aa] uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
