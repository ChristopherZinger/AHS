<script lang="ts">
	import { auth } from '$lib/firebase';
	import { getLoginUrl } from '$lib/utils/appUrls';
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import Button from '../Button.svelte';
	import InputText from '../InputText.svelte';
	import JumpingLabel from '../JumpingLabel.svelte';
	import * as yup from 'yup';
	import InputErrors from './InputErrors.svelte';
	import { MIN_PASSWORD_LENGTH } from '$lib/constants';
	import { parseValidationError, validate } from '$lib/utils/form-utils';

	let values = {
		email: '',
		password: '',
		passwordRepeat: ''
	};
	const isLoading = false;
	let inputToErrors: Record<string, string[]> = {};

	const schema = yup.object({
		email: yup.string().email().required(),
		password: yup.string().required().min(MIN_PASSWORD_LENGTH),
		passwordRepeat: yup
			.string()
			.required()
			.min(6)
			.oneOf([yup.ref('password'), null], 'Passwords must match')
	});

	async function submit() {
		inputToErrors = {};
		try {
			await validate(values, schema);
			await createUserWithEmailAndPassword(
				auth,
				values.email,
				values.password
			);
		} catch (err) {
			err instanceof yup.ValidationError
				? (inputToErrors = <typeof inputToErrors>parseValidationError(err))
				: console.error(err);
		}
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
				inputToErrors.email = [];
			}}
		/>
		<InputErrors msgs={inputToErrors.email || []} />
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
				inputToErrors.password = [];
			}}
		/>
		<InputErrors msgs={inputToErrors.password || []} />
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
				inputToErrors.passwordRepeat = [];
			}}
		/>
		<InputErrors msgs={inputToErrors.passwordRepeat || []} />
	</JumpingLabel>

	<div class="flex justify-center mt-8">
		<div>
			<Button
				type="submit"
				disabled={isLoading ||
					!!Object.values(inputToErrors).some((arr) => arr.length)}
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
