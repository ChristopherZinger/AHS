<script lang="ts">
	import InputText from '$lib/components/shared/InputText.svelte';
	import JumpingLabel from '$lib/components/shared/JumpingLabel.svelte';
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

	let inputErrors: Partial<Record<keyof typeof values, string[]>> = {};
	let isLoading = false;

	function setUnknownError() {
		inputErrors.email = ['Oops! something went wrong, try again later'];
	}

	async function beforeSubmit(data: {
		email: unknown;
		password: unknown;
	}) {
		inputErrors = {};
		await validate(data, schema).catch((err) => {
			err instanceof yup.ValidationError
				? (inputErrors = parseValidationError(err))
				: setUnknownError();
		});
	}

	function onSubmit() {
		beforeSubmit(values);
		if (Object.values(inputErrors).length) {
			return;
		}
		isLoading = true;
		signInWithEmailAndPassword(getAuth(), values.email, values.password)
			.then(() => {
				goto(getHomeUrl());
			})
			.catch(() => {
				setUnknownError();
			})
			.finally(() => {
				isLoading = false;
			});
	}
</script>

<div class="flex flex-col gap-y-12">
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
