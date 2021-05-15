import { randomBytes, pbkdf2Sync } from 'crypto';
import * as cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';
import { db } from '$lib/db';

export async function post({ body }) {
	const { email, password, path } = body;
	const user = db.queryFirstRow('SELECT * FROM user WHERE email = ?', email);

	if (user) {
		return { status: 409, body: { error: 'User already exists' } };
	}

	const salt = randomBytes(16).toString('hex');
	const userId = db.insert('user', {
		email,
		salt,
		password: pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`),
		path,
		kind: 'ui',
		permission: 'rw'
	});
	const cookieId = uuidv4();

	db.insert('cookie', { cookie_id: cookieId, user_id: userId });

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
