"use client";
{/* CONTACT */ }


import { useState, useRef } from 'react';
import emailJS from '@emailjs/browser';
import { MapPin, AtSign } from 'lucide-react';


export default function Contact() {

  const form = useRef();
  const [fromData, setFormData] = useState({
    from_name: '',
    reply_to: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...fromData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await emailJS.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      console.log
      setStatus({ success: true, message: 'Message envoyé avec succès !' });
      setFormData({
        from_name: '',
        reply_to: '',
        subject: '',
        message: ''
      });

      setTimeout(() => {
        setStatus(null);
      }, 5000);
    } catch (error) {
      setStatus({ success: false, message: "Une erreur s'est produite. Veuillez réessayer." });
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="contact" className="mb-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold italic relative inline-block mb-8 mt-20">
        Me Contacter
        <span className="block h-1 w-20 bg-accent mt-2"></span>
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Informations de contact */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <AtSign className="h-6 w-6 text-primary" />
            <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`} className="text-lg text-gray-700 hover:text-primary transition-colors">
              {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="text-lg text-gray-700">Le Mans, France</span>
          </div>
        </div>

        {/* Formulaire de contact */}
        <form ref={form} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="from_name" className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              name="from_name"
              id="from_name"
              value={fromData.from_name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="reply_to" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="reply_to"
              id="reply_to"
              value={fromData.reply_to}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Sujet</label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={fromData.subject}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              id="message"
              rows="4"
              value={fromData.message}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition disabled:opacity-50"
          >
            {loading ? 'Envoi...' : 'Envoyer'}
          </button>
          {status && (
            <p className={`mt-4 text-sm ${status.success ? 'text-green-600' : 'text-red-600'}`}>
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>



  );
}