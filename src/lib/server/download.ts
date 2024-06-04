import { db } from './db';
import type { BucketName } from '@/config';

console.log(db);

async function downloadFile(bucket: BucketName, name: string) {
	const { data, error } = await db.storage.from(bucket).download(name);
	if (error) return { error };
}
