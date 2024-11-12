import React, { useState } from 'react';
import { Calendar, Users, MessageSquare, BarChart, Settings, Youtube, Twitch, LogOut, UserCog } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface SidebarProps {
  userRole: 'admin' | 'manager' | 'talent';
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const { user, logout } = useAuthStore();
  const [activeItem, setActiveItem] = useState('スケジュール');
  
  const adminMenuItems = [
    { icon: UserCog, label: 'システム管理' },
    { icon: Users, label: 'ユーザー管理' },
    { icon: Calendar, label: 'スケジュール' },
    { icon: BarChart, label: '実績分析' },
    { icon: Settings, label: '設定' },
  ];

  const managerMenuItems = [
    { icon: Calendar, label: 'スケジュール' },
    { icon: Users, label: 'タレント管理' },
    { icon: MessageSquare, label: '連絡' },
    { icon: Youtube, label: '配信管理' },
    { icon: Twitch, label: 'コラボ管理' },
    { icon: BarChart, label: '実績分析' },
    { icon: Settings, label: '設定' },
  ];

  const talentMenuItems = [
    { icon: Calendar, label: 'スケジュール' },
    { icon: Youtube, label: '配信管理' },
    { icon: MessageSquare, label: 'マネージャーに連絡' },
    { icon: Settings, label: '設定' },
  ];

  const menuItems = 
    userRole === 'admin' ? adminMenuItems :
    userRole === 'manager' ? managerMenuItems :
    talentMenuItems;

  const handleLogout = () => {
    logout();
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return '管理者';
      case 'manager': return 'マネージャー';
      case 'talent': return 'タレント';
      default: return '';
    }
  };

  return (
    <div className="w-72 bg-gradient-to-b from-brand-purple to-brand-indigo text-white p-6">
      <div className="flex items-center space-x-3 mb-12">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-purple to-brand-pink rounded-full animate-pulse-slow"></div>
          <img
            src={user?.profileImage}
            alt="Profile"
            className="w-12 h-12 rounded-full border-2 border-white/50 relative"
          />
        </div>
        <div>
          <h1 className="font-bold text-lg">{user?.name}</h1>
          <p className="text-white/70 text-sm">{getRoleLabel(userRole)}</p>
        </div>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveItem(item.label)}
            className={`nav-item ${activeItem === item.label ? 'active' : ''}`}
          >
            <item.icon className="w-5 h-5" />
            <span className="flex-1 text-left">{item.label}</span>
            {activeItem === item.label && (
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/10 mt-8">
        <button 
          onClick={handleLogout}
          className="nav-item text-white/70 hover:text-white"
        >
          <LogOut className="w-5 h-5" />
          <span>ログアウト</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;