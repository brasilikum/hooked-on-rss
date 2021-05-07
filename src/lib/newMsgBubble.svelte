<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { backIn, backOut, elasticOut, expoOut } from 'svelte/easing';
	export let anyNewMsgs = 0;
	export let showNewMessages;

	function myAnim(node, params) {
		return {
			css: (t) => {
				return `
                    transform: scale(${t}, 1)
                `;
			},
			easing: expoOut
		};
	}
</script>

{#if anyNewMsgs}
	<button
		class="fixed bg-gray-300 px-2  pt-px pb-px rounded-full shadow"
		in:fly={{ y: -50, duration: 250, easing: backOut }}
		out:fade={{ duration: 150 }}
		on:click={showNewMessages}>Show {anyNewMsgs} new messages</button
	>
{/if}
