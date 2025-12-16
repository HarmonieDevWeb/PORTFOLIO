
"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Auth({ children, requiredRole = 'admin' }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Si le chargement est terminé
    if (status === 'loading') return;

    // Si pas de session, rediriger vers login
    if (!session) {
      router.push('/dashboard/');
      return;
    }

    // Si l'utilisateur n'a pas le rôle requis
    if (session.user?.role !== requiredRole) {
      router.push('/unauthorized');
      return;
    }
  }, [session, status, router, requiredRole]);

  // Afficher un loader pendant la vérification
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }


  if (!session) {
    return null;
  }

  return <>{children}</>;
}