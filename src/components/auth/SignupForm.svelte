<script lang="ts">
	import { auth } from '$lib/firebase-client';
	import { getHomeUrl, getLoginUrl } from '$lib/utils/appUrls';
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import Button from '../Button.svelte';
	import InputText from '../InputText.svelte';
	import JumpingLabel from '../JumpingLabel.svelte';
	import * as yup from 'yup';
	import InputErrors from './InputErrors.svelte';
	import { MIN_PASSWORD_LENGTH } from '$lib/constants';
	import { parseValidationError, validate } from '$lib/utils/form-utils';
	import { FirebaseError } from 'firebase/app';
	import { goto } from '$app/navigation';

	let values = {
		email: '',
		password: '',
		passwordRepeat: ''
	};
	let isLoading = false;
	let inputErrors: Partial<Record<keyof typeof values, string[]>> = {};

	const schema = yup.object({
		email: yup.string().email().required(),
		password: yup.string().required().min(MIN_PASSWORD_LENGTH),
		passwordRepeat: yup
			.string()
			.required()
			.min(6)
			.oneOf([yup.ref('password'), null], 'Passwords must match')
	});

	const setUnknownError = () =>
		(inputErrors.email = ['Oops! something went wrong, try again later']);

	async function submit() {
		inputErrors = {};
		isLoading = true;
		try {
			await validate(values, schema);
			await createUserWithEmailAndPassword(
				auth,
				values.email,
				values.password
			);
			goto(getHomeUrl());
		} catch (err) {
			err instanceof yup.ValidationError
				? (inputErrors = <typeof inputErrors>parseValidationError(err))
				: err instanceof FirebaseError
				? err.code === 'auth/weak-password'
					? (inputErrors.password = [
							'passowrd must have at least 6 characters'
					  ])
					: err.code === 'auth/email-already-in-use'
					? (inputErrors.email = ['email is already taken'])
					: err.code === 'auth/invalid-email'
					? (inputErrors.email = ['invalid email'])
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

	<JumpingLabel
		label="*Repeat Password"
		forHTML="repeat-password"
		isUp={!!values.passwordRepeat}
	>
		<InputText
			type={'password'}
			name="repeat-password"
			id="repeat-password"
			onChange={({ target }) => {
				values.passwordRepeat = target?.value;
				inputErrors.passwordRepeat = [];
			}}
		/>
		<InputErrors msgs={inputErrors.passwordRepeat || []} />
	</JumpingLabel>

	<div class="flex justify-center mt-8">
		<div>
			<Button
				type="submit"
				{isLoading}
				disabled={isLoading ||
					!!Object.values(inputErrors).some((arr) => arr.length)}
				>Signup</Button
			>
			<div class="flex mt-5 text-zinc-500">
				Already a member? &nbsp <a class="text-black" href={getLoginUrl()}>
					Login.</a
				>
			</div>
		</div>
	</div>
</form>
