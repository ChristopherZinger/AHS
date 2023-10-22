<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/shared/Button.svelte';
	import type { SurveyForm } from '$lib/utils/surveyTypes';
	import type { ActionErrorResult } from './SurveyForm.svelte';

	export let currentStep: number;
	export let isLoading: boolean;
	export let isDisabled: boolean;
	export let onSubmitSuccess: (v: SurveyForm) => void;
	export let onSubmitError: (e: ActionErrorResult) => void;

	const stepToButtonText: Record<number, string> = {
		0: 'Start',
		1: 'Dalej', // office info
		2: 'Dalej', // red flags
		3: 'Dalej', // story
		4: 'Zapisz' // profile
	};

	$: _isDisabled = isLoading || isDisabled;
</script>

<form
	hidden
	id="form-back"
	action="?/step-back"
	method="POST"
	use:enhance={() => {
		return ({ result }) => {
			if (result.type === 'success') {
				onSubmitSuccess(result.data);
			} else if (result.type === 'error') {
				onSubmitError(result);
			}
		};
	}}
/>
<form
	hidden
	id="form-foreward"
	action="?/step-foreward"
	method="POST"
	use:enhance={() => {
		return ({ result }) => {
			if (result.type === 'success') {
				onSubmitSuccess(result.data);
			} else if (result.type === 'error') {
				onSubmitError(result);
			}
		};
	}}
/>

<div
	class="grid grid-cols-2 lg:grid-cols-3 grid-row-2 lg:grid-row-1 lg:my-10"
>
	<div class="row-start-2 lg:row-start-1 mt-5 lg:mt-0">
		<button
			form="form-back"
			hidden={currentStep < 2}
			type="submit"
			disabled={_isDisabled}
		>
			&lt Powrót
		</button>
	</div>

	<div class="col-span-2 lg:col-span-1 flex justify-center">
		<Button type="submit" {isLoading} disabled={_isDisabled}>
			{stepToButtonText[currentStep]}
		</Button>
	</div>

	<div class="flex justify-end mt-5 lg:mt-0">
		<button
			form="form-foreward"
			hidden={currentStep < 2}
			type="submit"
			disabled={_isDisabled}
		>
			Pomiń &gt
		</button>
	</div>
</div>
