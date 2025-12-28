"use client";
import { User, Code, FolderOpen, ScanEye } from 'lucide-react';

export default function NavDash({ activeTab, onNavigate }) {
  const menuItems = [
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'blog', label: 'Blog', icon: ScanEye },
  ];

  return (
    <section className='flex flex-col w-9/10 p-2 border-b-2 border-r-2 border-secondary rounded-2xl'>
      <nav className="w-full">
        {/* On utilise w-full et justify-between */}
        <div className="w-full flex items-center justify-between">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id, index)}
                className={`
                flex-1 flex flex-col items-center justify-center transition-all duration-300
                ${isActive ? 'text-primary bg-accent/5' : 'text-secondary hover:text-primary'}
              `}
              >
                <div className="flex items-center gap-2">
                  <Icon
                    size={24}
                    className="shrink-0"
                    strokeWidth={isActive ? 2.5 : 2}
                  />

                  {/* LE LABEL : Caché par défaut, affiché à partir du breakpoint 'md' */}
                  <span className={`
                  hidden md:block font-bold uppercase tracking-wide text-sm
                  ${isActive ? 'opacity-100' : 'opacity-80'}
                `}>
                    {item.label}
                  </span>
                </div>

                {/* Barre indicatrice sous l'icône/texte */}
                <div className={`
                mt-1 h-1 rounded-full transition-all duration-500
                ${isActive ? 'bg-secondary w-1/2' : 'bg-transparent w-0'}
              `} />
              </button>
            );
          })}
        </div>
      </nav>
    </section>
  );
}