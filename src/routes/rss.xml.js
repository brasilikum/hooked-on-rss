const render = (
	items
) => `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
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
