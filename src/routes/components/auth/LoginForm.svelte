<script lang="ts">
	import { firebase, auth } from '$lib/firebase';
	import {
		signInWithEmailAndPassword,
		signOut,
		createUserWithEmailAndPassword,
		onAuthStateChanged
	} from 'firebase/auth';

	let email = '';
	let password: '';

	async function submit() {
		console.log(email, password);
		// createUserWithEmailAndPassword(auth, email, password);
		await signInWithEmailAndPassword(auth, email, password);
		console.log('success');
	}
</script>

<form on:submit|preventDefault={submit}>
	<div>
		<label for="email">Email</label>
		<input type="text" id="email" name="email" bind:value={email} />
	</div>

	<div>
		<label for="password">Password</label>
		<input type="password" id="password" name="password" bind:value={password} />
	</div>

	<div>
		<button type="submit">submit</button>
	</div>
</form>

<button on:click={() => signOut(auth)}>-- out --</button>
