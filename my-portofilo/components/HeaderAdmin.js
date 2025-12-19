'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const HeaderAdmin = ({ onLogout }) => {
  const router = useRouter();

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
    }
    // Détruit la session côté serveur
    await signOut({ redirect: false });
    // Redirige vers la page d'accueil
    router.push('/');
  };

  return (
    <header className="h-25 bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-15">
        <div className="flex items-center justify-between h-16">
          {/* Logo et titre */}
          <div className="flex items-center gap-3">
            <img
              src="/images/badge-logo-minimal.svg"
              alt="Logo - Retour en haut de page"
              className="h-15 mt-5 md:h-20 md:w-30 hover:scale-110 transition-transform duration-300"
            />
            <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
          </div>

          {/* Bouton Déconnexion */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
