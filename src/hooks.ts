import { getUserInformation } from '$lib/cookies';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, render }) {
	request.locals.user = await getUserInformation(request.headers.cookie);

	const response = await render(request);

	return {
		...response
	};
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession({ locals }) {
	return {
		user: {
			// only include properties needed client-side —
			// exclude anything else attached to the user
			// like access tokens etc

			email: locals.user?.email
		}
	};
}
