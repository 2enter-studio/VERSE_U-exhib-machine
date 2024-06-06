import { wsHandler } from '@/server/ws';
import type { Handle } from '@sveltejs/kit';

const handle: Handle = async ({ event, resolve }) => {
	const res = await resolve(event);
	// console.log(event);
	return res;
};

export default { handle, wsHandler };
