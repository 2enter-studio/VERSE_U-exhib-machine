import { db } from './db';
import config, { type BucketName, type Tables } from '../config';

const { bucketNames } = config;

type TableMap = {
	[P in BucketName]: Tables<P>[];
};

async function fetchAllMetaData() {
	const result: any = {};
	for (const table of bucketNames) {
		const { data, error } = await db.from(table).select('*');
		if (error) continue;
		if (data) result[table] = data;
	}
	return result as TableMap;
}

export { fetchAllMetaData };
