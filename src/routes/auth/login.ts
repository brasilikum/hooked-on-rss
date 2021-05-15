import { pbkdf2Sync } from 'crypto';
import * as cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';
import { db } from '$lib/db';

export async function post({ body }) {
	const { email, password, path } = body;
	const user = db.queryFirstRow('SELECT * FROM user WHERE email = ?', email);

	if (!user) {
		return { status: 404, body: { error: 'User does not exists' } };
	}

	const correctPw =
		user.password === pbkdf2Sync(password, user.salt, 1000, 64, `sha512`).toString(`hex`);

	if (!correctPw) {
		return { status: 404, body: { error: 'Pw no match not exists' } };
	}

	const cookieId = uuidv4();

	db.insert('cookie', { cookie_id: cookieId, user_id: user.id });

	const headers = {
		'Set-Cookie': cookie.serialize('session_id', cookieId, {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 30,
			sameSite: 'strict',
			path: '/'
		})
	};

	return {
		status: 200,
		headers,
		body: {
			message: 'success'
		}
	};
}
