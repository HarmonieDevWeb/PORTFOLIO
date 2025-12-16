'use client';
import AdminLayout from '@/components/AdminLayout';


export default function DashLayout({ children }) {
  return (
      <AdminLayout>
        {children}
      </AdminLayout>
  );
}