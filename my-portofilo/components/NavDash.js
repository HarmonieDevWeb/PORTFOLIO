"use client";
import {User, Code, FolderOpen, ScanEye} from 'lucide-react';
import { Link } from 'react-scroll';
export default function DashPage() {
  const Sidebar = ({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen }) => {
    const menuItems = [
      { id: 'about', label: 'About', icon: User },
      { id: 'skills', label: 'Skills', icon: Code },
      { id: 'projects', label: 'Projetcts', icon: FolderOpen },
      { id: 'blog', label: 'Blog', icon: ScanEye },
    ];


    return (
      <section className='flex flex-col w-9/10 p-2 border-b-2 border-r-2 border-secondary rounded-2xl'>
        <nav className=" md:flex justify-around pl-2 space-x-5">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              smooth={true}
              duration={500}
              className="text-primary hover:text-secondary md:text-1xl lg:text-2xl font-bold transition-colors  cursor-pointer"
            >
              {item.label}
              <span className="bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>


      </section>


    );
  };

  return <Sidebar />
}