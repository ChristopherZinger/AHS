<script lang="ts">
	import InputText from '$lib/components/shared/InputText.svelte';
	import * as yup from 'yup';
	import { MIN_PASSWORD_LENGTH } from '$lib/constants';
	import { parseValidationError, validate } from '$lib/utils/form-utils';
	import InputErrors from '$lib/components/inputs/InputErrors.svelte';
	import { getHomeUrl, getResetPasswordUrl } from '$lib/utils/appUrls';
	import Button from '$lib/components/shared/Button.svelte';
	import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
	import { goto } from '$app/navigation';

	const values = {
		email: '',
		password: ''
	};
	const schema = yup.object({
		email: yup.string().email().required(),
		password: yup.string().min(MIN_PASSWORD_LENGTH).required()
	});

	let inputErrors: Partial<
		Record<keyof typeof values, string[]> & { submitError: string[] }
	> = {};
	let isLoading = false;

	function setUnknownError() {
		inputErrors.submitError = [
			'Oops! something went wrong, try again later'
		];
	}

	async function beforeSubmit(data: {
		email: unknown;
		password: unknown;
	}) {
		inputErrors = {};
		try {
			await validate(data, schema);
		} catch (error) {
			error instanceof yup.ValidationError
				? (inputErrors = parseValidationError(error))
				: setUnknownError();
		}
	}

	async function onSubmit() {
		beforeSubmit(values);
		if (Object.values(inputErrors).length) {
			return;
		}
		isLoading = true;
		try {
			await signInWithEmailAndPassword(
				getAuth(),
				values.email,
				values.password
			);
			goto(getHomeUrl());
		} catch (e) {
			switch ((e as unknown as any).code) {
				case 'auth/wrong-password':
					inputErrors.submitError = ['Wrong password.'];
					break;
				case 'auth/too-many-requests':
					inputErrors.submitError = ['To many requests. Try again later.'];
					break;
				case 'auth/user-not-found':
					inputErrors.submitError = [
						'Password/Email combination not matching.'
					];
					break;

				default:
					setUnknownError();
					break;
			}
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="flex flex-col gap-y-12">
	<div>
		<label for="email">*Email</label>
		<InputText
			type={'text'}
			name="email"
			id="email"
			onChange={(v) => {
				values.email = v;
				inputErrors.email = [];
				inputErrors.submitError = [];
			}}
		/>
		<InputErrors msgs={inputErrors.email || []} />
	</div>

	<div>
		<label for="password">*Password</label>
		<InputText
			type={'password'}
			name="password"
			id="password"
			onChange={(v) => {
				values.password = v;
				inputErrors.password = [];
				inputErrors.submitError = [];
			}}
		/>
		<InputErrors msgs={inputErrors.password || []} />
	</div>

	{#if inputErrors.submitError?.length}
		<InputErrors msgs={inputErrors.submitError || []} />
	{/if}

	<div class="flex justify-center mt-8">
		<div>
			<Button
				onClick={onSubmit}
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
</div>
