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
					msgs: msgs.reverse()
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
	import { browser } from '$app/env';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import NewMsgBubble from '$lib/newMsgBubble.svelte';

	export let msgs = [];
	let new_msgs = msgs;
	export let path;

	$: anyNewMsgs = new_msgs.length - msgs.length;

	async function updateMsgs() {
		const { props } = await load({ fetch, page: { params: { path } } });
		const x = await props;
		if (msgs.length == 0) {
			msgs = x.msgs;
		}
		if (x.msgs) {
			new_msgs = x.msgs;
		}

		setTimeout(updateMsgs, 1000);
	}

	function showNewMessages() {
		msgs = new_msgs;
	}

	if (browser) {
		updateMsgs();
	}
</script>

<svelte:head>
	<link
		rel="alternate"
		type="application/rss+xml"
		title="RSS Feed of this page"
		href="{path}.rss"
	/>
</svelte:head>

<div class="flex justify-center pt-2">
	<NewMsgBubble {anyNewMsgs} {showNewMessages} />
</div>

<div class="flex justify-center">
	<div class="min-w-4xl">
		{#each msgs as { raw_body, path, received_at } (received_at)}
			<div
				class="min-w-4xl bg-gray-200 m-6 p-4"
				in:fly={{ y: -100, duration: 400, delay: 200 }}
				animate:flip={{ duration: 250 }}
			>
				<div class="text-gray-500">{path}</div>
				<h1 class="font-bold">{raw_body.title}</h1>
				<code class="font">{JSON.stringify(raw_body)}</code>
			</div>
		{:else}
			<div>No messages in this stream</div>
		{/each}
	</div>
</div>
