import { json } from '@sveltejs/kit';
import { getLeaderBoard } from '@/server/players';

export const GET = async () => {
	const people = await getLeaderBoard();
	return json(people);
};
