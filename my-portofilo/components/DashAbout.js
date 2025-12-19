"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fr } from 'date-fns/locale';
import { CalendarDays, CirclePlus, CircleMinus, UserRoundPen, ChevronDown, ChevronUp } from "lucide-react";

export default function DashAbout() {
  // Etat des dates
  const [formationStartDate, setFormationStartDate] = useState(null);
  const [formationEndDate, setFormationEndDate] = useState(null);
  const [experienceStartDate, setExperienceStartDate] = useState(null);
  const [experienceEndDate, setExperienceEndDate] = useState(null);

  //Etat des sections
  const [isDiplomaOpen, setIsDiplomaOpen] = useState(false);
  const [isCertifOpen, setIsCertifOpen] = useState(false);
  const [isExpOpen, setIsExpOpen] = useState(false);

  // États pour données
  const [diplomas, setDiplomas] = useState([]);
  const [certifs, setCertifs] = useState([]);
  const [ExpPros, setExpPros] = useState([]);

  const addDiplomas = () => {
    setDatas([...diplomas, {
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
    setCertifs([...diplomas, {
      id: Date.now(),
      type: "",
      lieu: "",
      dateDebut: "",
      dateFin: ""
    }]);
  };

  const removeCertif = (id) => {
    setExpPros(ExpPros.filter(d => d.id !== id));
  };

      const addExpPros = () => {
    setExpPros([...ExpPros, {
      id: Date.now(),
      type: "",
      lieu: "",
      dateDebut: "",
      dateFin: ""
    }]);
  };

  const removeExpPros = (id) => {
    setExpPros(ExpPros.filter(d => d.id !== id));
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-8 space-y-10">
      {/* En-tête */}
      <div className="space-y-2 pb-6 border-b border-gray-200">
        <h1 className="uppercase text-3xl font-bold text-gray-900 tracking-wide">
          à propos de moi
        </h1>
        <p className="text-gray-600 text-base">
          Modifies tes informations personnelles
        </p>
      </div>

      {/* Localisation */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Localisation
        </h2>
        <div className="pl-4">
          <textarea placeholder="Courte description avec ta localisation." className="shadow-2xl p-3"></textarea>
        </div>
      </div>

      {/* Formations */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Formations
        </h2>


        <div className="border-2 border-secondary rounded-2xl overflow-hidden">
          <button
            onClick={() => setIsDiplomaOpen(!isDiplomaOpen)}
            className="w-full flex items-center justify-between p-4 bg-linear-to-r from-secondary/5 to-transparent hover:from-secondary/10 transition-all"
          >
            <h3 className=" text-gray-800">Parcours Académique</h3>
            <div className="flex items-center gap-2">
              {diplomas.length > 0 && (
                <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full">
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
                <div key={diploma.id} className="space-y-4 p-4 bg-gray-50 rounded-lg relative">
                  <button
                    onClick={() => removeDiploma(diploma.id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <CircleMinus className="w-5 h-5" />
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
                      <label className="block text-sm font-medium text-primary">
                        Date de début
                      </label>
                      <input
                        type="month"
                        className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-primary">
                        Date de fin
                      </label>
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
                className="flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium transition-colors"
              >
                <CirclePlus className="w-5 h-5" />
                Ajouter un diplôme
              </button>
            </div>
          )}
        </div>

        {/* Certifications */}

        <div className="border-2 border-secondary rounded-2xl overflow-hidden">
          <button
            onClick={() => setIsCertifOpen(!isCertifOpen)}
            className="w-full flex items-center justify-between p-4 bg-linear-to-r from-secondary/5 to-transparent hover:from-secondary/10 transition-all"
          >
            <h3 className=" text-gray-800">Certifications</h3>
            <div className="flex items-center gap-2">
              {certifs.length > 0 && (
                <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full">
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
                <div key={certif.id} className="space-y-4 p-4 bg-gray-50 rounded-lg relative">
                  <button
                    onClick={() => removeCertif(certif.id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <CircleMinus className="w-5 h-5" />
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
                      <label className="block text-sm font-medium text-primary">
                        Date de début
                      </label>
                      <input
                        type="month"
                        className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-primary">
                        Date de fin
                      </label>
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
                className="flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium transition-colors"
              >
                <CirclePlus className="w-5 h-5" />
                Ajouter la Certifications
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Expérience Pro */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Expériences Pro
        </h2>


        <div className="border-2 border-secondary rounded-2xl overflow-hidden">

          <button
            onClick={() => setIsExpOpen(!isExpOpen)}
            className="w-full flex items-center justify-between p-4 bg-linear-to-r from-secondary/5 to-transparent hover:from-secondary/10 transition-all"
          >

            <h3 className=" text-gray-800">Expériences</h3>

            <div className="flex items-center gap-2">
              {ExpPros.length > 0 && (
                <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full">
                  {ExpPros.length}
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
              {ExpPros.map((ExpPro) => (
                <div key={ExpPro.id} className="space-y-4 p-4 bg-gray-50 rounded-lg relative">
                  <button
                    onClick={() => removeExpPros(ExpPro.id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <CircleMinus className="w-5 h-5" />
                  </button>

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Type et nom du Poste"
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Lieu d'activité'"
                      className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-primary">
                        Date de début
                      </label>
                      <input
                        type="month"
                        className="w-full bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-primary">
                        Date de fin
                      </label>
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
                className="flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium transition-colors"
              >
                <CirclePlus className="w-5 h-5" />
                Ajouter un diplôme
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Langues */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Langues
        </h2>
        <div className="pl-4">
          <select>
            <option></option>
          </select>
        </div>
      </div>
    </section >
  );
}