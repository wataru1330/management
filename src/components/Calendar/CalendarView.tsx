import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, RefreshCw } from 'lucide-react';
import { useGoogleCalendar } from '../../hooks/useGoogleCalendar';
import { useNotion } from '../../hooks/useNotion';

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  source: 'google' | 'notion';
}

const CalendarView = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchGoogleEvents } = useGoogleCalendar();
  const { fetchNotionEvents } = useNotion();

  const fetchAllEvents = async () => {
    setIsLoading(true);
    try {
      const [googleEvents, notionEvents] = await Promise.all([
        fetchGoogleEvents(),
        fetchNotionEvents()
      ]);
      
      setEvents([...googleEvents, ...notionEvents]);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  return (
    <div className="stat-card">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink">
            <CalendarIcon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-semibold bg-gradient-to-r from-brand-purple to-brand-pink text-transparent bg-clip-text">
            統合カレンダー
          </h2>
        </div>
        <button
          onClick={fetchAllEvents}
          className="flex items-center space-x-2 px-4 py-2 text-sm text-brand-purple hover:bg-purple-50 rounded-lg transition-colors"
          disabled={isLoading}
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>更新</span>
        </button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="group flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:shadow-lg transition-all"
          >
            <div className={`w-2 h-2 rounded-full ${
              event.source === 'google' ? 'bg-brand-purple' : 'bg-brand-pink'
            }`} />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{event.title}</h3>
              <p className="text-sm text-gray-600">
                {format(event.start, 'MM/dd HH:mm')} - {format(event.end, 'HH:mm')}
              </p>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full ${
              event.source === 'google'
                ? 'bg-purple-100 text-brand-purple'
                : 'bg-pink-100 text-brand-pink'
            }`}>
              {event.source === 'google' ? 'Google' : 'Notion'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;