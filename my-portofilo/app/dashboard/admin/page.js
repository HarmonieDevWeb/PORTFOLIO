'use client';

import { useRef, useEffect } from 'react';
import Dashboard from '@/components/NavDash';
import DashAbout from '@/components/DashAbout';
import DashSkills from '@/components/DashSkills';
import DashProjects from '@/components/DashProjects';
import DashBlog from '@/components/DashBlog';

export default function AdminPage() {
  const scrollContainerRef = useRef(null);

  // Observer pour synchroniser le scroll avec la navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const sections = ['about', 'skills', 'projects', 'blog'];
      const index = sections.indexOf(hash);
      
      if (index !== -1 && scrollContainerRef.current) {
        const sectionWidth = scrollContainerRef.current.offsetWidth;
        scrollContainerRef.current.scrollTo({
          left: sectionWidth * index,
          behavior: 'smooth'
        });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      {/* Votre composant NavDash */}
      <Dashboard />

      {/* Container avec scroll horizontal */}
      <div
        ref={scrollContainerRef}
        className="flex-1 flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {/* Section About */}
        <div id="about" className="min-w-full h-full snap-start overflow-y-auto">
          <div className="h-full py-8 px-4">
            <DashAbout />
          </div>
        </div>

        {/* Section Skills */}
        <div id="skills" className="min-w-full h-full snap-start overflow-y-auto">
          <div className="h-full py-8 px-4">
            <DashSkills />
          </div>
        </div>

        {/* Section Projects */}
        <div id="projects" className="min-w-full h-full snap-start overflow-y-auto">
          <div className="h-full py-8 px-4">
            <DashProjects />
          </div>
        </div>

        {/* Section Blog */}
        <div id="blog" className="min-w-full h-full snap-start overflow-y-auto">
          <div className="h-full py-8 px-4">
            <DashBlog />
          </div>
        </div>
      </div>
    </div>
  );
}