// app/dashboard/admin/layout.jsx
'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';

export default function AdminDashLayout({ children }) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Chargement...</div>;
  }

  if (status === 'unauthenticated') {
    redirect('/dashboard');
  }

  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}
