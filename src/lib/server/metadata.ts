import fs from 'fs';
import validator from 'validator';
import { db } from './db';
import CONFIG, { type BucketName, type MetaData } from '../config';
import { metadata } from './state';

const { BUCKET_NAMES, METADATA_FILE } = CONFIG;

function getMetaDataBackUp() {
	const exist = fs.existsSync(METADATA_FILE);
	if (!exist) {
		return { wearings: [], meshes: [] };
	}
	const data = fs.readFileSync(METADATA_FILE).toString();
	if (validator.isJSON(data)) {
		return JSON.parse(data) as MetaData;
	}
	return { wearings: [], meshes: [] };
}

function setMetaDataBackUp(data: MetaData) {
	fs.writeFileSync(METADATA_FILE, JSON.stringify(data, null, 2));
}

function getUpdated() {
	const result: { table: BucketName; id: string }[] = [];

	for (const table of BUCKET_NAMES) {
		for (const item of metadata.new[table]) {
			const index = metadata.old[table].findIndex((data) => data.id === item.id);
			if (index === -1) {
				result.push({ table, id: item.id });
			} else {
				const updated = metadata.old[table][index].updated_at !== item.updated_at;
				if (updated) {
					console.log(`found something new`);
					result.push({ table, id: item.id });
				}
			}
		}
	}

	return result;
}

async function loadMetaData() {
	for (const table of BUCKET_NAMES) {
		const { data, error } = await db.from(table).select('*');
		if (error) {
			console.error(error);
			continue;
		}

		if (data) metadata.new[table] = data;
	}

	setMetaDataBackUp(metadata.new);
}

metadata.old = getMetaDataBackUp();

export { loadMetaData, getUpdated };
