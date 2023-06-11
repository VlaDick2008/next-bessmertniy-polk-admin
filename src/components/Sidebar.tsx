'use client';

import React from 'react';
import Link from 'next/link';

import SidebarItem from './UI/SidebarItem';
import { Logo, ResponsiveLogo, checkIcon, listIcon, logoutIcon, userPlus } from '@/libs/icons';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const session = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (session?.status !== 'authenticated') {
      router.push('/');
    }
  }, [router, session?.status]);

  return (
    <aside className="bg-gray-200 h-full md:p-4 p-2  border-r-2 border-neutral-300 flex flex-col justify-between items-center">
      <nav className="flex flex-col md:justify-center md:items-start items-center gap-12 w-full">
        <div className="md:block hidden w-56">
          <Logo />
        </div>
        <div className="md:hidden block w-11">
          <ResponsiveLogo />
        </div>
        <div className="flex flex-col gap-2 md:w-full">
          <Link href={'/admin/approve_story'}>
            <SidebarItem label="Проверить истории" pathname="approve_story" icon={checkIcon} />
          </Link>
          <Link href={'/admin/all_stories'}>
            <SidebarItem label="Список историй" pathname="all_stories" icon={listIcon} />
          </Link>
        </div>
      </nav>
      <div className="flex flex-col gap-2 md:w-full">
        <Link href={'/admin/register_page'}>
          <SidebarItem label="Новый админ" pathname="register_page" icon={userPlus} />
        </Link>
        <button
          onClick={async () => {
            await signOut();
          }}
          className="md:w-full"
        >
          <SidebarItem label="Выход" icon={logoutIcon} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
