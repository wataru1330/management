import React from 'react';
import { useAuthStore } from '../store/authStore';
import { User } from '../types/user';
import { UserCog, Users } from 'lucide-react';

const AdminDashboard = () => {
  const { getAllUsers, assignTalentToManager } = useAuthStore();
  const users = getAllUsers();
  const managers = users.filter(u => u.role === 'manager');
  const talents = users.filter(u => u.role === 'talent');

  const handleAssignment = (talentId: string, managerId: string) => {
    try {
      assignTalentToManager({ talentId, managerId });
    } catch (error) {
      console.error('Assignment failed:', error);
    }
  };

  const UserCard = ({ user }: { user: User }) => (
    <div className="glass-card p-4 rounded-xl space-y-2">
      <div className="flex items-center space-x-3">
        <img
          src={user.profileImage}
          alt={user.name}
          className="w-10 h-10 rounded-lg"
        />
        <div>
          <h3 className="font-medium">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">システム管理</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <UserCog className="w-5 h-5 text-brand-purple" />
              <h2 className="text-xl font-semibold">マネージャー一覧</h2>
            </div>
            <div className="space-y-4">
              {managers.map(manager => (
                <UserCard key={manager.id} user={manager} />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-brand-pink" />
              <h2 className="text-xl font-semibold">タレント割り当て</h2>
            </div>
            <div className="space-y-4">
              {talents.map(talent => (
                <div key={talent.id} className="glass-card p-4 rounded-xl space-y-4">
                  <UserCard user={talent} />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      担当マネージャー
                    </label>
                    <select
                      value={talent.managerId || ''}
                      onChange={(e) => handleAssignment(talent.id, e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
                    >
                      <option value="">選択してください</option>
                      {managers.map(manager => (
                        <option key={manager.id} value={manager.id}>
                          {manager.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;