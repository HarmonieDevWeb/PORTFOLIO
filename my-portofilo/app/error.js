// app/error.jsx
'use client'; // Ce composant DOIT être un Client Component

import { ServerCrash } from 'lucide-react';
import { useEffect } from 'react';


/**
 * Composant de gestion d'erreurs au niveau du App Router.
 * @param {object} props - Les props d'erreur
 * @param {Error} props.error - L'objet Error survenu.
 * @param {() => void} props.reset - Fonction pour tenter de recharger le segment.
 * @module ErrorBoundaryComponent
 */
export default function ErrorBoundary({ error, reset }) {
  // Optionnel: loguer l'erreur pour un service d'analyse
  useEffect(() => {
    console.error('Erreur capturée par Boundary:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50">
                  <div className='animate-bounce'><ServerCrash size={50}/></div>
      <h1 className="text-9xl font-extrabold text-accent tracking-widest">500</h1>
      <div className="bg-accent px-2 text-sm rounded rotate-12 absolute text-white">
        Erreur Inattendue
      </div>
      <p className="mt-5 text-xl text-gray-600">
        Oups! Quelque chose s'est mal passé : {error.message}.
      </p>
      
      {/* Bouton pour retenter le rendu */}
      <button
        onClick={
          // Tenter de récupérer en re-rendant le segment
          () => reset()
        }
        className="mt-8 px-6 py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-lg"
      >
        Réessayer
      </button>
    </div>
  );
}