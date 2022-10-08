<script lang="ts">
	import { auth } from '$lib/firebase';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import Button from '../Button.svelte';
	import InputText from '../InputText.svelte';
	import JumpingLabel from '../JumpingLabel.svelte';

	let email = '';
	let password: '';

	async function submit() {
		await signInWithEmailAndPassword(auth, email, password);
	}
</script>

<form class="flex flex-col gap-y-12" on:submit|preventDefault={submit}>
	<JumpingLabel label="*Email" forHTML="email" isUp={!!email}>
		<InputText
			type={'text'}
			name="email"
			id="email"
			onChange={({ target }) => {
				email = target?.value;
			}}
		/>
	</JumpingLabel>

	<JumpingLabel label="*Password" forHTML="password" isUp={!!password}>
		<InputText
			type={'password'}
			name="password"
			id="password"
			onChange={({ target }) => {
				password = target?.value;
			}}
		/>
	</JumpingLabel>

	<div class="flex justify-center mt-8">
		<div>
			<Button type="submit">login</Button>
			<div class="flex mt-5 text-zinc-500">Forgot password? Reset.</div>
		</div>
	</div>
</form>
