import config, { type MetaData } from '@/config';
import { deepClone } from '@/utils';

const { EMPTY_METADATA } = config;

const metadata: { old: MetaData; new: MetaData } = {
	old: deepClone(EMPTY_METADATA),
	new: deepClone(EMPTY_METADATA)
};

export { metadata };
