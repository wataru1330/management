import React from 'react';
import { Bell, Search, Sparkles } from 'lucide-react';
import CalendarView from './Calendar/CalendarView';

const Dashboard = () => {
  const upcomingStreams = [
    { talent: "星野めい", platform: "YouTube", time: "14:00", title: "歌枠！新曲披露", viewers: "2.5k" },
    { talent: "月下アオイ", platform: "Twitch", time: "18:00", title: "ゲーム実況", viewers: "1.8k" },
    { talent: "桜木リサ", platform: "YouTube", time: "20:00", title: "雑談配信", viewers: "3.2k" },
  ];

  const notifications = [
    { type: "urgent", message: "衣装デザインの承認待ち", time: "10分前" },
    { type: "normal", message: "コラボ配信の調整依頼", time: "1時間前" },
    { type: "normal", message: "月間レポートが完成", time: "3時間前" },
  ];

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="検索..."
            className="pl-10 pr-4 py-2.5 glass-card rounded-xl w-72 focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
          />
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 glass-card rounded-xl hover:shadow-lg transition-all">
            <Bell className="w-6 h-6 text-brand-purple" />
            <span className="absolute -top-1 -right-1 bg-brand-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              3
            </span>
          </button>
          <div className="glass-card p-1.5 rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100"
              alt="Profile"
              className="w-9 h-9 rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <CalendarView />
        </div>

        <div className="space-y-6">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-brand-purple to-brand-pink text-transparent bg-clip-text">本日の配信予定</h2>
              <Sparkles className="w-5 h-5 text-brand-purple" />
            </div>
            <div className="space-y-4">
              {upcomingStreams.map((stream, index) => (
                <div key={index} className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-4 transition-all hover:shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/5 to-brand-pink/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{stream.talent}</p>
                        <p className="text-sm text-gray-600 mt-1">{stream.title}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-brand-purple font-medium">{stream.time}</p>
                        <p className="text-sm text-gray-500 mt-1">{stream.viewers} 視聴予定</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="stat-card">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-brand-purple to-brand-pink text-transparent bg-clip-text mb-4">重要通知</h2>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div key={index} className="group flex items-start space-x-3 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 transition-all hover:shadow-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${notification.type === 'urgent' ? 'bg-brand-pink' : 'bg-brand-purple'}`} />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{notification.message}</p>
                    <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
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

export default Dashboard;