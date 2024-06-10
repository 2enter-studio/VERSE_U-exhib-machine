import chalk from 'chalk';
import type { Handle } from '@sveltejs/kit';

import { initFileStorage } from '@/server/download';
import { initMetaData } from '@/server/metadata';
import { getHaiAnPlayers, subscriptToHaiAnPlayers } from '@/server/players/hai_an';
import { wsHandler } from '@/server/ws';
import { serverState } from '@/server/state';

async function serverInit() {
	initFileStorage();
	initMetaData();
	const haiAnPlayers = await getHaiAnPlayers();

	// console.log(JSON.stringify(haiAnPlayers, null, 2));
	subscriptToHaiAnPlayers();

	serverState.initialized = true;
}

const handle: Handle = async ({ event, resolve }) => {
	if (!serverState.initialized) {
		console.log(chalk.yellowBright('Initializing server...'));
		await serverInit();
		console.table(serverState);
	}

	const res = await resolve(event);
	// console.log(event);
	return res;
};

export const handleWebsocket = wsHandler;

export { handle };
