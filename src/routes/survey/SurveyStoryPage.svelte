<script lang="ts">
	import InputText from '$lib/components/shared/InputText.svelte';
	import JumpingLabel from '$lib/components/shared/JumpingLabel.svelte';
	import type { SurveyForm as SurveyFormType } from '$lib/utils/surveyTypes';
	import SurveyForm, { type ActionErrorResult } from './SurveyForm.svelte';

	export let onSubmitError: (e: ActionErrorResult) => void;
	export let onSubmitSuccess: (v: SurveyFormType) => void;
	export let officeName: string;
	export let currentStep: number;
	export let initialTitle: string = '';
	export let initialStory: string = '';
</script>

<h1 class="text-4xl font-bold my-10">
	Twoja opinia o pracowni "{officeName}"
</h1>

<p class="lg:text-2xl my-5">
	Opowiedz jake były Twoje doświadczenia podczas pracy w {officeName}.
</p>

<SurveyForm
	actionName="update-story"
	{onSubmitError}
	{onSubmitSuccess}
	{currentStep}
>
	<div class="flex flex-col gap-12">
		<JumpingLabel label="W kilku słowach:" forHTML="title">
			<InputText
				name="title"
				placeholder={`np. “W biurze panuje okropna atmosfera!” albo “Pracowałam nad ciekawymi projektami”`}
				type="text"
				value={initialTitle}
				id="title"
				maxLength={150}
			/>
		</JumpingLabel>

		<div>
			<label for="story">Rozwiń swoją opinię:</label>
			<textarea
				class="bg-slate-100 w-full p-4 my-2 rounded-xl"
				name="story"
				id="story"
				cols="30"
				rows="10"
				maxlength="3000"
				value={initialStory}
				placeholder="Możesz opisać: atmosferę pracy, stosunek do pracownika, możliwości rozwoju zawodowego, problemy związane z wynagrodzeniem, dyskryminacją itp."
			/>
		</div>
	</div>
</SurveyForm>
