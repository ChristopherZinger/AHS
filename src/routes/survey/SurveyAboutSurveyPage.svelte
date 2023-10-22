<script lang="ts">
	import type { SurveyForm as SurveyFormType } from '$lib/utils/surveyTypes';
	import SurveyForm, { type ActionErrorResult } from './SurveyForm.svelte';

	export let currentStep: number;
	export let onSubmitSuccess: (v: SurveyFormType) => void;
	export let onSubmitError: (e: ActionErrorResult) => void;
</script>

<h1 class="text-4xl font-bold my-10">
	Anonimowa ankieta o jakości pracy w polskich biurach architektonicznych
</h1>

<p class="lg:text-2xl my-5">
	Celem tej ankiety jest identyfikacja problemów, które architekci i
	architektki doświadczają w polskich pracowniach architektonicznych.
</p>
<p class="lg:text-2xl my-5">
	Chcemy naświetlić problemy związane z wynagrodzeniem, przeciążeniem
	pracą, dyskryminacją i niekompetentnym zarządzaniem biur projektowych.
</p>
<p class="lg:text-2xl my-5">
	Zebrane informacje staną się cennym źródłem wiedzy, która pomoże Tobie
	oraz innym architektom podejmować bardziej świadome decyzje podczas
	aplikowania do biur architektonicznych.
</p>
<p class="lg:text-2xl my-5">
	Wszystkie recenzje będą dostępne wkrótce, na portalu <b
		>ciezar-architektury.pl.</b
	>
</p>

<SurveyForm
	actionName="acknowledge-info"
	{onSubmitError}
	{onSubmitSuccess}
	{currentStep}
/>
