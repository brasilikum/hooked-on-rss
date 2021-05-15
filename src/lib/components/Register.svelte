<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let email;
	let path;
	let password;

	async function register() {
		const res = await fetch('/auth/register', {
			method: 'POST',
			body: JSON.stringify({ email, password, path }),
			headers: { 'Content-Type': 'application/json' }
		});
		if (res.ok) {
			dispatch('success');
		} else {
			console.error(await res.json());
		}
	}
</script>

<h1>Register</h1>

<input type="text" bind:value={path} placeholder="Enter Path" />
<input type="email" bind:value={email} placeholder="Enter Email" />
<input type="password" bind:value={password} placeholder="Enter Password" />

<button on:click={register}>Register</button>
