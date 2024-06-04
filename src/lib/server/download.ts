import type { BucketName } from '@/config';
import config from '@/config';
import fs from 'fs';
import { db } from './db';

const { storageBase } = config;

async function downloadFile(bucket: BucketName, name: string) {
	const { data: blob, error } = await db.storage.from(bucket).download(name);
	if (error) return { error };

	const buffer = Buffer.from(await blob.arrayBuffer());

	await fs.promises.writeFile(`${storageBase}/${bucket}/${name}`, buffer);
}

export { downloadFile };
