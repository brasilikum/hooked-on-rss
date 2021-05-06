<script>
	import { goto } from '$app/navigation';
	import Login from '$lib/Login.svelte';
	import Register from '$lib/Register.svelte';

	function redirectToHome() {
		goto('/abc');
	}
</script>

<main>
	<Login on:success={redirectToHome} />
	<Register on:success={redirectToHome} />
</main>
