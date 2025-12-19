"use client";
import {
  Home, User, Code, FolderOpen
} from 'lucide-react';
import { Link } from 'react-scroll';
export default function DashPage() {
  const Sidebar = ({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen }) => {
    const menuItems = [
      { id: 'about', label: 'À propos', icon: User },
      { id: 'skills', label: 'Compétences', icon: Code },
      { id: 'projects', label: 'Projets', icon: FolderOpen },
    ];


    return (
      <section className='flex flex-col w-3/4 p-2 border-b-2 border-r-2 border-secondary rounded-2xl'>
        <nav className=" md:flex justify-between pl-2 space-x-5">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              smooth={true}
              duration={500}
              className="text-primary hover:text-secondary  font-bold transition-colors relative group cursor-pointer"
            >
              {item.label}
              <span className="bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>


      </section>


    );
  };

  return <Sidebar/>
}