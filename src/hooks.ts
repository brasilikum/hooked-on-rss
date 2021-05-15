import { getUserInformation } from '$lib/cookies';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, render }) {
	request.locals.user = await getUserInformation(request.headers.cookie);

	const response = await render(request);

	return {
		...response,
		headers: {
			...response.headers
		}
	};
}
