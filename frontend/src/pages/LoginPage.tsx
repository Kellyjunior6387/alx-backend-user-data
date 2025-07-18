import React from 'react';
import { LoginForm, AuthLayout } from '../components/auth';

const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;