import type { ServerWebSocket, WebSocketHandler } from 'svelte-adapter-bun';

let wsClients = new Set<ServerWebSocket>();

const wsHandler: WebSocketHandler = {
	upgrade(request, upgrade: Function) {
		const url = new URL(request.url);
		if (url.pathname.startsWith('/ws')) {
			return upgrade(request);
		}
	},
	open(ws) {
		wsClients.add(ws);
		broadcastMessage('we got a new client');
	},
	message(ws, message) {
		console.log(message);
	},
	close: (ws) => {
		wsClients.delete(ws);
	}
};

function broadcastMessage(message: any) {
	for (let client of wsClients) {
		client.send(message);
	}
}

function getWebSocketClients() {
	return wsClients;
}

export { wsHandler, broadcastMessage, getWebSocketClients };
