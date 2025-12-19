"use client";
{/*https://www.npmjs.com/package/react-scroll*/ }
import { Link } from 'react-scroll';
{/*https://react.dev/reference/react/hooks*/ }
import { useState, useEffect } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import "../app/globals.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  const navItems = [
    { name: "À propos", href: "about" },
    { name: "Compétences", href: "skills" },
    { name: "Projets", href: "projects" },
    { name: "Contact", href: "contact" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${scroll ? 'py-2 shadow-lg bg-primary' : 'py-4 shadow-md bg-primary'
        }`}
    >
      <div className="container mx-auto px-3 md:px-5 lg:px-7 max-w-8xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="inline-block">
            <img
              src="/images/badge-logo-icon.svg"
              alt="Logo - Retour en haut de page"
              className="h-10 w-10 md:h-20 md:w-30 hover:scale-110 transition-transform duration-300"
            />
          </a>


        {/* Navigation Desktop */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              smooth={true}
              duration={500}
              className="text-white hover:text-secondary font-medium transition-colors relative group px-2 cursor-pointer"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
        {/* Bouton Burger Menu (Mobile) */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white hover:text-secondary transition-colors p-2"
          aria-label="Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <IoClose className="text-3xl" />
          ) : (
            <GiHamburgerMenu className="text-3xl" />
          )}
        </button>
      </div>
      {/* Menu Mobile */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <nav className="flex flex-col gap-4 py-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              smooth={true}
              duration={500}
              onClick={() => setIsOpen(false)} // ferme le menu au clic
              className="text-white hover:text-secondary font-medium text-lg transition-colors px-3 py-2 cursor-pointer"
            >
              {item.name}
            </Link>
          ))}
        </nav>

      </div>
    </div>
    </header >
  );
}
