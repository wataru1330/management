import React from 'react';
import { useAuth } from './hooks/useAuth';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import ManagerDashboard from './components/Dashboard';
import TalentDashboard from './components/TalentDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole={user.role} />
      {user.role === 'admin' ? (
        <AdminDashboard />
      ) : user.role === 'manager' ? (
        <ManagerDashboard />
      ) : (
        <TalentDashboard />
      )}
    </div>
  );
}

export default App;