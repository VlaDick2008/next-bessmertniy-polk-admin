import React from 'react';
import { usePathname } from 'next/navigation';

interface SidebarItemProps {
  label: string;
  pathname?: string;
  icon: () => React.JSX.Element;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, pathname, icon: Icon }) => {
  const getPathname = usePathname();

  return (
    <div
      className={`${
        getPathname === `/admin/${pathname}` ? 'border-red-800 bg-red-600 text-white' : 'bg-white'
      } select-none flex gap-2 items-center justify-center border-2 border-neutral-300 md:py-2 p-2 md:px-3 rounded-full hover:bg-red-600 hover:border-red-800 hover:text-white transition`}
    >
      <span className="md:block hidden">{label}</span>
      <div className="md:w-6 w-5 md:h-6 h-5 flex flex-col justify-center items-center">
        <Icon />
      </div>
    </div>
  );
};

export default SidebarItem;
