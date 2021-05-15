<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let email;
	let password;

	async function login() {
		const res = await fetch('/auth/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: { 'Content-Type': 'application/json' }
		});
		if (res.ok) {
			dispatch('success');
		} else {
			console.error(await res.json());
		}
	}
</script>

<h1>Login</h1>

<input type="email" bind:value={email} placeholder="Enter Email" />
<input type="password" bind:value={password} placeholder="Enter Password" />

<button on:click={login}>Login</button>
