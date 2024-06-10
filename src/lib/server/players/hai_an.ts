import { db } from '@/server/db';
import type { Tables } from '@/config';

async function getHaiAnPlayers() {
	const { data, error } = await db
		.from('hai_an_players')
		.select('player(wearings(id,mesh))')
		.returns<Tables<'hai_an_players'>[]>();

	if (error) return { error };
	return data ?? [];
}

function subscriptToHaiAnPlayers(players?: Tables<'hai_an_players'>) {
	db.channel('hai_an_players')
		.on(
			'postgres_changes',
			{
				table: 'hai_an_players',
				schema: 'public',
				event: 'INSERT'
			},
			(payload) => {
				console.log(payload);
			}
		)
		.subscribe();
}

export { getHaiAnPlayers, subscriptToHaiAnPlayers };
