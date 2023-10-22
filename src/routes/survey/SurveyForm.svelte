<script context="module" lang="ts">
	export type ActionErrorResult = {
		type: 'error';
		status?: number | undefined;
		error: any;
	};
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SurveyForm } from '$lib/utils/surveyTypes';
	import SurveySubmitAndNavigationButton from './SurveySubmitAndNavigationButton.svelte';

	export let actionName: string;
	export let currentStep: number;
	export let onSubmitSuccess: (v: SurveyForm) => void;
	export let onSubmitError: (e: ActionErrorResult) => void;

	let isLoading = false;
</script>

<form
	action={`?/${actionName}`}
	method="POST"
	use:enhance={() => {
		isLoading = true;
		return ({ result }) => {
			if (result.type === 'success') {
				onSubmitSuccess(result.data);
			} else if (result.type === 'error') {
				onSubmitError(result);
			}
			isLoading = false;
		};
	}}
>
	<slot />

	<SurveySubmitAndNavigationButton
		{currentStep}
		isDisabled={isLoading}
		{isLoading}
		{onSubmitSuccess}
		{onSubmitError}
	/>
</form>
