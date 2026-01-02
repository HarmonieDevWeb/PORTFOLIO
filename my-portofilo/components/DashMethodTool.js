"use client";
import React, { useState, useEffect } from "react";
import { CirclePlus, Trash2, ChevronDown, ChevronUp, Save, X } from "lucide-react";
import * as Icons from "lucide-react";
// Composant Modal réutilisable
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-2xl">
          <h3 className="text-lg font-semibold text-primary">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}


export default function DashSkills() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // États des modals
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const [saveStatus, setSaveStatus] = useState("idle");

  // États des catégories
const [isMethodOpen, setIsMethodOpen] = useState(false);
const [isToolOpen, setIsToolOpen] = useState(false);

  const SKILL_ICONS =  [
  'Hammer', 'Wrench', 'Tool', 'Settings', 'Cog',
  'Terminal', 'Command', 'Shell', 'Square', 'Box',
  'Package', 'PackageOpen', 'Boxes', 'Container', 'Layers',
  'Code', 'FileCode', 'File', 'FileText', 'Files',
  'Github', 'GitBranch', 'GitCommit', 'GitMerge', 'Gitlab',
  'Database', 'Server', 'Cloud', 'HardDrive', 'Disc',
  'Chrome', 'Figma', 'Slack', 'Trello', 'Cpu',
  'Monitor', 'Laptop', 'Smartphone', 'Tablet', 'Watch',
  'Pencil', 'Edit', 'PenTool', 'Paintbrush', 'Palette',
  'Zap', 'Gauge', 'Activity', 'BarChart', 'LineChart'
];

  // États pour les données skills
  const [skills, setSkills] = useState({
    tool: [
      {
        name: "",
        level: "",
        status: "",
        icon: ""
      }
    ],
    method: [
      {
        name: "",
        level: "",
        status: "",
        icon: ""
      }
    ]
  });

  //Chagement des données API
  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await fetch('/api/skills');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des compétences');
        }

        const res = await response.json(); // 'res' contient { success, skills, count }

        // On récupère le tableau qui est dans res.skills
        const skillsArray = res.skills || [];

        // Organisation par catégorie
        const organizedSkills = {
        tool: skillsArray.filter(skill => skill.category === 'Tool'),
        method: skillsArray.filter(skill => skill.category === 'Method'),
        };

        setSkills(organizedSkills);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  if (loading) {
    return <div>Chargement des compétences...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  const remoteSkill = (category, index) => {
    const updatedSkills = { ...skills };
    updatedSkills[category].splice(index, 1);
    setSkills(updatedSkills);
  };

  const updateSkill = (category, index, field, value) => {
    const updatedSkills = { ...skills };
    updatedSkills[category][index][field] = value;
    setSkills(updatedSkills);
  };

  const handleSave = async () => {
    setSaveStatus("saving");

    try {
      const response = await fetch('/api/skills', {
        method: 'POST', // Assurez-vous d'avoir une route POST côté API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(skills),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de la sauvegarde');
      }

      setSaveStatus("success");
      setIsSaveModalOpen(false); // Fermer la modal après succès
    } catch (err) {
      console.error(err);
      setSaveStatus("error");
    }
  };


  return (
    <section className="max-w-4xl mx-auto px-6 py-8 pb-24 space-y-10">


      {/* Modals */}
      <Modal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        title="Sauvegarder les Modifications"
      >
        <div className="space-y-4">
          {saveStatus === "idle" && (
            <>
              <p>Êtes-vous sûr de vouloir sauvegarder les modifications apportées aux compétences ?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsSaveModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Confirmer
                </button>
              </div>
            </>
          )}
          {saveStatus === "saving" && <p>Sauvegarde en cours...</p>}
          {saveStatus === "success" && <p className="text-green-600">Modifications sauvegardées avec succès !</p>}
          {saveStatus === "error" && <p className="text-red-600">Erreur lors de la sauvegarde des modifications.</p>}
        </div>
      </Modal>

      <Modal
        isOpen={isAddSectionModalOpen}
        onClose={() => setIsAddSectionModalOpen(false)}
        title="Ajouter une Nouvelle Section"
      >
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Nom de la Section</span>
            <input
              type="text"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              className="mt-    1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsAddSectionModalOpen(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={() => {
                // Logique pour ajouter une nouvelle section
                setIsAddSectionModalOpen(false);
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Ajouter la Section
            </button>
          </div>
        </div>
      </Modal>

      {/* Sections des compétences */}
      {/* method Skills Section */}
      <div className="border-2 border-secondary rounded-2xl overflow-hidden shadow-sm">
        <div
          className="w-full flex items-center justify-between p-4 bg-linear-to-r from-secondary/10 to-transparent hover:from-secondary/20 transition-all"
          onClick={() => setIsMethodOpen(!isMethodOpen)}
        >
          <h3 className="text-xl font-semibold text-primary">Méthodes</h3>
          <div className="flex items-center gap-2">
            {skills?.method.length > 0 && (
                  <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full font-medium">
                {skills.method.length} {skills.method.length === 1}
              </span>
            )}
            {isMethodOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </div>

        </div>
        {isMethodOpen && (
          <div className="p-6 bg-white border-t border-secondary/20">
            <div className="max-h-[600px] overflow-y-auto space-y-6 pr-2">
              {skills.method.map((skill, index) => (
                <div key={index} className="p-4 border-b border-gray-200 rounded-lg">
                  <div className="relative flex items-center justify-between mb-4">
                    <button
                      onClick={() => remoteSkill('method', index)}
                      className="absolute right-1 top-1 p-1 hover:bg-red-100 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-gray-700    ">Type</span>
                      <input
                        type="text"
                        value={skill.name}
                        placeholder="Type de methodSkill"
                        onChange={(e) => updateSkill('method', index, 'name', e.target.value)}
                        className="mt-1 block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </label>
                    <label className="block">
                      <span className="text-gray-700">Niveau</span>
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={skill.level}
                          placeholder="1 à 10"
                          onChange={(e) => updateSkill('method', index, 'level', e.target.value)}
                          className="mt-1 block w-1/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span className="text-gray-700 ml-5"> /10</span>
                      </div>
                    </label>
                    <label className="block">
                      <span className="text-gray-700">Statut</span>
                      <select
                        value={skill.status}
                        onChange={(e) => updateSkill('method', index, 'status', e.target.value)}
                        aria-placeholder="Selection du status"
                        className="mt-1 block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value=""></option>
                        <option value="En découverte">En découverte</option>
                        <option value="En apprentissage">En apprentissage</option>
                        <option value="Acquis">Acquis</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-gray-700">Icône</span>
                      <div className="flex items-center gap-2">
                        <select
                          value={skill.icon}
                          onChange={(e) => updateSkill('method', index, 'icon', e.target.value)}
                          className="mt-1 block w-1/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="" ></option>
                          {SKILL_ICONS.map((iconName) => (
                            <option key={iconName} value={iconName}>
                              {iconName}
                            </option>
                          ))}
                        </select>
                        {skill.icon && Icons[skill.icon] && (
                          React.createElement(Icons[skill.icon], { className: "ml-5 w-8 h-8 text-primary" })
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const updatedSkills = { ...skills };
                  updatedSkills.method.push({ name: "", level: "", status: "", icon: "" });
                  setSkills(updatedSkills);
                }}
                className="mt-4 flex items-center px-4 py-2 bg-accent-500 text-secondary rounded-lg hover:bg-secondary-600 transition-colors"
              >
                <CirclePlus className="w-5 h-5 mr-2" />
                Ajouter une Compétence
              </button>
            </div>
          </div>
        )}
      </div>

            {/* Tools Skills Section */}
      <div className="border-2 border-secondary rounded-2xl overflow-hidden shadow-sm mt-30">
        <div
          className="w-full flex items-center justify-between p-4 bg-linear-to-r from-secondary/10 to-transparent hover:from-secondary/20 transition-all"
          onClick={() => setIsToolOpen(!isToolOpen)}
        >
          <h3 className="text-xl font-semibold text-primary">Outils</h3>
          <div className="flex items-center gap-2">
            {skills?.tool.length > 0 && (
                  <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full font-medium">
                {skills.tool.length} {skills.tool.length === 1}
              </span>
            )}
            {isToolOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </div>

        </div>
        {isToolOpen && (
          <div className="p-6 bg-white border-t border-secondary/20">
            <div className="max-h-[600px] overflow-y-auto space-y-6 pr-2">
              {skills.tool.map((skill, index) => (
                <div key={index} className="p-4 border-b border-gray-200 rounded-lg">
                  <div className="relative flex items-center justify-between mb-4">
                    <button
                      onClick={() => remoteSkill('tool', index)}
                      className="absolute right-1 top-1 p-1 hover:bg-red-100 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-gray-700    ">Type</span>
                      <input
                        type="text"
                        value={skill.name}
                        placeholder="Type de methodSkill"
                        onChange={(e) => updateSkill('method', index, 'name', e.target.value)}
                        className="mt-1 block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </label>
                    <label className="block">
                      <span className="text-gray-700">Niveau</span>
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={skill.level}
                          placeholder="1 à 10"
                          onChange={(e) => updateSkill('tool', index, 'level', e.target.value)}
                          className="mt-1 block w-1/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span className="text-gray-700 ml-5"> /10</span>
                      </div>
                    </label>
                    <label className="block">
                      <span className="text-gray-700">Statut</span>
                      <select
                        value={skill.status}
                        onChange={(e) => updateSkill('tool', index, 'status', e.target.value)}
                        aria-placeholder="Selection du status"
                        className="mt-1 block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value=""></option>
                        <option value="En découverte">En découverte</option>
                        <option value="En apprentissage">En apprentissage</option>
                        <option value="Acquis">Acquis</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-gray-700">Icône</span>
                      <div className="flex items-center gap-2">
                        <select
                          value={skill.icon}
                          onChange={(e) => updateSkill('tool', index, 'icon', e.target.value)}
                          className="mt-1 block w-1/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="" ></option>
                          {SKILL_ICONS.map((iconName) => (
                            <option key={iconName} value={iconName}>
                              {iconName}
                            </option>
                          ))}
                        </select>
                        {skill.icon && Icons[skill.icon] && (
                          React.createElement(Icons[skill.icon], { className: "ml-5 w-8 h-8 text-primary" })
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const updatedSkills = { ...skills };
                  updatedSkills.method.push({ name: "", level: "", status: "", icon: "" });
                  setSkills(updatedSkills);
                }}
                className="mt-4 flex items-center px-4 py-2 bg-accent-500 text-secondary rounded-lg hover:bg-secondary-600 transition-colors"
              >
                <CirclePlus className="w-5 h-5 mr-2" />
                Ajouter une Compétence
              </button>
            </div>
          </div>
        )}
      </div>

    </section>
  );
}
