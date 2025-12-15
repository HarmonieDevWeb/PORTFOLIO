'use client';

import { useState, useEffect } from 'react';
import { ChevronsDown, MapPin, GraduationCap, Briefcase, Languages, Loader2 } from 'lucide-react';

export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('/api/about');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des données');
        }
        const data = await response.json();
        setAboutData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  const { location, education, experience, languages } = aboutData;

  // Grouper les formations par type
  const diplomas = education?.filter(edu => edu.type === 'diploma') || [];
  const certifications = education?.filter(edu => edu.type === 'certification' || edu.type === 'mooc') || [];

  return (
    <section 
      id="about" 
      className="mb-16 px-4 pt-5 md:px-6 md:pt-10 lg:px-8 lg:pt-15 max-w-7xl mx-auto"
    >
      {/* Titre de section */}
      <h2 className="text-3xl font-bold italic relative inline-block mb-8 mt-20">
        À propos de moi
        <span className="block h-1 w-20 bg-accent mt-2"></span>
      </h2>

      {/* Grille de contenu */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Localisation */}
        {location && (
          <article className="mt-4 p-6 rounded-lg shadow-md border-l-4 border-secondary bg-white hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="text-secondary" size={24} />
              <h3 className="text-2xl font-semibold">Localisation</h3>
            </div>
            <p className="text-lg pl-2 leading-7 text-gray-700 italic">
              {location.description || `Basée à ${location.city}, ${location.region}, ${location.country}`}
            </p>
          </article>
        )}

        {/* Formations */}
        {education && education.length > 0 && (
          <article className="mt-4 p-6 rounded-lg shadow-md border-l-4 border-secondary bg-white hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="text-secondary" size={24} />
              <h3 className="text-2xl font-semibold">Formations</h3>
            </div>
            <div className="text-base leading-7 text-gray-700">
              {diplomas.length > 0 && (
                <>
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Parcours Académique</h4>
                  <ul className="list-disc list-inside pl-3 space-y-1 mb-4">
                    {diplomas.map((edu, index) => (
                      <li key={index}>
                        {edu.year} : {edu.title} {edu.institution}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              
              {certifications.length > 0 && (
                <>
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Certifications</h4>
                  <ul className="list-disc list-inside pl-3 space-y-1">
                    {certifications.map((cert, index) => (
                      <li key={index}>
                        {cert.year} : {cert.title}  {cert.institution}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </article>
        )}

        {/* Expérience Professionnelle */}
        {experience && experience.length > 0 && (
          <article className="mt-4 p-6 rounded-lg shadow-md border-l-4 border-secondary bg-white hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="text-secondary" size={24} />
              <h3 className="text-2xl font-semibold">Expérience Professionnelle</h3>
            </div>
            <ul className="list-disc list-inside pl-3 space-y-1 text-base leading-7 text-gray-700">
              {experience.map((exp, index) => (
                <li key={index}>
                  {exp.period} : {exp.position}
                  {exp.type === 'freelance' && ' (Auto-entrepreneur)'}
                </li>
              ))}
            </ul>
          </article>
        )}

        {/* Langues */}
        {languages && languages.length > 0 && (
          <article className="mt-4 p-6 rounded-lg shadow-md border-l-4 border-secondary bg-white hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <Languages className="text-secondary" size={24} />
              <h3 className="text-2xl font-semibold">Langues</h3>
            </div>
            <ul className="list-disc list-inside pl-3 space-y-1 text-base leading-7 text-gray-700">
              {languages.map((lang, index) => {
                const levelLabel = {
                  native: 'Langue maternelle',
                  fluent: 'Courant',
                  advanced: 'Avancé',
                  intermediate: 'Niveau intermédiaire',
                  beginner: 'Débutant'
                };
                return (
                  <li key={index}>
                    {lang.name} : {levelLabel[lang.level] || lang.level}
                  </li>
                );
              })}
            </ul>
          </article>
        )}
      </div>

      {/* Bouton scroll vers compétences */}
      <button
        onClick={() => scrollToSection('skills')}
        className="bg-transparent border-none flex flex-col items-center mx-auto mt-8 cursor-pointer hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 rounded-lg p-2"
        aria-label="Faire défiler vers la section compétences"
      >
        <ChevronsDown className="text-secondary animate-bounce" size={50} />
      </button>
    </section>
  );
}