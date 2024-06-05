import { createClient } from '@supabase/supabase-js';
import { ENV, LOCAL_DB_URL, LOCAL_SUPA_KEY, SUPA_KEY, SUPA_PROJ_ID } from '$env/static/private';

// const developing = PUBLIC_NODE_ENV !== 'production';
//
// const url = developing ? PUBLIC_LOCAL_SUPABASE_URL : `https://${PUBLIC_SUPA_PROJ_ID}.supabase.co`;
// const key = developing ? PUBLIC_LOCAL_SUPABASE_KEY : PUBLIC_SUPABASE_KEY;

// const db = createClient(url, key);

const developing = ENV === 'development';
console.log(`mode: ${developing ? 'development' : 'production'}`);
const url = developing ? LOCAL_DB_URL : `https://${SUPA_PROJ_ID}.supabase.co`;
const key = developing ? LOCAL_SUPA_KEY : SUPA_KEY;

const db = createClient(url, key);
export { db };
