const bucketNames = ['wearings', 'regions', 'meshes'] as const;
const storageBase = 'storage';
const metadataFile = `${storageBase}/metadata.json`;

type BucketName = (typeof bucketNames)[number];

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
export type { Tables } from './supabase';
