import React from 'react';

interface HeaderProps {
  label: string;
  description: string;
  filter?: boolean;
}

const Header: React.FC<HeaderProps> = ({ label, description, filter }) => {
  return (
    <header className="md:p-5 p-3 md:min-h-[100px] border-b-2 border-neutral-300 w-full bg-neutral-100 fixed z-50">
      <h1 className="md:text-3xl text-base font-bold">{label}</h1>
      <p className="md:text-sm text-xs mt-1">{description}</p>
    </header>
  );
};

export default Header;
