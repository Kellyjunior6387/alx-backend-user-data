import React from 'react';
import { Shield } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative max-w-md w-full space-y-8">
        {/* Logo/Brand */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            ALX User Auth
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Secure authentication system
          </p>
        </div>

        {/* Auth Card */}
        <div className="card p-8 backdrop-blur-sm animate-slide-up">
          {children}
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; 2024 ALX Backend User Data. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;