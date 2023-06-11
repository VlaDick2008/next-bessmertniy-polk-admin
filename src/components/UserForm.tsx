'use client';

import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import Input from './UI/Input';
import { toast } from 'react-hot-toast';

interface UserFormProps {
  isLogin?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ isLogin }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onRegisterSubmit = async (data: FieldValues) => {
    axios
      .post('/api/register', {
        username: data.username,
        password: data.password,
        isRootAdmin: data.isRootAdmin,
      })
      .then((res) => {
        toast.success('Пользователь создан!');
        router.push('/admin/approve_story');
      })
      .catch((err) => {
        toast.error('Что-то пошло не так');
      });
  };

  const onLoginSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    })
      .then((res) => {
        router.push('/admin/approve_story');
        toast.success('Успешный вход!');
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error('Что-то пошло не так');
      });
  };
  return (
    <form
      className="flex flex-col md:w-96 w-full border-y-2 md:border-2 border-neutral-300 bg-white md:rounded-xl md:p-6 p-3 gap-1"
      onSubmit={handleSubmit(isLogin ? onLoginSubmit : onRegisterSubmit)}
    >
      <Input
        register={register}
        required={true}
        id="username"
        label="Имя пользователя"
        type="text"
        errors={errors}
        disabled={isLoading}
      />
      <Input
        register={register}
        required={true}
        id="password"
        label="Пароль"
        type="password"
        errors={errors}
        disabled={isLoading}
      />
      {!isLogin && (
        <div className="flex gap-2 items-center mt-2">
          <label>Имеет полные права:</label>
          <input type="checkbox" {...register('isRootAdmin')} disabled={isLoading} />
        </div>
      )}
      <button
        type="submit"
        className="border-2 border-neutral-300 px-3 py-2 rounded-lg mt-6 hover:bg-neutral-300 transition disabled:opacity-70 disabled:hover:bg-white"
        disabled={isLoading}
      >
        {isLogin ? 'Войти' : 'Создать'}
      </button>
    </form>
  );
};

export default UserForm;
