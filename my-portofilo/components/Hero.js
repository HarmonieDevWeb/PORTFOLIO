'use client';

import { useState, useEffect } from 'react';
import { ChevronsDown, Loader2, Github, MessageCircleMore } from "lucide-react";


export default function Hero() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        console.log('📊 Données reçues:', data);
        setAboutData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <section className="mb-16 px-4 pt-5 md:px-6 md:pt-10 lg:px-8 lg:pt-15 max-w-7xl mx-auto">
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="animate-spin text-secondary" size={48} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-16 px-4 pt-5 md:px-6 md:pt-10 lg:px-8 lg:pt-15 max-w-7xl mx-auto">
        <div className="text-center text-red-600">
          <p>Erreur : {error}</p>
        </div>
      </section>
    );
  }

  if (!aboutData) return null;

  const { user } = aboutData;


  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <section className="mt-6 lg:mt-10 flex flex-col items-center bg-background w-full text-center">
      <img
        src="images/badge-logo-peach.svg"
        alt="Logo"
        className="w-auto h-auto"
      />
      {user && (
        <h2 className="text-1xl font-bold mb-2">
          {user.lastname} {user.firstname}
        </h2>
      )}
      <p className="bg-white px-8 text-accent uppercase font-bold italic rounded-2xl">
        Développeuse FullStack
      </p>
      {user && (
        <span className="text-text italic text-center max-w-xl mb-5">
          {user.present}
        </span>
      )}


      <div className="buttonCta flex flex-row justify-center gap-4 mt-6">

        {/* GITHUB */}
        <a
          href="https://github.com/HarmonieDevWeb"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-secondary text-white px-10 font-bold h-10 w-40 flex items-center justify-center rounded-full hover:bg-opacity-0 transition"
        >
          <Github className="mr-2 text-4xl" />
          GitHub
        </a>

        {/* CONTACT */}
        <button
          onClick={handleScrollToContact}
          aria-label="Faire défiler vers la section contact"
          className="border-2 border-primary px-10 h-12 w-40 flex items-center justify-center rounded-full hover:bg-primary hover:text-white transition"
        >
          <MessageCircleMore className="mr-2 text-2xl" />
          Contact
        </button>

      </div>

      <button
        onClick={handleScrollToAbout}
        className="bg-transparent border-none flex flex-col items-center mx-auto mt-5 cursor-pointer hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
        aria-label="Faire défiler vers la section projets"
      >
        <ChevronsDown className="text-secondary animate-bounce mt-10" size={50} />
      </button>
    </section>

  );
};
