"use client";

import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { MapPin, AtSign, Loader2 } from 'lucide-react';

export default function Contact() {
  const form = useRef();
  
  const [formData, setFormData] = useState({
    from_name: '',
    reply_to: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aboutData, setAboutData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) throw new Error('Erreur réseau');
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Le formulaire est indisponible visuellement, mais cette fonction est conservée pour le futur
  };

  if (loading && !aboutData) {
    return (
      <section className="mb-16 px-4 pt-5 max-w-7xl mx-auto flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin text-secondary" size={48} />
      </section>
    );
  }

  return (
    <section id="contact" className="px-4 pt-5 md:px-6 md:pt-10 lg:px-8 lg:pt-15 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold italic relative inline-block mb-8 mt-20">
        Me Contacter
        <span className="block h-1 w-20 bg-accent mt-2"></span>
      </h2>

      <div className="grid md:grid-cols-2 gap-12">
        {/* COLONNE GAUCHE : INFOS DE CONTACT */}
        <div className="space-y-8">
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <AtSign className="h-6 w-6 text-primary" />
              </div>
              <a 
                href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`} 
                className="text-xl md:text-2xl text-secondary hover:text-primary font-bold transition-colors break-all"
              >
                {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <span className="text-lg text-gray-700">
                {aboutData?.location?.localisation || "Le Mans, France"}
              </span>
            </div>
          </div>
        </div>

        {/* COLONNE DROITE : FORMULAIRE (INDISPONIBLE) */}
        <div className="relative z-0">
          <form ref={form} onSubmit={handleSubmit} className="space-y-4">
            {/* Overlay d'indisponibilité */}
            <div className="absolute inset-0 z-20 bg-white/40 backdrop-blur-[2px] flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 p-4 text-center">
              <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 max-w-sm">
                <div className="text-3xl mb-3">🛠️</div>
                <p className="text-secondary font-bold text-lg mb-2">Formulaire en maintenance</p>
                <p className="text-gray-500 text-sm mb-5">
                  Je travaille actuellement sur l'envoi des messages.
                </p>
                <a 
                  href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                  className="inline-block w-full bg-primary text-white py-3 rounded-lg font-semibold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95"
                >
                  Me contacter par Email
                </a>
              </div>
            </div>

            {/* Champs factices pour le visuel */}
            <div className="opacity-30 pointer-events-none select-none">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input type="text" disabled className="mt-1 block w-full border border-gray-200 rounded-lg p-3 bg-gray-50" placeholder="Votre nom" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea disabled rows="4" className="mt-1 block w-full border border-gray-200 rounded-lg p-3 bg-gray-50" placeholder="Votre message"></textarea>
              </div>
              <div className="h-12 bg-gray-200 rounded-lg w-full mt-4"></div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}