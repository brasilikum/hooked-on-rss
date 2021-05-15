import { db } from './db';
import * as cookie from 'cookie';

export const getUserInformation = (cookieString: string = '') => {
	try {
		const { session_id } = cookie.parse(cookieString);
		if (!session_id) return;
		return db.queryFirstRow(
			'SELECT * FROM user JOIN cookie ON user.id = cookie.user_id where cookie.cookie_id = ?',
			session_id
		);
	} catch (error) {
		return;
	}
};
