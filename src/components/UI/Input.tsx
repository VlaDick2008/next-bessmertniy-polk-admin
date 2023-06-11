import React, { HTMLInputTypeAttribute } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  register: UseFormRegister<FieldValues>;
  id: string;
  label: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({ register, id, required, label, type, errors, disabled }) => {
  return (
    <>
      <label className="select-none">{label}</label>
      <input
        disabled={disabled}
        className={`${
          errors[id] ? 'border-red-600' : 'border-neutral-300'
        } border-2  px-3 py-2 rounded-lg focus:outline-none disabled:opacity-70`}
        {...register(id, { required })}
        type={type}
      />
    </>
  );
};

export default Input;
