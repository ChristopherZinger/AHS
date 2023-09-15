<script lang="ts">
	import InputText from '$lib/components/shared/InputText.svelte';
	import JumpingLabel from '$lib/components/shared/JumpingLabel.svelte';
	import * as yup from 'yup';
	import { MIN_PASSWORD_LENGTH } from '$lib/constants';
	import { parseValidationError, validate } from '$lib/utils/form-utils';
	import InputErrors from '$lib/components/inputs/InputErrors.svelte';
	import { goto } from '$app/navigation';
	import { getHomeUrl, getResetPasswordUrl } from '$lib/utils/appUrls';
	import Button from '$lib/components/shared/Button.svelte';
	import { enhance } from '$app/forms';
	import { appUser } from '$lib/stores/auth';

	// ! this is just for jumping labels and should be removed
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

	async function beforeSubmit(
		data: {
			email: unknown;
			password: unknown;
		},
		cancelSubmission: () => void
	) {
		inputErrors = {};
		isLoading = true;
		try {
			await validate(data, schema);
		} catch (err) {
			err instanceof yup.ValidationError
				? (inputErrors = parseValidationError(err))
				: setUnknownError();
			isLoading = false;
			cancelSubmission();
		}
	}
</script>

<form
	class="flex flex-col gap-y-12"
	method="POST"
	action="?/login"
	use:enhance={async ({ data, cancel }) => {
		const email = data.get('email');
		const password = data.get('password');

		await beforeSubmit(
			{
				email,
				password
			},
			cancel
		);

		return async ({ result }) => {
			isLoading = false;
			if (
				result.type === 'success' &&
				result.data &&
				result.data.user.email === 'string'
			) {
				appUser.set({
					email: result.data.user.email,
					id: result.data.id,
					role: result.data.role
				});
				goto(getHomeUrl());
			} else if (result.type === 'error') {
				if (
					['wrong_password', 'no_user_with_this_email'].includes(
						result.error.message
					)
				) {
					inputErrors.password = ['wrong password or email'];
					inputErrors.email = ['wrong password or email'];
				} else {
					setUnknownError();
				}
			}
		};
	}}
>
	<JumpingLabel label="*Email" forHTML="email">
		<InputText
			type={'text'}
			name="email"
			id="email"
			onChange={(v) => {
				values.email = v;
				inputErrors.email = [];
			}}
		/>
		<InputErrors msgs={inputErrors.email || []} />
	</JumpingLabel>

	<JumpingLabel label="*Password" forHTML="password">
		<InputText
			type={'password'}
			name="password"
			id="password"
			onChange={(v) => {
				values.password = v;
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
