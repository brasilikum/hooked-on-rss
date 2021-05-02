import db from '$lib/db';

/** @type GetContext */
export async function getContext({ headers }) {
	return {
		db
	};
}
