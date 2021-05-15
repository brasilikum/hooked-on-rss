<script>
	import { goto } from '$app/navigation';
	import Login from '$lib/components/Login.svelte';
	import Register from '$lib/components/Register.svelte';

	function redirectToHome() {
		goto('/abc');
	}
</script>

<main>
	<Login on:success={redirectToHome} />
	<Register on:success={redirectToHome} />
</main>
