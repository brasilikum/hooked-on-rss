import { standardize } from '$lib/path';
import DB from 'better-sqlite3-helper';
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function post({ params, body, headers }) {
	const { dbPath } = standardize(params.path);

	DB().insert('msg', {
		path: dbPath,
		received_at: new Date().getTime(),
		raw_body: JSON.stringify(body || {}),
		raw_headers: JSON.stringify(headers || {})
	});

	return {
		body: {}
	};
}

export function get({ params }) {
	const { dbPath, parsedPath } = standardize(params.path);

	let msgs = DB().query('SELECT * FROM msg WHERE path LIKE ?', `${dbPath}%`);
	console.log(msgs);
	if (parsedPath.ext === '.json') {
		return {
			body: msgs.map((msg) => ({
				...msg,
				raw_body: JSON.parse(msg.raw_body),
				raw_headers: JSON.parse(msg.raw_headers)
			}))
		};
	}

	if (!['.rss', '.atom'].includes(parsedPath.ext)) {
		return;
	}

	const feed = render(
		msgs.map((msg) => ({
			title: msg.path,
			description: msg.raw_body,
			date: new Date(msg.received_at),
			slug: ''
		}))
	);
	return {
		body: feed,
		headers: {
			'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
			'Content-Type': 'application/rss+xml'
		}
	};
}

const render = (items) => `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
	<title>Crinkle.dev RSS Feed</title>
    <description>This is a test</description>
    <atom:link href="https://hooked-on-rss.vercel.app/rss.xml" rel="self" type="application/rss+xml" />
	${items
		.map(
			(item) => `
		<item>
			<title>${item.title}</title>
			<link>https://crinkle.dev/writing/${item.slug}</link>
			<description>${item.description}</description>
			<pubDate>${new Date(item.date).toUTCString()}</pubDate>
		    <guid>asdf</guid>
        </item>
	`
		)
		.join('\n')}
</channel>
</rss>`;
