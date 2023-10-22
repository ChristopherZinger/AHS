<script lang="ts">
	import InputText from '$lib/components/shared/InputText.svelte';
	import JumpingLabel from '$lib/components/shared/JumpingLabel.svelte';
	import type { SurveyForm as SurveyFormType } from '$lib/utils/surveyTypes';
	import SurveyForm, { type ActionErrorResult } from './SurveyForm.svelte';

	export let initialOfficeName = '';
	export let initialCityName = '';
	export let currentStep: number;
	export let onSubmitSuccess: (v: SurveyFormType) => void;
	export let onSubmitError: (e: ActionErrorResult) => void;

	let officeName = initialOfficeName;
</script>

<h1 class="text-4xl font-bold my-10">Dane pracowni architektonicznej</h1>
<p class="lg:text-2xl my-5 mb-14">
	Ankieta dotyczy konkretnej pracowni dla której pracowałeś/łaś jako
	architekt lub projektant.
</p>

<SurveyForm
	actionName="update-survey-office-info"
	{onSubmitError}
	{onSubmitSuccess}
	{currentStep}
>
	<div class="flex flex-col gap-12">
		<JumpingLabel label="Nazwa biura:" forHTML="office-name">
			<InputText
				type="text"
				id="office-name"
				name="office-name"
				bind:value={officeName}
				placeholder={`np. "APA Janusz i Architekci"`}
				maxLength={150}
				required={true}
			/>
		</JumpingLabel>

		<JumpingLabel label={undefined} forHTML="city">
			<div slot="label">
				{#if !officeName}
					W jakim mieście znajduje się to biuro?
				{:else}
					{'W jakim mieście znajduje się '}<b>{officeName}</b>?
				{/if}
			</div>
			<InputText
				type="text"
				id="city"
				name="city"
				value={initialCityName}
				placeholder={`np. "Warszawa"`}
				maxLength={150}
				required={true}
			/>
		</JumpingLabel>
	</div>
</SurveyForm>
