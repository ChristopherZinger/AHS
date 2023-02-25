<script lang="ts">
	import Button from '$lib/components/shared/Button.svelte';
	import InputText from '$lib/components/shared/InputText.svelte';
	import JumpingLabel from '$lib/components/shared/JumpingLabel.svelte';
	import AuthBox from './AuthBox.svelte';
	import InputErrors from './InputErrors.svelte';
	import * as yup from 'yup';
	import { parseValidationError, validate } from '$lib/utils/form-utils';
	import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

	const values = { email: '' };
	const schema = yup.object({
		email: yup.string().email().required()
	});

	let showThankYouView = false;

	const setUnknownError = () =>
		(inputErrors.email = ['Oops! something went wrong, try again later.']);

	const submit = async () => {
		isLoading = true;
		try {
			await validate(values, schema);
			await sendPasswordResetEmail(getAuth(), values.email);
			showThankYouView = true;
		} catch (error) {
			error instanceof yup.ValidationError
				? (inputErrors = parseValidationError(error))
				: setUnknownError();
		}
		isLoading = false;
	};

	let inputErrors: Partial<Record<keyof typeof values, string[]>> = {};
	let isLoading = false;
</script>

<div class="login-page">
	<div class="lg:my-12 w-full lg:flex lg:justify-center">
		<AuthBox title=" {showThankYouView ? 'Success!' : 'Reset Password'}">
			{#if !showThankYouView}
				<form on:submit|preventDefault={submit}>
					<JumpingLabel
						label="*Email"
						forHTML="email"
						isUp={!!values.email}
					>
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

					<div class="flex justify-center mt-8">
						<Button
							type="submit"
							{isLoading}
							disabled={isLoading ||
								!!Object.values(inputErrors).some((arr) => arr.length)}
							>Request New Password</Button
						>
					</div>
				</form>
			{:else}
				<p>Email was sent to: {values.email}</p>
				<p class="font-bold underline text-lg my-5">email@email.com</p>
				<p>Check your postbox ( email could land in spam folder ).</p>
			{/if}
		</AuthBox>
	</div>
</div>
