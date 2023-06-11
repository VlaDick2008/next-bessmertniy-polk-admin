'use client';

import { Logo } from '@/libs/icons';
import UserForm from '@/components/UserForm';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const session = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/admin/approve_story');
    }
  }, [router, session?.status]);

  return (
    <section className="bg-gray-200 w-full h-full flex flex-col items-center justify-center">
      <div className="md:w-96 w-80 absolute md:top-40 top-[5%]">
        <Logo />
      </div>
      <UserForm isLogin />
    </section>
  );
}
