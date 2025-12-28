"use client";
import { useState, useEffect } from "react";
import { CirclePlus, Trash2, ChevronDown, ChevronUp, Save, X } from "lucide-react";

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

export default function DashAbout() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // États des modals
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const [saveStatus, setSaveStatus] = useState("idle");

  // États des sections
  const [isDiplomaOpen, setIsDiplomaOpen] = useState(false);
  const [isCertifOpen, setIsCertifOpen] = useState(false);
  const [isExpOpen, setIsExpOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  // États pour les données utilisateur
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    present: ""
  });

  // États pour données (adaptés au schéma MongoDB)
  const [location, setLocation] = useState({
    localisation: "",
    remote: false,
    description: ""
  });

  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [others, setOthers] = useState([]);

  // Chargement des données depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Charger les données utilisateur
        const userResponse = await fetch('/api/user');
        if (userResponse.ok) {
          const userData = await userResponse.json();
          if (userData.success && userData.user) {
            setUser({
              firstname: userData.user.firstname || "",
              lastname: userData.user.lastname || "",
              email: userData.user.email || "",
              present: userData.user.present || ""
            });
          }
        }

        // Charger les données About
        const aboutResponse = await fetch('/api/about');

        if (!aboutResponse.ok) {
          throw new Error('Erreur lors du chargement');
        }

        const aboutData = await aboutResponse.json();
        console.log('📊 Données reçues:', aboutData);

        if (aboutData) {
          setLocation(aboutData.location || { localisation: "", remote: false, description: "" });
          setEducation(aboutData.education || []);
          setExperience(aboutData.experience || []);
          setLanguages(aboutData.languages || []);
          setOthers(aboutData.others || []);
        }
      } catch (err) {
        console.error('Erreur:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Gestion de la mise à jour de l'utilisateur
  const updateUser = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  // Gestion de la sauvegarde
  const handleSave = async () => {
    setSaveStatus("saving");

    const dataToSave = {
      location,
      education: education.filter(e => e.title?.trim()),
      experience: experience.filter(e => e.title?.trim()),
      languages: languages.filter(l => l.name?.trim()),
      others: others.filter(o => o.title?.trim())
    };

    try {
      // Sauvegarder les données About
      const aboutResponse = await fetch('/api/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave)
      });

      const aboutResult = await aboutResponse.json();

      if (!aboutResponse.ok) {
        throw new Error(aboutResult.error || 'Erreur lors de la sauvegarde');
      }

      // Sauvegarder la présentation de l'utilisateur
      const userResponse = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ present: user.present })
      });

      const userResult = await userResponse.json();

      if (!userResponse.ok) {
        console.warn('Erreur lors de la sauvegarde de la présentation:', userResult.error);
      }

      console.log("✅ Données sauvegardées:", aboutResult.data);
      setSaveStatus("success");

      setTimeout(() => {
        setIsSaveModalOpen(false);
        setSaveStatus("idle");
      }, 1500);
    } catch (error) {
      console.error('❌ Erreur de sauvegarde:', error);
      setSaveStatus("error");
    }
  };

  // Gestion de l'ajout de section "Autres"
  const handleAddSection = () => {
    if (newSectionName.trim()) {
      addOther(newSectionName.trim());
      setNewSectionName("");
      setIsAddSectionModalOpen(false);
    }
  };

  // Gestion Location
  const updateLocation = (field, value) => {
    setLocation(prev => ({ ...prev, [field]: value }));
  };

  // Séparer les diplômes et certifications
  const diplomas = education.filter(e => e.type === "diploma");
  const certifs = education.filter(e => e.type === "certif");

  // Gestion Education (Diplômes)
  const addDiploma = () => {
    setEducation([...education, {
      id: Date.now(),
      title: "",
      localisation: "",
      dateStart: "",
      dateEnd: "",
      type: "diploma"
    }]);
  };

  const removeDiploma = (id) => {
    setEducation(education.filter(e => e.id !== id));
  };

  const updateDiploma = (id, field, value) => {
    setEducation(education.map(e =>
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  // Gestion Certifications
  const addCertif = () => {
    setEducation([...education, {
      id: Date.now(),
      title: "",
      localisation: "",
      dateStart: "",
      dateEnd: "",
      type: "certif"
    }]);
  };

  const removeCertif = (id) => {
    setEducation(education.filter(e => e.id !== id));
  };

  const updateCertif = (id, field, value) => {
    setEducation(education.map(e =>
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  // Gestion Expériences
  const addExperience = () => {
    setExperience([...experience, {
      id: Date.now(),
      title: "",
      localisation: "",
      dateStart: "",
      dateEnd: ""
    }]);
  };

  const removeExperience = (id) => {
    setExperience(experience.filter(e => e.id !== id));
  };

  const updateExperience = (id, field, value) => {
    setExperience(experience.map(e =>
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

  // Gestion Others
  const addOther = (label) => {
    setOthers([...others, {
      id: Date.now(),
      label: label,
      title: "",
      content: ""
    }]);
  };

  const removeOther = (id) => {
    setOthers(others.filter(o => o.id !== id));
  };

  const updateOther = (id, field, value) => {
    setOthers(others.map(o =>
      o.id === id ? { ...o, [field]: value } : o
    ));
  };

  // Regrouper "others" par label
  const groupedOthers = others.reduce((acc, other) => {
    if (!acc[other.label]) {
      acc[other.label] = [];
    }
    acc[other.label].push(other);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-secondary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Erreur: {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="max-w-4xl mx-auto px-6 py-8 pb-24 space-y-10">
        {/* Présentation de l'utilisateur */}
        <div className="space-y-6">
        <div className="space-y-4 pb-6 border-b-2 border-secondary">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-primary">{user.firstname} {user.lastname}</h1>
          <p className="text-gray-600">{user.email}</p>
          </div>
            <div>
              <input
                type="text"
                placeholder="Votre prénom"
                value={user.firstname}
                onChange={(e) => updateUser('firstname', e.target.value)}
                className="w-full shadow-lg rounded-lg p-3 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all bg-white"
              />
              <input
                type="text"
                placeholder="Votre nom"
                value={user.lastname}
                onChange={(e) => updateUser('lastname', e.target.value)}
                className="w-full shadow-lg rounded-lg p-3 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all bg-white mt-2"
              />
              <input
                type="email"
                placeholder="Votre email"
                value={user.email}
                onChange={(e) => updateUser('email', e.target.value)}
                className="w-full shadow-lg rounded-lg p-3 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all bg-white mt-2"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Ma présentation</label>
            <textarea
              placeholder="Présentez-vous en quelques mots..."
              value={user.present}
              onChange={(e) => updateUser('present', e.target.value)}
              className="w-full shadow-lg rounded-lg p-3 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all bg-white"
              rows={4}
            />
          </div>
        </div>

        {/* Localisation */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-primary">Localisation</h4>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Ville, Pays"
              value={location.localisation}
              onChange={(e) => updateLocation('localisation', e.target.value)}
              className="w-full shadow-lg rounded-lg p-3 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all bg-white"
            />
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={location.remote}
                onChange={(e) => updateLocation('remote', e.target.checked)}
                className="w-4 h-4 text-secondary border-gray-300 rounded focus:ring-secondary"
              />
              <span className="text-gray-700 ml-2">Disponible en télétravail</span>
            </label>
            <textarea
              placeholder="Description"
              value={location.description}
              onChange={(e) => updateLocation('description', e.target.value)}
              className="w-full shadow-lg rounded-lg p-3 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all bg-white"
              rows={3}
            />
          </div>
        </div>

        {/* Formations */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-primary">Formations</h4>

          {/* Diplômes */}
          <div className="border-2 border-secondary rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => setIsDiplomaOpen(!isDiplomaOpen)}
              className="w-full flex items-center justify-between p-4 bg-linear-to-r from-secondary/10 to-transparent hover:from-secondary/20 transition-all"
            >
              <h3 className="font-semibold">Parcours Académique</h3>
              <div className="flex items-center gap-2">
                {diplomas.length > 0 && (
                  <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full font-medium">
                    {diplomas.length}
                  </span>
                )}
                {isDiplomaOpen ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
              </div>
            </button>

            {isDiplomaOpen && (
              <div className="p-6 space-y-6 bg-white border-t border-secondary/20">
                {diplomas.map((diploma) => (
                  <div key={diploma.id} className="space-y-4 p-6 bg-background/30 rounded-lg relative">
                    <button
                      onClick={() => removeDiploma(diploma.id)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <input
                      type="text"
                      placeholder="Nom du diplôme"
                      value={diploma.title}
                      onChange={(e) => updateDiploma(diploma.id, 'title', e.target.value)}
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Lieu"
                      value={diploma.localisation}
                      onChange={(e) => updateDiploma(diploma.id, 'localisation', e.target.value)}
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="month"
                        value={diploma.dateStart}
                        onChange={(e) => updateDiploma(diploma.id, 'dateStart', e.target.value)}
                        className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                      />
                      <input
                        type="month"
                        value={diploma.dateEnd}
                        onChange={(e) => updateDiploma(diploma.id, 'dateEnd', e.target.value)}
                        className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                      />
                    </div>
                  </div>
                ))}

                <button
                  onClick={addDiploma}
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
              <h3 className="font-semibold">Certifications</h3>
              <div className="flex items-center gap-2">
                {certifs.length > 0 && (
                  <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full font-medium">
                    {certifs.length}
                  </span>
                )}
                {isCertifOpen ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
              </div>
            </button>

            {isCertifOpen && (
              <div className="p-6 space-y-6 bg-white border-t border-secondary/20">
                {certifs.map((certif) => (
                  <div key={certif.id} className="space-y-4 p-6 bg-background/30 rounded-lg relative">
                    <button
                      onClick={() => removeCertif(certif.id)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <input
                      type="text"
                      placeholder="Nom de la certification"
                      value={certif.title}
                      onChange={(e) => updateCertif(certif.id, 'title', e.target.value)}
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Lieu"
                      value={certif.localisation}
                      onChange={(e) => updateCertif(certif.id, 'localisation', e.target.value)}
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="month"
                        value={certif.dateStart}
                        onChange={(e) => updateCertif(certif.id, 'dateStart', e.target.value)}
                        className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                      />
                      <input
                        type="month"
                        value={certif.dateEnd}
                        onChange={(e) => updateCertif(certif.id, 'dateEnd', e.target.value)}
                        className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                      />
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

        {/* Expériences */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-primary">Expériences Professionnelles</h4>

          <div className="border-2 border-secondary rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => setIsExpOpen(!isExpOpen)}
              className="w-full flex items-center justify-between p-4 bg-linear-to-r from-secondary/10 to-transparent hover:from-secondary/20 transition-all"
            >
              <h3 className="font-semibold">Expériences</h3>
              <div className="flex items-center gap-2">
                {experience.length > 0 && (
                  <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full font-medium">
                    {experience.length}
                  </span>
                )}
                {isExpOpen ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
              </div>
            </button>

            {isExpOpen && (
              <div className="p-6 space-y-6 bg-white border-t border-secondary/20">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-4 p-6 bg-background/30 rounded-lg relative">
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <input
                      type="text"
                      placeholder="Titre du poste"
                      value={exp.title}
                      onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Lieu"
                      value={exp.localisation}
                      onChange={(e) => updateExperience(exp.id, 'localisation', e.target.value)}
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="month"
                        value={exp.dateStart}
                        onChange={(e) => updateExperience(exp.id, 'dateStart', e.target.value)}
                        className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                      />
                      <input
                        type="month"
                        value={exp.dateEnd}
                        onChange={(e) => updateExperience(exp.id, 'dateEnd', e.target.value)}
                        className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                      />
                    </div>
                  </div>
                ))}

                <button
                  onClick={addExperience}
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
          <h4 className="text-lg font-semibold text-primary">Langues</h4>

          <div className="border-2 border-secondary rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="w-full flex items-center justify-between p-4 bg-linear-to-r from-secondary/10 to-transparent hover:from-secondary/20 transition-all"
            >
              <h3 className="font-semibold">Langues parlées</h3>
              <div className="flex items-center gap-2">
                {languages.length > 0 && (
                  <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full font-medium">
                    {languages.length}
                  </span>
                )}
                {isLanguageOpen ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
              </div>
            </button>

            {isLanguageOpen && (
              <div className="p-6 space-y-6 bg-white border-t border-secondary/20">
                {languages.map((lang) => (
                  <div key={lang.id} className="space-y-4 p-6 bg-background/30 rounded-lg relative">
                    <button
                      onClick={() => removeLanguage(lang.id)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <input
                      type="text"
                      placeholder="Nom de la langue"
                      value={lang.name}
                      onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                    />
                    <select
                      value={lang.level}
                      onChange={(e) => updateLanguage(lang.id, 'level', e.target.value)}
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                    >
                      <option>Débutant</option>
                      <option>Scolaire</option>
                      <option>Intermédiaire</option>
                      <option>Maîtrise</option>
                      <option>Bilingue</option>
                    </select>
                  </div>
                ))}

                <button
                  onClick={addLanguage}
                  className="flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium transition-colors bg-secondary/10 hover:bg-secondary/20 px-4 py-2 rounded-full"
                >
                  <CirclePlus className="w-5 h-5" />
                  Ajouter une langue
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Autres sections */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-primary">Autres</h4>
            <button
              onClick={() => setIsAddSectionModalOpen(true)}
              className="flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium transition-colors bg-secondary/10 hover:bg-secondary/20 px-4 py-2 rounded-full text-sm"
            >
              <CirclePlus className="w-5 h-5" />
              Nouvelle section
            </button>
          </div>

          {Object.entries(groupedOthers).map(([label, items], index) => (
            <div key={`${label}-${index}`} className="border-2 border-secondary rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 bg-linear-to-r from-secondary/10 to-transparent">
                <h3 className="font-semibold">{label}</h3>
              </div>

              <div className="p-6 space-y-6 bg-white border-t border-secondary/20">
                {items.map((item) => (
                  <div key={`other-${item.id}`} className="space-y-4 p-6 bg-background/30 rounded-lg relative">
                    <button
                      onClick={() => removeOther(item.id)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <input
                      type="text"
                      placeholder="Titre"
                      value={item.title}
                      onChange={(e) => updateOther(item.id, 'title', e.target.value)}
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                    />
                    <textarea
                      placeholder="Contenu"
                      value={item.content}
                      onChange={(e) => updateOther(item.id, 'content', e.target.value)}
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                      rows={3}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bouton de sauvegarde fixe */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setIsSaveModalOpen(true)}
            className="w-full bg-linear-to-r from-secondary to-accent text-white font-semibold py-3 px-6 rounded-full hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Sauvegarder
          </button>
        </div>
      </div>

      {/* Modal de sauvegarde */}
      <Modal isOpen={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)} title="Sauvegarder">
        <div className="space-y-6">
          {saveStatus === "idle" && (
            <>
              <p className="text-gray-600">Voulez-vous sauvegarder toutes les modifications ?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsSaveModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 bg-linear-to-r from-secondary to-accent text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Confirmer
                </button>
              </div>
            </>
          )}

          {saveStatus === "saving" && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent mx-auto mb-4"></div>
              <p className="text-gray-600">Sauvegarde en cours...</p>
            </div>
          )}

          {saveStatus === "success" && (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-600 font-medium">Modifications sauvegardées !</p>
            </div>
          )}

          {saveStatus === "error" && (
            <>
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-gray-600">Une erreur est survenue lors de la sauvegarde.</p>
              </div>
              <button
                onClick={handleSave}
                className="w-full px-4 py-2 bg-linear-to-r from-secondary to-accent text-white rounded-lg hover:shadow-lg transition-all"
              >
                Réessayer
              </button>
            </>
          )}
        </div>
      </Modal>

      {/* Modal d'ajout de section */}
      <Modal
        isOpen={isAddSectionModalOpen}
        onClose={() => {
          setIsAddSectionModalOpen(false);
          setNewSectionName("");
        }}
        title="Ajouter une nouvelle section"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Nom de la section
            </label>
            <input
              type="text"
              placeholder="Ex: Hobbies, Centres d'intérêt, Bénévolat..."
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newSectionName.trim()) {
                  handleAddSection();
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              autoFocus
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setIsAddSectionModalOpen(false);
                setNewSectionName("");
              }}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleAddSection}
              disabled={!newSectionName.trim()}
              className="flex-1 px-4 py-2 bg-linear-to-r from-accent to-purple-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CirclePlus className="w-4 h-4" />
              Créer
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}