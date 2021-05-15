import { db } from './db';

export const getUserInformation = (cookie: string) => {
	try {
		const raw_cookie = cookie.replace('session_id=', '');
		return db.queryFirstRow(
			'SELECT * FROM user JOIN cookie ON user.id = cookie.user_id where cookie.cookie_id = ?',
			raw_cookie
		);
	} catch (error) {
		return;
	}
};
