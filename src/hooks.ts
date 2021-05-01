import db from '$lib/db';

/** @type GetContext */
export async function getContext({ headers }) {
	db.prepare("Select * from msg")
	return {
		db
	};
}
