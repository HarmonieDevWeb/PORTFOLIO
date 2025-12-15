import { ChevronsDown, Loader, AlertCircle } from "lucide-react";
import * as Icons from "lucide-react";
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

  const SkillCard = ({ skill }) => {
    const IconComponent = skill.icon ? Icons[skill.icon] : null;
    const LevelLabel = (level) => {
      if (level >= 0 && level <= 4) return "Débutant";
      if (level >= 5 && level <= 7) return "Intermédiaire";
      if (level >= 8 && level <= 10) return "Maîtrise";
      return "";
    };
    return (
<div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
  <div className="flex items-center justify-between w-full">
    <div className="flex items-center gap-3">
      {IconComponent && <IconComponent size={24} className="text-primary shrink-0" />}
      <h4 className="font-semibold text-primary">{skill.name}</h4>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 font-medium">{LevelLabel(skill.level)}</span>
    </div>
  </div>
</div>
    );
  };

  const SkillBubble = ({ skill }) => {
    const IconComponent = skill.icon ? Icons[skill.icon] : null;

    return (
      <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5 text-sm border border-gray-300 hover:bg-gray-200 transition-colors cursor-pointer">
        {IconComponent && <IconComponent size={16} className="text-gray-600" />}
        <span className="text-gray-700">{skill.name}</span>
      </div>
    );
  };

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtrer les compétences par catégorie et niveau
  const hardSkillsAcquis = skills.filter(s => s.category === 'HardSkill' && s.level >= 7);
  const hardSkillsLearning = skills.filter(s => s.category === 'HardSkill' && s.level < 7);
  const softSkills = skills.filter(s => s.category === 'Softskill');
  const softSkillsLearning = skills.filter(s => s.category === 'Softskill' && s.level < 7);
  const toolsSkills = skills.filter(s => s.category === 'Tool');
  const methodsSkills = skills.filter(s => s.category === 'Method');

  // Combiner tous les skills en apprentissage (< 7)
  const allLearningSkills = [...hardSkillsLearning, ...softSkillsLearning];

  if (loading) {
    return (
      <section id="skills" className="mb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold italic relative inline-block mb-8 ">
          Mes Compétences
          <span className="block h-1 w-20 bg-accent mt-2"></span>
        </h2>
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader className="animate-spin text-primary" size={48} />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="skills" className="mb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold italic relative inline-block mb-8 ">
          Mes Compétences
          <span className="block h-1 w-20 bg-accent mt-2"></span>
        </h2>
        <div className="flex flex-col justify-center items-center min-h-[400px] text-center">
          <AlertCircle className="text-red-500 mb-4" size={48} />
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={fetchSkills}
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

        {/* HardSkills et SoftSkills en deux colonnes */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-6 mb-3">
          {/* HardSkills (>= 7) */}
          {hardSkillsAcquis.length > 0 && (
            <div className="border p-4 md:p-6 border-gray-300 rounded-lg shadow-md bg-white">
              <h3 className="text-2xl font-semibold mb-6 text-primary italic">HardSkills</h3>
              <div className="space-y-3">
                {hardSkillsAcquis.map((skill) => (
                  <SkillCard key={skill._id || skill.name} skill={skill} showLabel={true} />
                ))}
              </div>
            </div>
          )}

          {/* SoftSkills (tous) */}
          {softSkills.length > 0 && (
            <div className="border p-4 md:p-6 border-gray-300 rounded-lg shadow-md bg-white">
              <h3 className="text-2xl font-semibold mb-6 text-primary italic">SoftSkills</h3>
              <div className="space-y-3">
                {softSkills.filter(s => s.level >= 7).map((skill) => (
                  <SkillCard key={skill._id || skill.name} skill={skill} showLabel={false} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Learning Skills (< 7) */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-6 mb-3">

          {hardSkillsLearning.length > 0 && (
            <div className="mb-3 border p-4 md:p-6 border-gray-300 rounded-lg shadow-md bg-white">
              <h3 className="text-2xl font-semibold mb-6 text-primary italic">En acquisition</h3>
              <div className="space-y-3">
                {hardSkillsLearning.map((skill) => (
                  <SkillCard key={skill._id || skill.name} skill={skill} />
                ))}
              </div>
            </div>
          )}

          {/* Tools & Methods en bulles discrètes */}
          {(toolsSkills.length > 0 || methodsSkills.length > 0) && (
            <div className="mb-3 border p-4 md:p-6 border-gray-200 rounded-lg shadow-sm bg-white">
              {/* Tools */}
              {toolsSkills.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-2xl font-semibold mb-6 text-primary italic">Outils</h3>
                  <div className="flex flex-wrap gap-2">
                    {toolsSkills.map((skill) => (
                      <SkillBubble key={skill._id || skill.name} skill={skill} />
                    ))}
                  </div>
                </div>
              )}

              {/* Methods */}
              {methodsSkills.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-primary italic">Méthodes</h3>
                  <div className="flex flex-wrap gap-2">
                    {methodsSkills.map((skill) => (
                      <SkillBubble key={skill._id || skill.name} skill={skill} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Scroll Button */}
        <div className="flex justify-center mt-16">
          <button
            onClick={handleScrollToProjects}
            className="bg-transparent border-none flex flex-col items-center mx-auto cursor-pointer hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded"
            aria-label="Faire défiler vers la section projets"
          >
            <ChevronsDown className="text-secondary animate-bounce" size={50} />
          </button>
        </div>
      </div>
    </section>
  );
}