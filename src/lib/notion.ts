import { Client } from '@notionhq/client';
import { cache } from 'react';
import { Category, Link } from '@/types/navigation';

if (!process.env.NOTION_TOKEN) {
  throw new Error('Missing NOTION_TOKEN environment variable');
}

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// 辅助函数：从属性中获取图标
const getIcon = (item: any) => {
  const iconProperty = item.properties.Icon;
  if (!iconProperty || !iconProperty.files || iconProperty.files.length === 0) {
    return '';
  }
  
  const file = iconProperty.files[0];
  if (file.type === 'external') {
    return file.external.url;
  } else if (file.type === 'file') {
    return file.file.url;
  }
  
  return '';
};

export const getNavigationData = cache(async () => {
  const categories = await notion.databases.query({
    database_id: process.env.NOTION_CATEGORIES_DB_ID!,
    sorts: [
      {
        property: "Order",
        direction: "ascending"
      }
    ]
  });

  const navigationData: Category[] = await Promise.all(
    categories.results.map(async (category: any) => {
      const links = await notion.databases.query({
        database_id: process.env.NOTION_LINKS_DB_ID!,
        filter: {
          property: 'Categories',
          relation: {
            contains: category.id,
          },
        },
        sorts: [
          {
            property: "Order",
            direction: "ascending"
          }
        ]
      });

      return {
        id: category.id,
        name: category.properties.Name.title[0]?.plain_text || '',
        description: category.properties.Description?.rich_text[0]?.plain_text || '',
        icon: getIcon(category),
        order: category.properties.Order?.number || 0,
        links: links.results.map((link: any) => ({
          title: link.properties.Name.title[0]?.plain_text || '',
          description: link.properties.Description.rich_text[0]?.plain_text || '',
          url: link.properties.URL.url || '',
          icon: getIcon(link),
          order: link.properties.Order?.number || 0,
          tags: link.properties.Tags?.multi_select.map((tag: any) => tag.name) || [],
        })),
      };
    })
  );

  return { categories: navigationData };
});

export const revalidate = 3600;