import { ChevronsDown, Loader, AlertCircle } from "lucide-react";
import { useState, useEffect } from 'react';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/skills");

      if (!res.ok) {
        throw new Error("Erreur lors du chargement des skills.");
      }
      const data = await res.json();

      setSkills(data.skills || []);
    } catch (err) {
      console.error('erreur:', err)
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const SkillCard = ({ skill }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <h4 className="font-semibold text-primary mb-2">{skill.name}</h4>
      {skill.category !== 'Tool' && skill.category !== 'Method' && (
        <div className="text-sm text-primary">Niveau: {skill.level}%</div>
      )}
    </div>
  );

  const SkillBar = ({ skill }) => {
    const statusConfig = {
      'Acquis': {
        gradient: "from-white to-secondary",
        badge: null
      },
      'En apprentissage': {
        gradient: "from-white to-primary",
        badge: null
      },
      'En découverte': {
        gradient: "from-white to-background",
        badge: null
      },
    };

    const config = statusConfig[skill.status];


    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-primary">{skill.name}</span>
          {config.badge && (
            <span className={`px-2 py-1 rounded border ${config.badge.color}`}>
              {config.badge.text}
            </span>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full bg-linear-to-r ${config.gradient} transition-all duration-500`}
            style={{ width: `${skill.level}%` }}
          />
        </div>
        <div className="text-right text-sm text-gray-600 mt-1">{skill.level}%</div>
      </div>
    );
  };

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtrer les compétences par catégorie et statut
  const frontendSkills = skills.filter(s => s.category === 'Frontend');
  const backendSkills = skills.filter(s => s.category === 'Backend');
  const learningSkills = skills.filter(s => s.status === 'En apprentissage');
  const discoverySkills = skills.filter(s => s.status === 'En découverte');
  const toolsMethodsSkills = skills.filter(s => s.category === 'Tool' || s.category === 'Method');

  if (loading) {
    return (
      <section id="skills" className="mb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold italic relative inline-block mb-8 ">
          Mes Compétences
          <span className="block h-1 w-20 bg-accent mt-2"></span>
        </h2>
        <div className="flex justify-center items-center min-h-[400px]">
          {/* Animation Chargement*/}
          <Loader className="animate-spin text-primary" size={48} />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="projects" className="mb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold italic relative inline-block mb-8 ">
          Mes Compétences
          <span className="block h-1 w-20 bg-accent mt-2"></span>
        </h2>
        <div className="flex flex-col justify-center items-center min-h-[400px] text-center">
          {/* Icône d'alerte */}
          <AlertCircle className="text-red-500 mb-4" size={48} />

          {/* Message d'erreur */}
          <p className="text-red-500 text-lg mb-4">{error}</p>

          {/* Bouton pour réessayer le chargement */}
          <button
            onClick={fetchSkills} // Rappelle la fonction de récupération
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-black transition"
          >
            Réessayer
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold italic relative inline-block mb-8 ">
          Mes Compétences
          <span className="block h-1 w-20 bg-accent mt-2"></span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-6">
          {/* Frontend Skills */}
          {frontendSkills.length > 0 && (
            <div className="gap-3 border  p-4 md:p-6 border-gray-300 rounded-lg shadow-md w-full bg-white">
              <h3 className="text-2xl font-semibold mb-6 text-primary italic">Frontend</h3>
              <div className="space-y-4">
                {frontendSkills.filter(skill => skill.status !== 'En apprentissage' && skill.status !== 'En découverte').map((skill) => (
                  <SkillBar key={skill._id || skill.name} skill={skill} />
                ))}
              </div>
            </div>
          )}

          {/* Backend Skills */}
          {backendSkills.length > 0 && (
            <div className="gap-3 border  p-4 md:p-6 border-gray-300 rounded-lg shadow-md w-full bg-white">
              <h3 className="text-2xl font-semibold mb-6 text-primary italic">Backend</h3>
              <div className="space-y-4">
                {backendSkills.filter(skill => skill.status !== 'En apprentissage' && skill.status !== 'En découverte').map((skill) => (
                  <SkillBar key={skill._id || skill.name} skill={skill} />
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Learning Skills */}
        {(learningSkills.length > 0 || discoverySkills.length > 0) && (
          <div className="mt-3 gap-3 border p-4 md:p-6 border-gray-300 rounded-lg shadow-md w-full bg-white">
              <h3 className="text-2xl font-semibold mb-6 text-primary italic">En Cours d'apprentissage</h3>
            <div className="space-y-4">
              {learningSkills.filter(skill => skill.category !== "Tool" && skill.category !== "Method").map((skill) => (
                <SkillBar key={skill._id || skill.name} skill={skill} />
              ))}
              {discoverySkills.filter(skill => skill.category !== "Tool" && skill.category !== "Method").map((skill) => (
                <SkillBar key={skill._id || skill.name} skill={skill} />
              ))}
            </div>
          </div>
        )}


        {/* Tools & Methods */}
        {toolsMethodsSkills.length > 0 && (
          <div className="mt-3 p-2 w-full bg-white">
            <h3 className="text-2xl font-semibold mb-6 text-primary italic">
              Outils & Méthodes
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {toolsMethodsSkills.map((skill) => (
                <SkillCard key={skill._id || skill.name} skill={skill} />
              ))}
            </div>
          </div>
        )}


        {/* Scroll Button */}
        <div className="flex justify-center mt-16">
          <button
            onClick={handleScrollToProjects}
            className="bg-transparent border-none flex flex-col items-center mx-auto cursor-pointer hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded"
            aria-label="Faire défiler vers la section projets"
          >
            {/* Icône avec animation bounce */}
            <ChevronsDown className="text-secondary animate-bounce" size={50} />
          </button>
        </div>
      </div>
    </section>
  );
}