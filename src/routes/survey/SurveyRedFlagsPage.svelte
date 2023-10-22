<script lang="ts">
	import SurveyForm, { type ActionErrorResult } from './SurveyForm.svelte';
	import SurveyRedFlags from './SurveyRedFlags.svelte';
	import type { SurveyForm as SurveyFormType } from '$lib/utils/surveyTypes';

	export let officeName: string;
	export let currentStep: number;
	export let initialFlags: Record<string, boolean>;
	export let onSubmitSuccess: (v: SurveyFormType) => void;
	export let onSubmitError: (e: ActionErrorResult) => void;
</script>

<h1 class="text-4xl font-bold my-10">Czerwone flagi</h1>
<p class="lg:text-2xl my-5">
	Zaznacz czerwone flagi (red flags) napotkane podczas pracy w <b
		>{officeName}</b
	>. Czerwone flagi to problemy z jakimi spotykasz się w biurze
	architektonicznym, ale o których niekoniecznie wiesz przed podjęciem
	pracy.
</p>

<SurveyForm
	actionName="update-red-flags"
	{onSubmitError}
	{onSubmitSuccess}
	{currentStep}
>
	<SurveyRedFlags flagsToBoolean={initialFlags} />
</SurveyForm>
