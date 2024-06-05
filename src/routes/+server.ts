import moment from 'moment';
import { deepClone } from '@/utils';
import { json } from '@sveltejs/kit';
import { getUpdated, loadMetaData } from '@/server/metadata';
import { metadata } from '@/server/state';
import { downloadUpdated } from '@/server/download';
import config from '@/config';

const { META_DATA_UPDATE_TIMEOUT } = config;

async function update() {
	// console.log(`${moment().format('HH:MM:SS')} update`);
	await loadMetaData();
	const updated = getUpdated();
	if (updated.length > 0) {
		console.log(moment().format('hh:mm:ss'), updated);
		await downloadUpdated(updated);
	}
	metadata.old = deepClone(metadata.new);
}

await update();

setInterval(async () => {
	await update();
}, META_DATA_UPDATE_TIMEOUT);

export const GET = async () => {
	return json(metadata);
};
