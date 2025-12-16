// app/not-found.jsx
import Link from 'next/link';
import { SearchAlert } from 'lucide-react';

/**
 * Composant de page d'erreur 404 (App Router).
 * @module NotFoundComponent
 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50">
            <div className='animate-bounce'><SearchAlert size={50}/></div>
            <h1 className="text-9xl font-extrabold text-primary tracking-widest">404</h1>
      <p className="mt-5 text-xl text-gray-600">
        Désolé, la page que vous recherchez n'existe pas.
      </p>
      
      {/* Utilisation du composant Link */}
      <Link href="/" className="mt-8 px-6 py-3 text-sm font-medium text-white bg-primary rounded-lg hover:bg-black transition-colors shadow-lg">
        Retourner à l'Accueil
      </Link>
    </div>
  );
}