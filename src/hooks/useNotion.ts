import { Client } from '@notionhq/client';

const notion = new Client({
  auth: import.meta.env.VITE_NOTION_TOKEN,
});

export const useNotion = () => {
  const fetchNotionEvents = async () => {
    try {
      const response = await notion.databases.query({
        database_id: import.meta.env.VITE_NOTION_DATABASE_ID,
        filter: {
          property: 'Date',
          date: {
            on_or_after: new Date().toISOString(),
          },
        },
        sorts: [
          {
            property: 'Date',
            direction: 'ascending',
          },
        ],
      });

      return response.results.map(page => ({
        id: page.id,
        title: page.properties.Name.title[0]?.plain_text || '無題',
        start: new Date(page.properties.Date.date?.start),
        end: new Date(page.properties.Date.date?.end || page.properties.Date.date?.start),
        source: 'notion' as const
      }));
    } catch (error) {
      console.error('Error fetching Notion events:', error);
      return [];
    }
  };

  return { fetchNotionEvents };
};