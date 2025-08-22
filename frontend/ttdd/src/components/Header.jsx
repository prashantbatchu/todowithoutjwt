import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        {user && (
          <div className="flex items-center space-x-4">
            <span>Hello, {user.name}</span>
            <button
              onClick={logout}
              className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;