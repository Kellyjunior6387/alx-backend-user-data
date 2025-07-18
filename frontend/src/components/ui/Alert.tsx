import React from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

interface AlertProps {
  type?: 'error' | 'success' | 'info' | 'warning';
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  message,
  onClose,
  className = '',
}) => {
  const icons = {
    error: <AlertCircle className="h-5 w-5" />,
    success: <CheckCircle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
  };

  const colorClasses = {
    error: 'bg-red-900/20 border-red-500/50 text-red-400',
    success: 'bg-green-900/20 border-green-500/50 text-green-400',
    info: 'bg-blue-900/20 border-blue-500/50 text-blue-400',
    warning: 'bg-yellow-900/20 border-yellow-500/50 text-yellow-400',
  };

  return (
    <div className={`border rounded-lg p-4 ${colorClasses[type]} ${className} animate-fade-in`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {icons[type]}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className="text-sm font-medium mb-1">{title}</h3>
          )}
          <p className="text-sm">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-4 inline-flex text-gray-400 hover:text-gray-300 focus:outline-none focus:text-gray-300 transition-colors duration-200"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;