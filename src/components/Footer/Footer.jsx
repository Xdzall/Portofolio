import React from 'react';
import { profile } from '../../data/resume.js';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080810] pt-16 pb-8 border-t border-[#2a2a3a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <a href="#home" className="inline-block text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6c63ff] to-[#00d4aa] mb-2">
              {profile?.name || 'Ghazali'}
            </a>
            <p className="text-[#a1a1aa] text-sm max-w-xs">
              Building modern, performant, and immersive digital experiences for the web.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[#e4e4e7] font-semibold mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2 text-center md:text-left text-sm text-[#a1a1aa]">
              <li><a href="#about" className="hover:text-[#00d4aa] transition-colors">About</a></li>
              <li><a href="#experience" className="hover:text-[#00d4aa] transition-colors">Experience</a></li>
              <li><a href="#projects" className="hover:text-[#00d4aa] transition-colors">Projects</a></li>
              <li><a href="#skills" className="hover:text-[#00d4aa] transition-colors">Skills</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[#e4e4e7] font-semibold mb-4">Socials</h4>
            <div className="flex gap-4">
              <a href={profile?.github || '#'} target="_blank" rel="noreferrer" className="text-[#a1a1aa] hover:text-[#e4e4e7] p-2 bg-[#12121a] rounded-lg border border-[#2a2a3a] hover:border-[#6c63ff] transition-all" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <a href={profile?.linkedin || '#'} target="_blank" rel="noreferrer" className="text-[#a1a1aa] hover:text-[#e4e4e7] p-2 bg-[#12121a] rounded-lg border border-[#2a2a3a] hover:border-[#6c63ff] transition-all" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-[#2a2a3a] mb-6"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#a1a1aa]">
          <p>© {currentYear} {profile?.name || 'Ghazali'}. All rights reserved.</p>
          <p>Built with React & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
