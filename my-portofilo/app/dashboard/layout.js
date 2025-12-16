// app/admin/layout.js
'use client';

import { useRouter } from 'next/navigation';
import HeaderAdmin from '@/components/HeaderAdmin';

export default function AdminLayout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    // Logique de déconnexion
    router.push('/');
  };

  return (
    <div>
      <HeaderAdmin onLogout={handleLogout} />
      {children}
    </div>
  );


  

}