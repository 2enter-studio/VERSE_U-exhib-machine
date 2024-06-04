const bucketNames = ['wearings', 'regions', 'meshes', 'user_data'] as const;

const config = {
	bucketNames
} as const;

type BucketName = (typeof bucketNames)[number];
type WSMessage = {
	avatars: {
		id: string;
		wearings: { id: string; meshId: string }[];
		skinCol: { X: number; Y: number; Z: number };
	}[];
};

export type { BucketName, WSMessage };

export default config;
