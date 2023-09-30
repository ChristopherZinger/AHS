<script lang="ts">
	import { enhance } from '$app/forms';
	import * as yup from 'yup';
	import Button from '$lib/components/shared/Button.svelte';
	import SurveyOfficeInfo from './SurveyOfficeInfo.svelte';
	import RedFlagStep from './SurveyRedFlags.svelte';
	import type { SurveyData } from '../../lib/utils/surveyTypes';
	import SurveyProfile from './SurveyUserProfile.svelte';
	import SurveyStory from './SurveyStory.svelte';
	import { parseValidationError, validate } from '$lib/utils/form-utils';
	import type {
		ObjectShape,
		OptionalObjectSchema,
		TypeOfShape
	} from 'yup/lib/object';
	import type { AnyObject } from 'yup/lib/types';

	let isLoading = false;
	let inputErrors: Record<string, string[]> = {};
	let shouldGoBack = false;

	export let data: SurveyData;
	export let currentStep: number;
	export let onFormServerError: (msg: string) => void;

	const requiredFieldMsg = 'Pole jest wymagene';

	const schemaOfficeInfo = yup.object({
		officeName: yup.string().required(requiredFieldMsg),
		city: yup.string().required(requiredFieldMsg)
	});

	const stepToSchema: Record<
		number,
		| OptionalObjectSchema<
				ObjectShape,
				AnyObject,
				TypeOfShape<ObjectShape>
		  >
		| undefined
	> = {
		1: schemaOfficeInfo
	};

	const setUnknownError = () =>
		(inputErrors.email = ['Oops! something went wrong, try again later']);

	function getDataForStep(step: number) {
		return data.office;
	}

	async function beforeSubmit(cancelSubmission: () => void) {
		inputErrors = {};
		isLoading = true;
		const schema = stepToSchema[currentStep];
		if (!schema) {
			return;
		}
		try {
			await validate(getDataForStep(currentStep), schema);
		} catch (err) {
			err instanceof yup.ValidationError
				? (inputErrors = <typeof inputErrors>parseValidationError(err))
				: setUnknownError();
			cancelSubmission();
			isLoading = false;
		}
	}

	const stepToButtonText: Record<number, string> = {
		0: 'Start',
		1: 'Dalej', // office info
		2: 'Dalej', // red flags
		3: 'Dalej', // story
		4: 'Zapisz' // profile
	};

	$: stringifiedData = JSON.stringify(data);
</script>

<form
	method="POST"
	action="?/update-survey-office"
	use:enhance={async ({ cancel }) => {
		await beforeSubmit(cancel);

		return async ({ result }) => {
			isLoading = false;
			shouldGoBack = false;

			if (result.type === 'success') {
				const surveyDataResponse = result.data?.data.data;
				data = surveyDataResponse;
			} else if (result.type === 'error') {
				onFormServerError(result.error.message);
			}
		};
	}}
	class="flex flex-col gap-10 my-10"
>
	<input type="text" name="data" bind:value={stringifiedData} hidden />
	<input
		type="checkbox"
		name="should-go-back"
		bind:checked={shouldGoBack}
		hidden
	/>

	{#if currentStep === 1}
		<SurveyOfficeInfo
			{inputErrors}
			onCityChange={(v) => {
				if (!data.office) {
					data.office = {};
				}
				data.office.city = v;
			}}
			onOfficeNameChange={(v) => {
				if (!data.office) {
					data.office = {};
				}
				data.office.officeName = v;
			}}
			initialCity={data.office?.city || ''}
			initialOfficeName={data.office?.officeName || ''}
			onClearErrors={(field) => {
				inputErrors && delete inputErrors[field];
				inputErrors = inputErrors;
			}}
		/>
	{:else if currentStep === 2}
		<RedFlagStep bind:data />
	{:else if currentStep === 3}
		<SurveyStory
			setStory={(body) => {
				data.story = {
					...(data.story || {}),
					body
				};
			}}
			setTitle={(title) => {
				data.story = {
					...(data.story || {}),
					title
				};
			}}
			initialStory={data.story?.body || ''}
			initialTitle={data.story?.title || ''}
		/>
	{:else if currentStep === 4}
		<SurveyProfile
			setSex={(sex) => {
				if (data.profile?.sex !== sex) {
					data.profile = {
						...(data.profile || {}),
						sex
					};
				}
			}}
			setAge={(age) => {
				if (data.profile?.age !== age) {
					data.profile = {
						...(data.profile || {}),
						age
					};
				}
			}}
			setEducation={(education) => {
				if (data.profile?.education !== education) {
					data.profile = {
						...(data.profile || {}),
						education
					};
				}
			}}
			setIsLicensed={(isLicensed) => {
				if (data.profile?.isLicensed !== isLicensed) {
					data.profile = {
						...(data.profile || {}),
						isLicensed
					};
				}
			}}
			setNumYearsExperience={(numYearsExperience) => {
				if (data.profile?.numYearsExperience !== numYearsExperience) {
					data.profile = {
						...(data.profile || {}),
						numYearsExperience
					};
				}
			}}
			initialData={data.profile}
		/>
	{/if}

	<div
		class="grid grid-cols-2 lg:grid-cols-3 grid-row-2 lg:grid-row-1 lg:my-10"
	>
		<div class="row-start-2 lg:row-start-1 mt-5 lg:mt-0">
			<button
				hidden={currentStep < 2}
				on:click={() => {
					shouldGoBack = true;
				}}
				type="submit"
				disabled={isLoading ||
					!!Object.values(inputErrors).some((arr) => arr.length)}
			>
				&lt Powrót
			</button>
		</div>

		<div class="col-span-2 lg:col-span-1 flex justify-center">
			<Button
				type="submit"
				{isLoading}
				disabled={isLoading ||
					!!Object.values(inputErrors).some((arr) => arr.length)}
			>
				{stepToButtonText[currentStep]}
			</Button>
		</div>

		<div class="flex justify-end mt-5 lg:mt-0">
			<button
				hidden={currentStep < 2}
				type="submit"
				disabled={isLoading ||
					!!Object.values(inputErrors).some((arr) => arr.length)}
			>
				Pomiń &gt
			</button>
		</div>
	</div>
</form>
