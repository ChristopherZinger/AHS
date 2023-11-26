<script lang="ts">
	import { getLoginUrl } from '$lib/utils/appUrls';
	import Button from '$lib/components/shared/Button.svelte';
	import InputText from '$lib/components/shared/InputText.svelte';
	import JumpingLabel from '$lib/components/shared/JumpingLabel.svelte';
	import * as yup from 'yup';
	import InputErrors from '$lib/components/inputs/InputErrors.svelte';
	import { MIN_PASSWORD_LENGTH } from '$lib/constants';
	import { parseValidationError, validate } from '$lib/utils/form-utils';
	import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
	import { fetchCreateAppUser } from '../../routes/api/user/fetchCreateAppUser';

	type SignupFormData = {
		email: string;
		password: string;
		passwordRepeat: string;
	};

	const values: SignupFormData = {
		email: '',
		password: '',
		passwordRepeat: ''
	};
	let isLoading = false;
	let inputErrors: Partial<Record<keyof SignupFormData, string[]>> = {};

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

	async function beforeSubmit(formData: {
		email: unknown;
		password: unknown;
		passwordRepeat: unknown;
	}) {
		inputErrors = {};
		try {
			await validate(formData, schema);
		} catch (err) {
			err instanceof yup.ValidationError
				? (inputErrors = <typeof inputErrors>parseValidationError(err))
				: setUnknownError();
		}
	}

	async function onSubmit() {
		isLoading = true;
		await beforeSubmit(values);
		try {
			const { user } = await createUserWithEmailAndPassword(
				getAuth(),
				values.email,
				values.password
			);
			await fetchCreateAppUser(user.uid);
		} catch (error) {
			setUnknownError();
			console.error(error);
		} finally {
			isLoading = false;
		}
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

	<JumpingLabel label="*Repeat Password" forHTML="repeat-password">
		<InputText
			type={'password'}
			name="repeat-password"
			id="repeat-password"
			onChange={(v) => {
				values.passwordRepeat = v;
				inputErrors.passwordRepeat = [];
			}}
		/>
		<InputErrors msgs={inputErrors.passwordRepeat || []} />
	</JumpingLabel>

	<div class="flex justify-center mt-8">
		<div>
			<Button
				onClick={onSubmit}
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
</div>
