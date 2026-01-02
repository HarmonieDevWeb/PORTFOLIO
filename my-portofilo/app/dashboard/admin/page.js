'use client';

import { useRef, useState } from 'react';
import NavDash from '@/components/NavDash';
import DashAbout from '@/components/DashAbout';
import DashSoftSkills from '@/components/DashSoftSkills';
import DashHardSkills from '@/components/DashHardSkills';
import DashMethodTool from '@/components/DashMethodTool';
import DashProjects from '@/components/DashProjects';
import DashBlog from '@/components/DashBlog';

export default function AdminPage() {
  const scrollContainerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('about');

  const sections = [
    { id: 'about', component: <DashAbout /> },
    { 
      id: 'skills', 
      component: (
        <>
          <DashSoftSkills />
          <DashHardSkills />
          <DashMethodTool />
        </>
      )
    },
    { id: 'projects', component: <DashProjects /> },
    { id: 'blog', component: <DashBlog /> },
  ];

  const handleNavigate = (id, index) => {
    setActiveTab(id);
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const targetScroll = container.offsetWidth * index;
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      {/* Navigation avec props de contrôle */}
      <NavDash activeTab={activeTab} onNavigate={handleNavigate} />

      {/* Container de scroll horizontal */}
      <div
        ref={scrollContainerRef}
        className="flex-1 flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {sections.map((section) => (
          <div 
            key={section.id}
            id={section.id}
            className="min-w-full h-full snap-start overflow-y-auto"
          >
            <div className="p-8">
              {section.component}
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}