<script lang="ts">
	import SurveyForm, { type ActionErrorResult } from './SurveyForm.svelte';
	import type { SurveyForm as SurveyFormType } from '$lib/utils/surveyTypes';
	import { redFlagSectionsInOrder } from '$lib/utils/redFlagUtils';
	import { getRedFlagSectionNameLabel } from '$lib/components/labels/RedFlagSectionLabel.svelte';
	import Checkbox from '$lib/components/inputs/Checkbox.svelte';
	import { getRedFlagNameLabel } from '$lib/components/labels/RedFlagLabel.svelte';

	export let officeName: string;
	export let currentStep: number;
	export let initialFlags: Record<string, boolean>;
	export let onSubmitSuccess: (v: SurveyFormType) => void;
	export let onSubmitError: (e: ActionErrorResult) => void;

	$: redFlagStep = currentStep - 2;
</script>

<h1 class="text-4xl font-bold my-10">
	Czerwone flagi - {getRedFlagSectionNameLabel(
		redFlagSectionsInOrder[redFlagStep].section
	)}
</h1>
<p class="lg:text-2xl my-5">
	Zaznacz czerwone flagi (red flags) napotkane podczas pracy w <b
		>{officeName}</b
	>. Czerwone flagi to problemy z jakimi spotykasz się w pracowni
	architektonicznej, ale o których niekoniecznie wiesz przed podjęciem
	pracy.
</p>

<SurveyForm
	actionName="update-red-flags"
	{onSubmitError}
	{onSubmitSuccess}
	{currentStep}
>
	<div>
		{#each redFlagSectionsInOrder as section}
			<div
				class:hidden={redFlagSectionsInOrder[redFlagStep].section !==
					section.section}
				class="flex flex-col gap-2"
			>
				{#each section.flags as flag}
					<div
						class:bg-red-400={initialFlags[flag]}
						class="rounded p-3 duration-75"
						class:text-white={initialFlags[flag]}
					>
						<Checkbox
							name={flag}
							label={getRedFlagNameLabel(flag)}
							bind:value={initialFlags[flag]}
						/>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</SurveyForm>

<style>
	.hidden {
		display: none;
	}
</style>
