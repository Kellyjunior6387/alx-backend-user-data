import React from 'react';
import { RegisterForm, AuthLayout } from '../components/auth';

const RegisterPage: React.FC = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;