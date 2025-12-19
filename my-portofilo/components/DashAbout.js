// components/DashAbout.js
"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fr } from 'date-fns/locale';
import { CalendarDays } from "lucide-react";

export default function DashAbout() {
  const [formationStartDate, setFormationStartDate] = useState(null);
  const [formationEndDate, setFormationEndDate] = useState(null);
  const [experienceStartDate, setExperienceStartDate] = useState(null);
  const [experienceEndDate, setExperienceEndDate] = useState(null);

  const CustomInput = ({ value, onClick }) => (
    <button
      onClick={onClick}
      className="flex items-center justify-between gap-3 bg-white shadow-sm rounded-lg px-4 py-3 border border-gray-200 hover:border-accent hover:shadow-md transition-all w-full text-left min-w-[200px]"
    >
      <span className="text-primary text-sm">
        {value || "MM/AAAA"}
      </span>
      <CalendarDays className="w-5 h-5 text-gray-400 shrink-0" />
    </button>
  );

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
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Formations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b-2 border-r-2 border-secondary rounded-2xl">
          <h3>Parcours Académique</h3>
          <div className="space-y-2">
          <input type="text" placeholder="Type et nom du diplôme" className="mb-2 bg-white shadow-sm rounded-lg px-2 py-2 border border-gray-200"></input>
          <input type="text" placeholder="Lieu d'obtention" className="bg-white shadow-sm rounded-lg px-2 py-2 border border-gray-200"></input>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-primary mb-2">
                Date de début
              </label>
              <DatePicker
                selected={formationStartDate}
                onChange={(date) => setFormationStartDate(date)}
                locale={fr}
                dateFormat="MM/yyyy"
                customInput={<CustomInput />}
              />
            </div>
            <div className="space-y-2 mb-2">
              <label className="block text-sm font-medium text-primary mb-2">
                Date de fin
              </label>
              <DatePicker
                selected={formationEndDate}
                onChange={(date) => setFormationEndDate(date)}
                locale={fr}
                dateFormat="MM/yyyy"
                customInput={<CustomInput />}
                minDate={formationStartDate}
              />
            </div>
          </div>
        </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b-2 border-r-2 border-secondary rounded-2xl">
          <h3>Certifications</h3>
          <div className="space-y-2">
          <input type="text" placeholder="Type et nom du diplôme" className="mb-2 bg-white shadow-sm rounded-lg px-2 py-2 border border-gray-200"></input>
          <input type="text" placeholder="Lieu d'obtention" className="bg-white shadow-sm rounded-lg px-2 py-2 border border-gray-200"></input>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-primary mb-2">
                Date de début
              </label>
              <DatePicker
                selected={formationStartDate}
                onChange={(date) => setFormationStartDate(date)}
                locale={fr}
                dateFormat="MM/yyyy"
                customInput={<CustomInput />}
              />
            </div>
            <div className="space-y-2 mb-2">
              <label className="block text-sm font-medium text-primary mb-2">
                Date de fin
              </label>
              <DatePicker
                selected={formationEndDate}
                onChange={(date) => setFormationEndDate(date)}
                locale={fr}
                dateFormat="MM/yyyy"
                customInput={<CustomInput />}
                minDate={formationStartDate}
              />
            </div>
          </div>
        </div>

       
      </div>

      {/* Expérience Pro */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Expérience Pro
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-primary mb-2">
              Date de début
            </label>
            <DatePicker
              selected={experienceStartDate}
              onChange={(date) => setExperienceStartDate(date)}
              locale={fr}
              dateFormat="MM/yyyy"
              customInput={<CustomInput />}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-primary mb-2">
              Date de fin
            </label>
            <DatePicker
              selected={experienceEndDate}
              onChange={(date) => setExperienceEndDate(date)}
              locale={fr}
              dateFormat="MM/yyyy"
              customInput={<CustomInput />}
              minDate={experienceStartDate}
            />
          </div>
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
    </section>
  );
}