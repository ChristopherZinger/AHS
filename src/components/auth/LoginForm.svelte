<script lang="ts">
	import { auth } from '$lib/firebase';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import Button from '../Button.svelte';
	import InputText from '../InputText.svelte';
	import JumpingLabel from '../JumpingLabel.svelte';
	import * as yup from 'yup';
	import { MIN_PASSWORD_LENGTH } from '$lib/constants';
	import { parseValidationError, validate } from '$lib/utils/form-utils';
	import InputErrors from './InputErrors.svelte';

	const values = {
		email: '',
		password: ''
	};
	let inputErrors: Partial<Record<keyof typeof values, string[]>> = {};
	let isLoading = false;

	const schema = yup.object({
		email: yup.string().email().required(),
		password: yup.string().min(MIN_PASSWORD_LENGTH).required()
	});

	async function submit() {
		inputErrors = {};
		isLoading = true;
		try {
			await validate(values, schema);
			await signInWithEmailAndPassword(
				auth,
				values.email,
				values.password
			);
		} catch (err) {
			err instanceof yup.ValidationError
				? (inputErrors = parseValidationError(err))
				: console.error(err);
		}
		isLoading = false;
	}
</script>

<form class="flex flex-col gap-y-12" on:submit|preventDefault={submit}>
	<JumpingLabel label="*Email" forHTML="email" isUp={!!values.email}>
		<InputText
			type={'text'}
			name="email"
			id="email"
			onChange={({ target }) => {
				values.email = target?.value;
				inputErrors.email = [];
			}}
		/>
		<InputErrors msgs={inputErrors.email || []} />
	</JumpingLabel>

	<JumpingLabel
		label="*Password"
		forHTML="password"
		isUp={!!values.password}
	>
		<InputText
			type={'password'}
			name="password"
			id="password"
			onChange={({ target }) => {
				values.password = target?.value;
				inputErrors.password = [];
			}}
		/>
		<InputErrors msgs={inputErrors.email || []} />
	</JumpingLabel>

	<div class="flex justify-center mt-8">
		<div>
			<Button
				type="submit"
				disabled={isLoading ||
					!!Object.values(inputErrors).some((arr) => arr.length)}
				>login</Button
			>
			<div class="flex mt-5 text-zinc-500">
				Forgot password? &nbsp <span class="text-black">Reset.</span>
			</div>
		</div>
	</div>
</form>
