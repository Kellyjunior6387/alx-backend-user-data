import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button, Input, Alert } from '../ui';
import { useAuth } from '../../context/AuthContext';
import { validators, validateForm } from '../../utils/validation';

interface RegisterFormData extends Record<string, string> {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const { register, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      firstName: (value) => validators.name(value, 'First name'),
      lastName: (value) => validators.name(value, 'Last name'),
      email: validators.email,
      password: validators.password,
      confirmPassword: (value) => validators.confirmPassword(formData.password, value),
    });

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
    } catch (err) {
      // Error is handled by the context
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Create account</h2>
        <p className="mt-2 text-gray-400">Sign up to get started</p>
      </div>

      {error && (
        <Alert
          type="error"
          message={error}
          onClose={clearError}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="John"
            leftIcon={<User className="h-5 w-5" />}
            error={formErrors.firstName}
            required
          />

          <Input
            label="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Doe"
            leftIcon={<User className="h-5 w-5" />}
            error={formErrors.lastName}
            required
          />
        </div>

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="john.doe@example.com"
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
          placeholder="Create a strong password"
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

        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm your password"
          leftIcon={<Lock className="h-5 w-5" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="focus:outline-none hover:text-gray-300 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          }
          error={formErrors.confirmPassword}
          required
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 bg-slate-800 border-gray-600 rounded"
            required
          />
          <span className="ml-2 text-sm text-gray-400">
            I agree to the{' '}
            <Link to="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
              Privacy Policy
            </Link>
          </span>
        </div>

        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Create account
        </Button>
      </form>

      <div className="text-center">
        <p className="text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;