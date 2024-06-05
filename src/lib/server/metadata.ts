import { db } from './db';
import { metadata } from '@/stores';
import config, { type MetaData } from '../config';
import fs from 'fs';

const { bucketNames, metadataFile } = config;

async function loadMetaData() {
	const result: any = {};
	for (const table of bucketNames) {
		const { data, error } = await db.from(table).select('*');
		if (error) continue;
		if (data) result[table] = data;
	}
	fs.writeFileSync(metadataFile, JSON.stringify(result, null, 2));
	metadata.set(result as MetaData);
	return result as MetaData;
}

export { loadMetaData };
