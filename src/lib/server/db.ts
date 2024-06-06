import { createClient } from '@supabase/supabase-js';
import { ENV, LOCAL_DB_URL, LOCAL_SUPA_KEY, SUPA_KEY, SUPA_PROJ_ID } from '$env/static/private';
import { serverState } from '@/server/state';

const developing = ENV === 'development';

serverState.mode = developing ? 'development' : 'development';

const url = developing ? LOCAL_DB_URL : `https://${SUPA_PROJ_ID}.supabase.co`;
const key = developing ? LOCAL_SUPA_KEY : SUPA_KEY;

const db = createClient(url, key);
export { db };
