import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { profile } from '../../data/resume.js';

export default function Contact() {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const contactMethods = [
    {
      label: 'Email',
      value: profile?.email || 'email@example.com',
      href: `mailto:${profile?.email}`,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
    },
    {
      label: 'Phone',
      value: profile?.phone || '+1 234 567 8900',
      href: `tel:${profile?.phone?.replace(/\D/g,'')}`,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    },
    {
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: profile?.linkedin || '#',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
    },
    {
      label: 'GitHub',
      value: 'View Profile',
      href: profile?.github || '#',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
    }
  ];

  return (
    <section id="contact" className="py-24 bg-[#0a0a0f]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-[#2a2a3a]"></div>
            <span className="text-xs font-mono text-[#00d4aa] uppercase tracking-widest">Connect</span>
            <div className="h-[1px] w-8 bg-[#2a2a3a]"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#e4e4e7] mb-6">Let's Work Together</h2>
          <p className="text-[#a1a1aa] max-w-2xl text-lg">
            I'm currently looking for new opportunities. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactMethods.map((method, idx) => (
            <motion.a
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              href={method.href}
              target={method.label === 'Email' || method.label === 'Phone' ? '_self' : '_blank'}
              rel="noreferrer"
              className="bg-[#12121a] border border-[#2a2a3a] rounded-xl p-6 flex flex-col items-center text-center hover:border-[#6c63ff]/50 hover:bg-[#1a1a26] transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-[#1a1a26] border border-[#2a2a3a] flex items-center justify-center text-[#e4e4e7] group-hover:text-[#00d4aa] group-hover:border-[#00d4aa]/30 mb-4 transition-colors">
                {method.icon}
              </div>
              <h3 className="text-[#e4e4e7] font-semibold mb-2">{method.label}</h3>
              <p className="text-sm text-[#a1a1aa] truncate w-full">{method.value}</p>
            </motion.a>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center"
        >
          <a
            href={`mailto:${profile?.email}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#6c63ff] to-[#00d4aa] text-white font-bold text-lg hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] transition-all active:scale-95"
          >
            <span>Say Hello</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
