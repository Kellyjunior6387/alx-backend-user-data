import React, { type InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, className = '', ...props }, ref) => {
    const baseClasses = 'w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-1';
    
    const borderClasses = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500';

    const inputClasses = `${baseClasses} ${borderClasses} ${leftIcon ? 'pl-12' : ''} ${rightIcon ? 'pr-12' : ''} ${className}`;

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">{leftIcon}</span>
            </div>
          )}
          <input ref={ref} className={inputClasses} {...props} />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <span className="text-gray-400">{rightIcon}</span>
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-400 animate-fade-in">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;