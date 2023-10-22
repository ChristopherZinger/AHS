<script lang="ts">
	import { goto } from '$app/navigation';
	import type { SurveyForm } from '../../lib/utils/surveyTypes';
	import Button from '$lib/components/shared/Button.svelte';
	import { ServerErrorName } from '$lib/utils/appError';
	import SurveyOfficePage from './SurveyOfficePage.svelte';
	import SurveyAboutSurveyPage from './SurveyAboutSurveyPage.svelte';
	import SurveyRedFlagsPage from './SurveyRedFlagsPage.svelte';
	import SurveyStoryPage from './SurveyStoryPage.svelte';
	import SurveyUserProfilePage from './SurveyUserProfilePage.svelte';
	import { fetchClearAnonymousSessionCookie } from '../api/clear-anonymous-session-cookie/fetchClearAnonymousSessionCookie';
	import { fetchClearSurveyCookie } from '../api/clear-survey-cookie/fetchClearSurveyCookie';
	import type { ActionErrorResult } from './SurveyForm.svelte';
	import type { Survey } from '@prisma/client';

	export let data: SurveyForm;

	$: if (data.isCompleted) {
		goto('/survey/subscribe');
	}

	let formServerErrorMsg: string | undefined;

	function onSubmitError(err: ActionErrorResult) {
		formServerErrorMsg = err.error.message;
	}

	function onSubmitSuccess(v: SurveyForm) {
		data = v;
	}
</script>

<div class="app-section__narrow">
	{#if !formServerErrorMsg}
		{#if data.currentStep === 0}
			<SurveyAboutSurveyPage
				{onSubmitSuccess}
				{onSubmitError}
				currentStep={data.currentStep}
			/>
		{:else if data.currentStep === 1}
			<SurveyOfficePage
				{onSubmitSuccess}
				{onSubmitError}
				currentStep={data.currentStep}
				initialCityName={data.data.office?.city || ''}
				initialOfficeName={data.data.office?.officeName || ''}
			/>
		{:else if data.currentStep === 2}
			<SurveyRedFlagsPage
				{onSubmitSuccess}
				{onSubmitError}
				currentStep={data.currentStep}
				initialFlags={data.data.flags}
				officeName={data.data.office?.officeName || ''}
			/>
		{:else if data.currentStep === 3}
			<SurveyStoryPage
				{onSubmitSuccess}
				{onSubmitError}
				currentStep={data.currentStep}
				officeName={data.data.office?.officeName || ''}
				initialStory={data.data?.story?.body || ''}
				initialTitle={data.data?.story?.title || ''}
			/>
		{:else if data.currentStep === 4}
			<SurveyUserProfilePage
				{onSubmitSuccess}
				{onSubmitError}
				currentStep={data.currentStep}
				initialData={data.data.profile}
			/>
		{/if}
	{:else if formServerErrorMsg === ServerErrorName.BAD_INPUT}
		<h1 class="text-4xl font-bold my-10">Nieprawidłowa wartość.</h1>
		<p class="my-10">Spróbuj ponownie.</p>
		<div class="flex justify-center lg:justify-start">
			<Button
				onClick={() => {
					window.location.reload();
				}}
			>
				Odśwież
			</Button>
		</div>
	{:else}
		<h1 class="text-4xl font-bold my-10">Ups! Coś poszło nie tak :(</h1>
		<p class="my-10">Kliknij przycisk poniżej aby rozpocząć ponownie.</p>
		<div class="flex justify-center lg:justify-start">
			<Button
				onClick={async () => {
					try {
						await fetchClearAnonymousSessionCookie();
					} catch (err) {
						console.error(err);
					}
					try {
						await fetchClearSurveyCookie();
					} catch (err) {
						console.error(err);
					}
					window.location.reload();
				}}
			>
				Rozpocznij
			</Button>
		</div>
	{/if}
</div>
