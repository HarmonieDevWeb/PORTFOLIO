'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import HeaderAdmin from '@/components/HeaderAdmin';
import Auth from '@/components/Auth';

export default function AdminLayoutClient({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ 
        redirect: false,
        callbackUrl: '/dashboard'
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderAdmin onLogout={handleLogout} />
      <Auth requiredRole="admin">
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </Auth>
    </div>
  );
}