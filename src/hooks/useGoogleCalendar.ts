import { useState, useEffect } from 'react';

const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const useGoogleCalendar = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      gapi.load('client:auth2', initClient);
    };
    document.body.appendChild(script);
  }, []);

  const initClient = () => {
    gapi.client.init({
      clientId: CLIENT_ID,
      scope: SCOPES,
    }).then(() => {
      setIsInitialized(true);
    });
  };

  const fetchGoogleEvents = async () => {
    if (!isInitialized) return [];

    try {
      const response = await gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      });

      return response.result.items.map(event => ({
        id: event.id,
        title: event.summary,
        start: new Date(event.start.dateTime || event.start.date),
        end: new Date(event.end.dateTime || event.end.date),
        source: 'google' as const
      }));
    } catch (error) {
      console.error('Error fetching Google Calendar events:', error);
      return [];
    }
  };

  return { fetchGoogleEvents };
};