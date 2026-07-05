import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './features/auth/login';
import { Dashboard } from './features/dashboard/Dashboard';

const AppContent: React.FC = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center">
        <span className="text-xs font-mono text-slate-500 tracking-widest animate-pulse">
          INITIALIZING GATEWAY SECURE GRID...
        </span>
      </div>
    );
  }

  return token ? <Dashboard /> : <Login />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;