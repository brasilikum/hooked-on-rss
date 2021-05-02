import { parse, normalize } from 'path';

export const standardize = (path: string) => {
	const parsedPath = parse(normalize(path));
	return {
		dbPath: [parsedPath.dir ? `/${parsedPath.dir}` : null, parsedPath.name, ''].join('/'),
		parsedPath
	};
};
