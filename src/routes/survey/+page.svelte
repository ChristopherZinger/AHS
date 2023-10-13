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
					'Anonimowa ankieta o jakości pracy w polskich biurach architektonicznych',
				body: `<p class="lg:text-2xl my-5">Celem tej ankiety jest identyfikacja problemów, które architekci i architektki doświadczają w polskich pracowniach architektonicznych.</p>
						<p class="lg:text-2xl my-5">Chcemy naświetlić problemy związane z wynagrodzeniem, przeciążeniem pracą, dyskryminacją i niekompetentnym zarządzaniem biur projektowych.</p>
						<p class="lg:text-2xl my-5"> Zebrane informacje staną się cennym źródłem wiedzy, która pomoże Tobie oraz innym architektom podejmować bardziej świadome decyzje podczas aplikowania do biur architektonicznych.</p>
						<p class="lg:text-2xl my-5">Wszystkie recenzje będą dostępne wkrótce, na portalu <b>ciezar-architektury.pl.</b></p>`
			},
			1: {
				heading: 'Dane pracowni architektonicznej',
				body: `Ankieta dotyczy konkretnej pracowni dla której pracowałeś/łaś jako architekt lub projektant.`
			},
			2: {
				heading: 'Czerwone flagi',
				body: `<p class="lg:text-2xl my-5">Zaznacz czerwone flagi (red flags)  napotkane podczas pracy w <b>${data.office?.officeName}</b>. Czerwone flagi to problemy z jakimi spotykasz się w biurze architektonicznym, ale o których niekoniecznie wiesz przed podjęciem pracy.</p>`
			},
			3: {
				heading: `Twoja opinia o pracowni - ${data.office?.officeName}`,
				body: `<p class="lg:text-2xl my-5">Opowiedz jake były Twoje doświadczenia podczas pracy w ${data.office?.officeName}.</p>`
			},
			4: {
				heading: 'O Tobie',
				body: ''
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
			<div>{@html headingInfo.body}</div>
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
