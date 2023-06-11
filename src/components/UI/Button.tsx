'use client';

import React from 'react';

interface ButtonProps {
  label: string;
  icon: () => React.JSX.Element;
  danger?: boolean;
  approve?: boolean;
  disabled?: boolean;
  cancel?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon: Icon,
  danger,
  approve,
  cancel,
  disabled,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${
        danger
          ? ' border-red-800 bg-red-600 text-white hover:bg-red-700 hover:border-red-900 disabled:hover:bg-red-600'
          : approve
          ? 'border-emerald-700 bg-emerald-500 text-white hover:bg-emerald-600 hover:border-emerald-800 disabled:hover:bg-emerald-500'
          : cancel
          ? 'border-yellow-600 bg-yellow-500 text-white hover:bg-yellow-600 hover:border-yellow-800 disabled:hover:bg-yellow-500'
          : 'hover:bg-gray-100 border-neutral-300 disabled:hover:bg-gray-100'
      } select-none flex gap-2 items-center justify-center border-2 py-2 px-3 rounded-full md:w-full w-10 h-10 transition disabled:opacity-70 `}
    >
      <span className="md:block hidden">{label}</span>
      <div className="md:w-6 w-5 md:h-6 h-5 flex flex-col justify-center items-center">
        <Icon />
      </div>
    </button>
  );
};

export default Button;
