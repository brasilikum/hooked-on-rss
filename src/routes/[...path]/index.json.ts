import DB from 'better-sqlite3-helper';
import { parse, normalize, resolve } from 'path';
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function post({ params, body, context }) {
	const parsedPath = parse(normalize(params.path));
	const dbPath = [parsedPath.dir ? `/${parsedPath.dir}` : null, parsedPath.name, ''].join('/');

	DB().insert('msg', {
		path: dbPath,
		received_at: new Date().getTime(),
		raw_json: JSON.stringify(body)
	});

	return {
		body: {}
	};
}

export function get({ params }) {
	const parsedPath = parse(normalize(params.path));
	const dbPath = [parsedPath.dir ? `/${parsedPath.dir}` : null, parsedPath.name, ''].join('/');

	console.log(parsedPath, dbPath);
	let msgs = DB().query('SELECT * FROM msg WHERE path LIKE ?', `${dbPath}%`);

	if (parsedPath.ext === '.json') {
		return {
			body: msgs
		};
	}

	if (!['.rss', '.atom'].includes(parsedPath.ext)) {
		return { status: 404, body: { error: 'File extension not supported' } };
	}

	const feed = render(
		msgs.map((msg) => ({
			title: msg.path,
			description: msg.raw_json,
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
