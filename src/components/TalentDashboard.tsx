import React from 'react';
import { Calendar, MessageSquare, Youtube, Twitch } from 'lucide-react';
import CalendarView from './Calendar/CalendarView';

const TalentDashboard = () => {
  const upcomingStreams = [
    { platform: "YouTube", time: "14:00", title: "歌枠！新曲披露" },
    { platform: "Twitch", time: "18:00", title: "ゲーム実況" },
  ];

  const tasks = [
    { status: "pending", title: "衣装デザインの確認", deadline: "本日中" },
    { status: "in-progress", title: "新曲の練習", deadline: "3日以内" },
    { status: "completed", title: "配信タイトル決め", deadline: "完了" },
  ];

  return (
    <div className="flex-1 p-8 overflow-auto">
      <h1 className="text-2xl font-bold mb-8">マイダッシュボード</h1>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <CalendarView />
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">今日の配信予定</h2>
            <div className="space-y-4">
              {upcomingStreams.map((stream, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{stream.title}</p>
                    <p className="text-sm text-gray-600">{stream.platform}</p>
                  </div>
                  <p className="text-indigo-600 font-medium">{stream.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">タスク管理</h2>
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    task.status === 'completed' ? 'bg-green-500' :
                    task.status === 'in-progress' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-500">{task.deadline}</p>
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

export default TalentDashboard;