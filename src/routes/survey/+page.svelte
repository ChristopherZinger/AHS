<script lang="ts">
	import { goto } from '$app/navigation';
	import SurveyFormWrapper from './SurveyFormWrapper.svelte';
	import type {
		SurveyData,
		SurveyForm
	} from '../../lib/utils/surveyTypes';

	export let data: {
		survey: SurveyForm;
	};

	$: console.log(data.survey.data);

	function handleCompletedSurvey(step: number) {
		if (step > 4) {
			goto('/newsletter-signup');
		}
	}
	$: handleCompletedSurvey(currentStep);
	$: currentStep = data.survey.data.currentStep;

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
					'Ankieta o jakości pracy w polskich biurach architektonicznych',
				body: 'asdfad'
			},
			1: {
				heading: 'Jakie biuro warjacie?',
				body: 'asdfad'
			},
			2: {
				heading: 'Czerwone flagi',
				body: `Zaznacz jakie niemiłe sytuacje spotkały cie w <b>${data.office?.officeName}</b>`
			},
			3: {
				heading: 'Twoja historia w:',
				body: `Napisz o swoim doświadczeniu w <b>${data.office?.officeName}<b>`
			},
			4: {
				heading: 'Twoj profil',
				body: 'Czas powidzieć coś o sobie'
			}
		};

		return headersInOrderOfSteps[step];
	}
</script>

<div class="app-section__narrow">
	<h1 class="text-4xl font-bold my-10">
		{getHeaderForCurrentStep(currentStep, data.survey.data).heading}
	</h1>
	<p>
		{@html getHeaderForCurrentStep(currentStep, data.survey.data).body}
	</p>

	<SurveyFormWrapper {currentStep} bind:data={data.survey.data} />
</div>
