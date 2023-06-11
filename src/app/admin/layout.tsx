import Sidebar from '@/components/Sidebar';
import { Inter } from 'next/font/google';

export const metadata = {
  title: 'Бессмертный полк | Админ',
  description: 'Бессмертный полк',
};

export default function AdminPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-full w-full">
      <Sidebar />
      <div className="w-full">{children}</div>
    </section>
  );
}
