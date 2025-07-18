import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button, Input, Alert } from '../ui';
import { useAuth } from '../../context/AuthContext';
import { validators, validateForm } from '../../utils/validation';

interface LoginFormData extends Record<string, string> {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { login, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field error on change
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear global error
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validation = validateForm(formData, {
      email: validators.email,
      password: (value) => validators.required(value, 'Password'),
    });

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    try {
      await login(formData);
    } catch (err) {
      // Error is handled by the context
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Welcome back</h2>
        <p className="mt-2 text-gray-400">Sign in to your account</p>
      </div>

      {error && (
        <Alert
          type="error"
          message={error}
          onClose={clearError}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          leftIcon={<Mail className="h-5 w-5" />}
          error={formErrors.email}
          required
        />

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          leftIcon={<Lock className="h-5 w-5" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="focus:outline-none hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          }
          error={formErrors.password}
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 bg-slate-800 border-gray-600 rounded"
            />
            <span className="ml-2 text-sm text-gray-400">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Sign in
        </Button>
      </form>

      <div className="text-center">
        <p className="text-gray-400">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;