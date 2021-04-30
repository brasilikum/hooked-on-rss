const render = (
	items
) => `<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<channel>
	<title>Crinkle.dev RSS Feed</title>
    <description>This is a test</description>
    <link>https://hooked-on-rss.vercel.app/rss.xml</link>
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

export function get() {
	const feed = render([{ title: 'hi', description: 'desc', date: '2021-01-01', slug: 'hi' }]);
	return {
		body: feed,
		headers: {
			'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
			'Content-Type': 'application/rss+xml'
		}
	};
}
