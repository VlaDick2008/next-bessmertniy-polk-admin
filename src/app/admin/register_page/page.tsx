import React from 'react';

import Header from '@/components/Header';
import UserForm from '@/components/UserForm';
import PageInnerWrapper from '@/components/PageInnerWrapper';

const RegisterPage = () => {
  return (
    <PageInnerWrapper
      headerDescription="Добавление нового администратора для системы"
      headerLabel="Создать нового администратора"
    >
      <div className="flex flex-col justify-center items-center w-full h-full">
        <UserForm isLogin={false} />
      </div>
    </PageInnerWrapper>
  );
};

export default RegisterPage;
