import DB from 'better-sqlite3-helper';
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function post({ params, body, context }) {
	const { path } = params;

	DB().insert('msg', {
		path,
		received_at: new Date().getTime(),
		raw_json: JSON.stringify(body)
	});

	return {
		body: {}
	};
}

export function get({ params }) {
	const { path } = params;
	const cleanPath = path.endsWith('.rss') ? path.slice(0, path.length - 4) : path;
	const msgs = DB().query('SELECT * FROM msg WHERE path=?', cleanPath);

	if (!path.endsWith('.rss')) {
		return {
			body: msgs
		};
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
