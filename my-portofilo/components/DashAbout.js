"use client";

import { useState } from "react";
import { CirclePlus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

export default function DashAbout() {
  // États des sections
  const [isDiplomaOpen, setIsDiplomaOpen] = useState(false);
  const [isCertifOpen, setIsCertifOpen] = useState(false);
  const [isExpOpen, setIsExpOpen] = useState(false);

  // États pour données
  const [diplomas, setDiplomas] = useState([]);
  const [certifs, setCertifs] = useState([]);
  const [expPros, setExpPros] = useState([]);
  
  // État pour les sections "Autres" dynamiques
  const [otherSections, setOtherSections] = useState([
    {
      id: 'langues',
      title: 'Langues',
      isOpen: false,
      items: [],
      type: 'langue'
    }
  ]);

  const addDiplomas = () => {
    setDiplomas([...diplomas, {
      id: Date.now(),
      type: "",
      lieu: "",
      dateDebut: "",
      dateFin: ""
    }]);
  };

  const removeDiploma = (id) => {
    setDiplomas(diplomas.filter(d => d.id !== id));
  };

  const addCertif = () => {
    setCertifs([...certifs, {
      id: Date.now(),
      type: "",
      lieu: "",
      dateDebut: "",
      dateFin: ""
    }]);
  };

  const removeCertif = (id) => {
    setCertifs(certifs.filter(c => c.id !== id));
  };

  const addExpPros = () => {
    setExpPros([...expPros, {
      id: Date.now(),
      type: "",
      lieu: "",
      dateDebut: "",
      dateFin: ""
    }]);
  };

  const removeExpPros = (id) => {
    setExpPros(expPros.filter(e => e.id !== id));
  };

  // Gestion des sections "Autres"
  const addOtherSection = () => {
    const sectionName = prompt("Nom de la nouvelle section (ex: Hobbies, Certifications personnelles, etc.)");
    if (sectionName && sectionName.trim()) {
      setOtherSections([...otherSections, {
        id: Date.now().toString(),
        title: sectionName.trim(),
        isOpen: false,
        items: [],
        type: 'general'
      }]);
    }
  };

  const removeOtherSection = (sectionId) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette section et tous ses éléments ?")) {
      setOtherSections(otherSections.filter(s => s.id !== sectionId));
    }
  };

  const toggleOtherSection = (sectionId) => {
    setOtherSections(otherSections.map(section => 
      section.id === sectionId 
        ? { ...section, isOpen: !section.isOpen }
        : section
    ));
  };

  const addItemToSection = (sectionId) => {
    setOtherSections(otherSections.map(section => {
      if (section.id === sectionId) {
        const newItem = section.type === 'langue' 
          ? { id: Date.now(), langue: "", niveau: "Débutant" }
          : { id: Date.now(), titre: "", description: "" };
        
        return {
          ...section,
          items: [...section.items, newItem]
        };
      }
      return section;
    }));
  };

  const removeItemFromSection = (sectionId, itemId) => {
    setOtherSections(otherSections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: section.items.filter(item => item.id !== itemId)
        };
      }
      return section;
    }));
  };

  const updateItemInSection = (sectionId, itemId, field, value) => {
    setOtherSections(otherSections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: section.items.map(item => 
            item.id === itemId 
              ? { ...item, [field]: value }
              : item
          )
        };
      }
      return section;
    }));
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-8 space-y-10">
      {/* En-tête */}
      <div className="space-y-2 pb-6 border-b border-gray-200">
        <h1 className="uppercase tracking-wide">
          à propos de moi
        </h1>
        <p className="text-gray-600">
          Modifies tes informations personnelles
        </p>
      </div>

      {/* Localisation */}
      <div className="space-y-4">
        <h2>Localisation</h2>
        <div>
          <textarea 
            placeholder="Courte description avec ta localisation." 
            className="w-full shadow-lg rounded-lg p-3 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all bg-white"
            rows={3}
          />
        </div>
      </div>

      {/* Formations */}
      <div className="space-y-6">
        <h2>Formations</h2>

        {/* Parcours Académique */}
        <div className="border-2 border-secondary rounded-2xl overflow-hidden shadow-sm">
          <button
            onClick={() => setIsDiplomaOpen(!isDiplomaOpen)}
            className="w-full flex items-center justify-between p-4 bg-linear-to-r from-secondary/10 to-transparent hover:from-secondary/20 transition-all"
          >
            <h3>Parcours Académique</h3>
            <div className="flex items-center gap-2">
              {diplomas.length > 0 && (
                <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full font-medium">
                  {diplomas.length}
                </span>
              )}
              {isDiplomaOpen ? (
                <ChevronUp className="w-5 h-5 text-secondary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-secondary" />
              )}
            </div>
          </button>

          {isDiplomaOpen && (
            <div className="p-6 space-y-6 bg-white border-t border-secondary/20">
              {diplomas.map((diploma) => (
                <div key={diploma.id} className="space-y-4 p-6 bg-background/30 rounded-lg relative">
                  <button
                    onClick={() => removeDiploma(diploma.id)}
                      className="absolute top-0 right-0 text-Primary transition-colors"                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Type et nom du diplôme"
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Lieu d'obtention"
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label>Date de début</label>
                      <input
                        type="month"
                        className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label>Date de fin</label>
                      <input
                        type="month"
                        className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={addDiplomas}
                className="flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium transition-colors bg-secondary/5 hover:bg-secondary/10 px-4 py-2 rounded-full"
              >
                <CirclePlus className="w-5 h-5" />
                Ajouter un diplôme
              </button>
            </div>
          )}
        </div>

        {/* Certifications */}
        <div className="border-2 border-secondary rounded-2xl overflow-hidden shadow-sm">
          <button
            onClick={() => setIsCertifOpen(!isCertifOpen)}
            className="w-full flex items-center justify-between p-4 bg-linear-to-r from-secondary/10 to-transparent hover:from-secondary/20 transition-all"
          >
            <h3>Certifications</h3>
            <div className="flex items-center gap-2">
              {certifs.length > 0 && (
                <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full font-medium">
                  {certifs.length}
                </span>
              )}
              {isCertifOpen ? (
                <ChevronUp className="w-5 h-5 text-secondary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-secondary" />
              )}
            </div>
          </button>

          {isCertifOpen && (
            <div className="p-6 space-y-6 bg-white border-t border-secondary/20">
              {certifs.map((certif) => (
                <div key={certif.id} className="space-y-4 p-6 bg-background/30 rounded-lg relative">
                  <button
                    onClick={() => removeCertif(certif.id)}
                      className="absolute top-0 right-0 text-Primary transition-colors"                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Type et nom de la certification"
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Lieu d'obtention"
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label>Date de début</label>
                      <input
                        type="month"
                        className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label>Date de fin</label>
                      <input
                        type="month"
                        className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={addCertif}
                className="flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium transition-colors bg-secondary/5 hover:bg-secondary/10 px-4 py-2 rounded-full"
              >
                <CirclePlus className="w-5 h-5" />
                Ajouter une certification
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Expérience Pro */}
      <div className="space-y-6">
        <h2>Expériences Pro</h2>

        <div className="border-2 border-secondary rounded-2xl overflow-hidden shadow-sm">
          <button
            onClick={() => setIsExpOpen(!isExpOpen)}
            className="w-full flex items-center justify-between p-4 bg-linear-to-r from-secondary/10 to-transparent hover:from-secondary/20 transition-all"
          >
            <h3>Expériences</h3>
            <div className="flex items-center gap-2">
              {expPros.length > 0 && (
                <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full font-medium">
                  {expPros.length}
                </span>
              )}
              {isExpOpen ? (
                <ChevronUp className="w-5 h-5 text-secondary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-secondary" />
              )}
            </div>
          </button>

          {isExpOpen && (
            <div className="p-6 space-y-6 bg-white border-t border-secondary/20">
              {expPros.map((expPro) => (
                <div key={expPro.id} className="space-y-4 p-6 bg-background/30 rounded-lg relative">
                  <button
                    onClick={() => removeExpPros(expPro.id)}
                      className="absolute top-0 right-0 text-Primary transition-colors"                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Type et nom du Poste"
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Lieu d'activité"
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label>Date de début</label>
                      <input
                        type="month"
                        className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label>Date de fin</label>
                      <input
                        type="month"
                        className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={addExpPros}
                className="flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium transition-colors bg-secondary/5 hover:bg-secondary/10 px-4 py-2 rounded-full"
              >
                <CirclePlus className="w-5 h-5" />
                Ajouter une expérience
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sections "Autres" dynamiques */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2>Autres</h2>
          <button
            onClick={addOtherSection}
            className="flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors bg-accent/10 hover:bg-accent/20 px-4 py-2 rounded-full text-sm"
          >
            <CirclePlus className="w-5 h-5" />
            Nouvelle section
          </button>
        </div>

        {otherSections.map((section) => (
          <div key={section.id} className="border-2 border-accent rounded-2xl overflow-hidden shadow-sm">
            <div className="flex items-center">
              <button
                onClick={() => toggleOtherSection(section.id)}
                className="flex-1 flex items-center justify-between p-4 bg-linear-to-r from-accent/10 to-transparent hover:from-accent/20 transition-all"
              >
                <h3>{section.title}</h3>
                <div className="flex items-center gap-2">
                  {section.items.length > 0 && (
                    <span className="bg-accent text-white text-xs px-2 py-1 rounded-full font-medium">
                      {section.items.length}
                    </span>
                  )}
                  {section.isOpen ? (
                    <ChevronUp className="w-5 h-5 text-accent" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-accent" />
                  )}
                </div>
              </button>
              {section.id !== 'langues' && (
                <button
                  onClick={() => removeOtherSection(section.id)}
                  className="p-4 text-primary transition-colors border-l border-accent"
                  title="Supprimer cette section"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {section.isOpen && (
              <div className="p-6 space-y-6 bg-white border-t border-accent/20">
                {section.items.map((item) => (
                  <div key={item.id} className="space-y-4 p-6 bg-background/30 rounded-lg relative">
                    <button
                      onClick={() => removeItemFromSection(section.id, item.id)}
                      className="absolute top-0 right-0 text-Primary transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {section.type === 'langue' ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="La langue"
                          value={item.langue || ""}
                          onChange={(e) => updateItemInSection(section.id, item.id, 'langue', e.target.value)}
                          className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                        />
                        <select 
                          value={item.niveau || "Débutant"}
                          onChange={(e) => updateItemInSection(section.id, item.id, 'niveau', e.target.value)}
                          className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                        >
                          <option>Débutant</option>
                          <option>Scolaire</option>
                          <option>Intermédiaire</option>
                          <option>Maîtrise</option>
                          <option>Bilingue</option>
                        </select>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Titre"
                          value={item.titre || ""}
                          onChange={(e) => updateItemInSection(section.id, item.id, 'titre', e.target.value)}
                          className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                        />
                        <textarea
                          placeholder="Description"
                          value={item.description || ""}
                          onChange={(e) => updateItemInSection(section.id, item.id, 'description', e.target.value)}
                          className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                          rows={3}
                        />
                      </div>
                    )}
                  </div>
                ))}

                <button
                  onClick={() => addItemToSection(section.id)}
                  className="flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors bg-accent/10 hover:bg-accent/20 px-4 py-2 rounded-full"
                >
                  <CirclePlus className="w-5 h-5" />
                  Ajouter {section.type === 'langue' ? 'une langue' : 'un élément'}
                </button>
              </div>
            )}
          </div>
        ))}

        {otherSections.length === 0 && (
          <p className="text-center text-text/60 py-8">
            Aucune section. Cliquez sur "Nouvelle section" pour commencer.
          </p>
        )}
      </div>
    </section>
  );
}