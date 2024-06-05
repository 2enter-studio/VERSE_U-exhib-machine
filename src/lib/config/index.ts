import type { Tables } from '@/config/supabase';

const bucketNames = ['wearings', 'regions', 'meshes'] as const;
const storageBase = 'storage';
const metadataFile = `${storageBase}/metadata.json`;

type BucketName = (typeof bucketNames)[number];
type MetaData = { [P in BucketName]: Tables<P>[] };

const config = {
	bucketNames,
	storageBase,
	metadataFile
} as const;

type WSMessage = {
	avatars: {
		id: string;
		wearings: { id: string; meshId: string }[];
		skinCol: { X: number; Y: number; Z: number };
	}[];
};

export type { BucketName, WSMessage };

export default config;
export type { Tables, MetaData };
