<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		const url = `/${page.params.path}.json`;

		const res = await fetch(url);
		const msgs = await res.json();

		if (res.ok) {
			return {
				props: {
					path: page.params.path,
					msgs
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script>
	export let msgs;
	export let path;
</script>

<svelte:head>
	<link
		rel="alternate"
		type="application/rss+xml"
		title="RSS Feed of this page"
		href="{path}.rss"
	/>
</svelte:head>

<div>
	{#each msgs as { raw_body, path }}
		<div class="bg-gray-200 m-6 p-4">
			<div class="text-gray-500">{path}</div>
			<h1 class="font-bold">{raw_body.title}</h1>
			<code class="font">{JSON.stringify(raw_body)}</code>
		</div>
	{:else}
		<div>No messages in this stream</div>
	{/each}
</div>
