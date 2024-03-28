import { Client } from '@notionhq/client';

const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

export default defineEventHandler(async (event) => {
	const databaseId = process.env.NOTION_DATABASE;
	const response = await notion.databases.query({
		database_id: databaseId,
	});
	const articles = response.results.map((entry) => {
		const properties = entry.properties;
		return {
			title: properties.Name.title[0]?.plain_text || '',
			cover: properties.Cover.files.map((file) => file.name) || [],
			date: properties.Date.date || '',
			tags: properties.Tags.multi_select.map((tag) => tag.name) || [],
		};
	});
	return {
		articles,
	};
});
