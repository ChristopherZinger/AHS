<script lang="ts">
	import { goto } from '$app/navigation';
	import SurveyFormWrapper from './SurveyFormWrapper.svelte';
	import type {
		SurveyData,
		SurveyForm
	} from '../../lib/utils/surveyTypes';
	import Button from '$lib/components/shared/Button.svelte';
	import { ServerErrorName } from '$lib/utils/appError';

	export let data: {
		survey: SurveyForm;
	};

	function handleCompletedSurvey(step: number) {
		if (step > 4) {
			goto('/survey/subscribe');
		}
	}
	$: handleCompletedSurvey(currentStep);
	$: currentStep = data.survey.data.currentStep;

	let formServerErrorMsg: string | undefined;

	function getHeaderForCurrentStep(
		step: number,
		data: SurveyData
	): {
		heading: string;
		body: string;
	} {
		const headersInOrderOfSteps: Record<
			number,
			{ heading: string; body: string }
		> = {
			0: {
				heading:
					'Ankieta o jakości pracy w polskich biurach architektonicznych',
				body: 'asdfad'
			},
			1: {
				heading: 'Jakie biuro warjacie?',
				body: 'asdfad'
			},
			2: {
				heading: 'Czerwone flagi',
				body: `Zaznacz jakie niemiłe sytuacje spotkały cie w <b>${data.office?.officeName}</b>`
			},
			3: {
				heading: 'Twoja historia w:',
				body: `Napisz o swoim doświadczeniu w <b>${data.office?.officeName}<b>`
			},
			4: {
				heading: 'Twoj profil',
				body: 'Czas powidzieć coś o sobie'
			}
		};

		return headersInOrderOfSteps[step];
	}
	$: headingInfo = getHeaderForCurrentStep(currentStep, data.survey.data);
</script>

<div class="app-section__narrow">
	{#if !formServerErrorMsg}
		{#if headingInfo}
			<h1 class="text-4xl font-bold my-10">{headingInfo.heading}</h1>
			<p>{@html headingInfo.body}</p>
		{/if}

		<SurveyFormWrapper
			onFormServerError={(msg) => {
				formServerErrorMsg = msg;
			}}
			{currentStep}
			bind:data={data.survey.data}
		/>
	{:else}
		<h1 class="text-4xl font-bold my-10">
			{#if [ServerErrorName.MISSING_OR_INVALID_ANONYMOUS_SESSION_COOKIE, ServerErrorName.MISSING_OR_INVALID_SURVEY_COOKIE].includes(formServerErrorMsg)}
				Sesja wygasła.
			{:else}
				Ups! Coś poszło nie tak.
			{/if}
		</h1>
		<p class="my-10">Kliknij przycisk poniżej aby rozpocząć ponownie.</p>
		<div class="flex justify-center lg:justify-start">
			<Button
				onClick={() => {
					window.location.reload();
				}}
			>
				Rozpocznij
			</Button>
		</div>
	{/if}
</div>
