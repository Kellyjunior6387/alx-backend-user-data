export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validators = {
  email: (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return null;
  },

  password: (password: string): string | null => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/(?=.*\d)/.test(password)) return 'Password must contain at least one number';
    return null;
  },

  confirmPassword: (password: string, confirmPassword: string): string | null => {
    if (!confirmPassword) return 'Please confirm your password';
    if (password !== confirmPassword) return 'Passwords do not match';
    return null;
  },

  name: (name: string, fieldName: string = 'Name'): string | null => {
    if (!name?.trim()) return `${fieldName} is required`;
    if (name.trim().length < 2) return `${fieldName} must be at least 2 characters`;
    if (name.trim().length > 50) return `${fieldName} must be less than 50 characters`;
    return null;
  },

  required: (value: string, fieldName: string): string | null => {
    if (!value?.trim()) return `${fieldName} is required`;
    return null;
  },
};

export const validateForm = <T extends Record<string, string>>(
  data: T,
  rules: Record<keyof T, (value: string, ...args: any[]) => string | null>
): ValidationResult => {
  const errors: Record<string, string> = {};

  for (const [field, validator] of Object.entries(rules)) {
    const error = validator(data[field as keyof T] || '');
    if (error) {
      errors[field] = error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};