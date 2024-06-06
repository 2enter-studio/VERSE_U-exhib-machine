import { db } from '@/server/db';
import type { Tables } from '@/config';

type Player = Tables<'profiles'> & { wearings: { id: string; mesh: string }[] };

async function getLeaderBoard() {
	const { data, error } = await db
		.from('profiles')
		.select('*, wearings(id,mesh)')
		.order('last_active')
		.limit(10)
		.returns<Player[]>();

	if (error) return { error };
	return data;
}

export { getLeaderBoard };
