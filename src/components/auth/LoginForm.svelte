<script lang="ts">
	import { auth } from '$lib/firebase';
	import { signInWithEmailAndPassword } from 'firebase/auth';

	let email = '';
	let password: '';

	async function submit() {
		await signInWithEmailAndPassword(auth, email, password);
	}
</script>

<form on:submit|preventDefault={submit}>
	<div>
		<label for="email">Email</label>
		<input type="text" id="email" name="email" bind:value={email} />
	</div>

	<div>
		<label for="password">Password</label>
		<input
			type="password"
			id="password"
			name="password"
			bind:value={password}
		/>
	</div>

	<div>
		<button type="submit">submit</button>
	</div>
</form>
