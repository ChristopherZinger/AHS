<script lang="ts">
	import type {
		SurveyData,
		SurveyForm as SurveyFormType
	} from '$lib/utils/surveyTypes';
	import SurveyForm, { type ActionErrorResult } from './SurveyForm.svelte';
	import SurveyUserProfile from './SurveyUserProfile.svelte';

	export let onSubmitSuccess: (v: SurveyFormType) => void;
	export let currentStep: number;
	export let initialData: SurveyData['profile'] | undefined;
	export let onSubmitError: (e: ActionErrorResult) => void;
</script>

<h1 class="text-4xl font-bold my-10">O Tobie</h1>

<SurveyForm
	actionName="update-user-profile"
	{onSubmitError}
	{onSubmitSuccess}
	{currentStep}
>
	<SurveyUserProfile {initialData} />
</SurveyForm>>
