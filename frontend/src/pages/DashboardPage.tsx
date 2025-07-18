import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui';
import { LogOut, User, Settings, Shield } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">ALX Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">
                Welcome, {user?.firstName || 'User'}!
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                leftIcon={<LogOut className="h-4 w-4" />}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <User className="h-6 w-6 text-blue-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">Profile</h2>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400">Full Name</label>
                <p className="text-white font-medium">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Email</label>
                <p className="text-white font-medium">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Role</label>
                <p className="text-white font-medium">{user?.role || 'User'}</p>
              </div>
            </div>
          </div>

          {/* Settings Card */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <Settings className="h-6 w-6 text-blue-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">Settings</h2>
            </div>
            <div className="space-y-4">
              <Button variant="secondary" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Security Settings
              </Button>
            </div>
          </div>

          {/* Statistics Card */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-blue-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">Statistics</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Account Status</span>
                <span className="px-3 py-1 bg-green-900/20 text-green-400 rounded-full text-sm">
                  Active
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Member Since</span>
                <span className="text-white">
                  {user?.createdAt 
                    ? new Date(user.createdAt).toLocaleDateString()
                    : 'Today'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-8 card p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Welcome to your dashboard!
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            This is a modern, secure authentication system built with React, TypeScript, and Tailwind CSS. 
            Your authentication is handled securely with proper session management and token-based security.
          </p>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;