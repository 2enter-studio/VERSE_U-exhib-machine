import { wsHandler } from '@/server/ws';
import type { WebSocketHandler } from 'svelte-adapter-bun';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const res = await resolve(event);
	// console.log(event);
	return res;
};

export const handleWebsocket: WebSocketHandler = wsHandler;
