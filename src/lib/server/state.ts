import config, { type MetaData } from '@/config';
import { deepClone } from '@/utils';

const { EMPTY_METADATA } = config;

const metadata: { old: MetaData; new: MetaData } = {
	old: deepClone(EMPTY_METADATA),
	new: deepClone(EMPTY_METADATA)
};

type ServerState = {
	initialized: boolean;
	mode: 'development' | 'production';
};

let serverState: ServerState = {
	initialized: false,
	mode: 'development'
};

export { metadata, serverState };
