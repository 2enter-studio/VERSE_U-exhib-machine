import { STORAGE_BASEPATH } from '$env/static/private';
import type { Tables } from '@/config/supabase';

const BUCKET_NAMES = ['wearings', 'meshes'] as const;
const STORAGE_BASE = STORAGE_BASEPATH ?? 'storage';
const METADATA_FILE = `${STORAGE_BASE}/metadata.json`;
const TEXTURE_TYPES = ['baseColor', 'metallic', 'normal', 'roughness'];
const EMPTY_METADATA = { wearings: [], meshes: [] };

type BucketName = (typeof BUCKET_NAMES)[number];
type MetaData = { [P in BucketName]: Tables<P>[] };

const CONFIG = {
	BUCKET_NAMES,
	STORAGE_BASE,
	METADATA_FILE,
	TEXTURE_TYPES,
	EMPTY_METADATA,
	META_DATA_UPDATE_TIMEOUT: 3000
} as const;

type WSMessage = {
	avatars: {
		id: string;
		wearings: { id: string; meshId: string }[];
		skinCol: { X: number; Y: number; Z: number };
	}[];
};

export type { BucketName, WSMessage };

export default CONFIG;
export type { Tables, MetaData };
