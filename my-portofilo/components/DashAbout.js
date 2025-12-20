"use client";

import { useState,  useEffect} from "react";
import { CirclePlus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

export default function DashAbout() {
  // États des sections
  const [isDiplomaOpen, setIsDiplomaOpen] = useState(false);
  const [isCertifOpen, setIsCertifOpen] = useState(false);
  const [isExpOpen, setIsExpOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  // États pour données
  const [location, setLocation] = useState({
    localisation: "",
    remote: false,
    description: ""
  });
  
  const [diplomas, setDiplomas] = useState([]);
  const [certifs, setCertifs] = useState([]);
  const [expPros, setExpPros] = useState([]);
  const [languages, setLanguages] = useState([]);
  
  // État pour les sections "Autres" dynamiques
  const [otherSections, setOtherSections] = useState([]);

  // Gestion Location
  const updateLocation = (field, value) => {
    setLocation(prev => ({ ...prev, [field]: value }));
  };

  // Gestion Diplomas
  const addDiplomas = () => {
    setDiplomas([...diplomas, {
      id: Date.now(),
      title: "",
      localisation: "",
      dateStart: "",
      dateEnd: "",
      type: "diploma"
    }]);
  };

  const removeDiploma = (id) => {
    setDiplomas(diplomas.filter(d => d.id !== id));
  };

  const updateDiploma = (id, field, value) => {
    setDiplomas(diplomas.map(d => 
      d.id === id ? { ...d, [field]: value } : d
    ));
  };

  // Gestion Certifications
  const addCertif = () => {
    setCertifs([...certifs, {
      id: Date.now(),
      title: "",
      localisation: "",
      dateStart: "",
      dateEnd: "",
      type: "certif"
    }]);
  };

  const removeCertif = (id) => {
    setCertifs(certifs.filter(c => c.id !== id));
  };

  const updateCertif = (id, field, value) => {
    setCertifs(certifs.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  // Gestion Expériences Pro
  const addExpPros = () => {
    setExpPros([...expPros, {
      id: Date.now(),
      title: "",
      localisation: "",
      dateStart: "",
      dateEnd: ""
    }]);
  };

  const removeExpPros = (id) => {
    setExpPros(expPros.filter(e => e.id !== id));
  };

  const updateExpPros = (id, field, value) => {
    setExpPros(expPros.map(e => 
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  // Gestion Langues
  const addLanguage = () => {
    setLanguages([...languages, {
      id: Date.now(),
      name: "",
      level: "Débutant"
    }]);
  };

  const removeLanguage = (id) => {
    setLanguages(languages.filter(l => l.id !== id));
  };

  const updateLanguage = (id, field, value) => {
    setLanguages(languages.map(l => 
      l.id === id ? { ...l, [field]: value } : l
    ));
  };

  // Gestion des sections "Autres"
  const addOtherSection = () => {
    const sectionName = prompt("Nom de la nouvelle section (ex: Hobbies, Centres d'intérêt, etc.)");
    if (sectionName && sectionName.trim()) {
      setOtherSections([...otherSections, {
        id: Date.now().toString(),
        label: sectionName.trim(),
        isOpen: false,
        items: []
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
        const newItem = {
          id: Date.now(),
          title: "",
          content: ""
        };
        
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
        <h1 className="uppercase">
          à propos de moi
        </h1>
        <div className="space-y-3">
          <textarea 
            placeholder="Ma présentation en quelques mots" 
            value=""
            onChange={(e) => updatePresent('description', e.target.value)}
            className="w-full shadow-lg rounded-lg p-3 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all bg-white"
            rows={3}
          />
        </div>
      </div>

      {/* Localisation */}
      <div className="space-y-4">
        <h2>Localisation</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Ville, Pays (ex: Le Mans, France)"
            value={location.localisation}
            onChange={(e) => updateLocation('localisation', e.target.value)}
            className="w-full shadow-lg rounded-lg p-3 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all bg-white"
          />
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={location.remote}
              onChange={(e) => updateLocation('remote', e.target.checked)}
              className="mr-3 w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
            />
            <span className="text-gray-700">Disponible en télétravail</span>
          </label>
          <textarea 
            placeholder="Description complémentaire (optionnel)" 
            value={location.description}
            onChange={(e) => updateLocation('description', e.target.value)}
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
                    className="absolute top-0 right-0 text-Primary transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Type et nom du diplôme"
                      value={diploma.title}
                      onChange={(e) => updateDiploma(diploma.id, 'title', e.target.value)}
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Lieu d'obtention"
                      value={diploma.localisation}
                      onChange={(e) => updateDiploma(diploma.id, 'localisation', e.target.value)}
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label>Date de début</label>
                      <input
                        type="month"
                        value={diploma.dateStart}
                        onChange={(e) => updateDiploma(diploma.id, 'dateStart', e.target.value)}
                        className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label>Date de fin</label>
                      <input
                        type="month"
                        value={diploma.dateEnd}
                        onChange={(e) => updateDiploma(diploma.id, 'dateEnd', e.target.value)}
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
                    className="absolute top-0 right-0 text-Primary transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Type et nom de la certification"
                      value={certif.title}
                      onChange={(e) => updateCertif(certif.id, 'title', e.target.value)}
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Lieu d'obtention"
                      value={certif.localisation}
                      onChange={(e) => updateCertif(certif.id, 'localisation', e.target.value)}
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label>Date de début</label>
                      <input
                        type="month"
                        value={certif.dateStart}
                        onChange={(e) => updateCertif(certif.id, 'dateStart', e.target.value)}
                        className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label>Date de fin</label>
                      <input
                        type="month"
                        value={certif.dateEnd}
                        onChange={(e) => updateCertif(certif.id, 'dateEnd', e.target.value)}
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
                    className="absolute top-0 right-0 text-Primary transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Titre du poste"
                      value={expPro.title}
                      onChange={(e) => updateExpPros(expPro.id, 'title', e.target.value)}
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Lieu d'activité"
                      value={expPro.localisation}
                      onChange={(e) => updateExpPros(expPro.id, 'localisation', e.target.value)}
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label>Date de début</label>
                      <input
                        type="month"
                        value={expPro.dateStart}
                        onChange={(e) => updateExpPros(expPro.id, 'dateStart', e.target.value)}
                        className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label>Date de fin</label>
                      <input
                        type="month"
                        value={expPro.dateEnd}
                        onChange={(e) => updateExpPros(expPro.id, 'dateEnd', e.target.value)}
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

      {/* Langues */}
      <div className="space-y-6">
        <h2>Langues</h2>

        <div className="border-2 border-accent rounded-2xl overflow-hidden shadow-sm">
          <button
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="w-full flex items-center justify-between p-4 bg-linear-to-r from-accent/10 to-transparent hover:from-accent/20 transition-all"
          >
            <h3>Langues parlées</h3>
            <div className="flex items-center gap-2">
              {languages.length > 0 && (
                <span className="bg-accent text-white text-xs px-2 py-1 rounded-full font-medium">
                  {languages.length}
                </span>
              )}
              {isLanguageOpen ? (
                <ChevronUp className="w-5 h-5 text-accent" />
              ) : (
                <ChevronDown className="w-5 h-5 text-accent" />
              )}
            </div>
          </button>

          {isLanguageOpen && (
            <div className="p-6 space-y-6 bg-white border-t border-accent/20">
              {languages.map((language) => (
                <div key={language.id} className="space-y-4 p-6 bg-background/30 rounded-lg relative">
                  <button
                    onClick={() => removeLanguage(language.id)}
                    className="absolute top-0 right-0 text-Primary transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Nom de la langue"
                      value={language.name}
                      onChange={(e) => updateLanguage(language.id, 'name', e.target.value)}
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                    <select 
                      value={language.level}
                      onChange={(e) => updateLanguage(language.id, 'level', e.target.value)}
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    >
                      <option>Débutant</option>
                      <option>Scolaire</option>
                      <option>Intermédiaire</option>
                      <option>Maîtrise</option>
                      <option>Bilingue</option>
                    </select>
                  </div>
                </div>
              ))}

              <button
                onClick={addLanguage}
                className="flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors bg-accent/10 hover:bg-accent/20 px-4 py-2 rounded-full"
              >
                <CirclePlus className="w-5 h-5" />
                Ajouter une langue
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
                <h3>{section.label}</h3>
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
              <button
                onClick={() => removeOtherSection(section.id)}
                className="p-4 text-primary transition-colors border-l border-accent"
                title="Supprimer cette section"
              >
                <Trash2 className="w-4 h-4" />
              </button>
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

                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Titre"
                        value={item.title}
                        onChange={(e) => updateItemInSection(section.id, item.id, 'title', e.target.value)}
                        className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                      />
                      <textarea
                        placeholder="Description"
                        value={item.content}
                        onChange={(e) => updateItemInSection(section.id, item.id, 'content', e.target.value)}
                        className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                        rows={3}
                      />
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => addItemToSection(section.id)}
                  className="flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors bg-accent/10 hover:bg-accent/20 px-4 py-2 rounded-full"
                >
                  <CirclePlus className="w-5 h-5" />
                  Ajouter un élément
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