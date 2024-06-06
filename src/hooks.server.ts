import chalk from 'chalk';
import type { Handle } from '@sveltejs/kit';

import { initFileStorage } from '@/server/download';
import { initMetaData } from '@/server/metadata';
import { wsHandler } from '@/server/ws';

let serverInitialized = false;

async function serverInit() {
	initFileStorage();
	initMetaData();
	console.log(chalk.green('Server initialized!'));
}

const handle: Handle = async ({ event, resolve }) => {
	if (!serverInitialized) {
		console.log(chalk.yellowBright('Initializing server...'));
		await serverInit();
		serverInitialized = false;
	}

	const res = await resolve(event);
	// console.log(event);
	return res;
};

export { handle, wsHandler };
