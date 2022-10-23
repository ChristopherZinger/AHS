<script lang="ts">
	import { auth } from '$lib/firebase-client';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import Button from '../Button.svelte';
	import InputText from '../InputText.svelte';
	import JumpingLabel from '../JumpingLabel.svelte';
	import * as yup from 'yup';
	import { MIN_PASSWORD_LENGTH } from '$lib/constants';
	import { parseValidationError, validate } from '$lib/utils/form-utils';
	import InputErrors from './InputErrors.svelte';
	import { FirebaseError } from 'firebase/app';
	import { goto } from '$app/navigation';
	import { getHomeUrl, getResetPasswordUrl } from '$lib/utils/appUrls';

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

	const setUnknownError = () =>
		(inputErrors.email = ['Oops! something went wrong, try again later']);

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
			goto(getHomeUrl());
		} catch (err) {
			err instanceof yup.ValidationError
				? (inputErrors = parseValidationError(err))
				: err instanceof FirebaseError
				? err.code === 'auth/wrong-password'
					? (inputErrors.email = ['wrong email or password'])
					: err.code === 'auth/user-not-found'
					? (inputErrors.email = ['wrong email or password'])
					: setUnknownError()
				: setUnknownError();
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
		<InputErrors msgs={inputErrors.password || []} />
	</JumpingLabel>

	<div class="flex justify-center mt-8">
		<div>
			<Button
				type="submit"
				{isLoading}
				disabled={isLoading ||
					!!Object.values(inputErrors).some((arr) => arr.length)}
				>login</Button
			>
			<div class="flex mt-5 text-zinc-500">
				Forgot password? &nbsp <a
					href={getResetPasswordUrl()}
					class="text-black">Reset.</a
				>
			</div>
		</div>
	</div>
</form>
