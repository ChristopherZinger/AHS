<script context="module" lang="ts">
	const educationDegreeToMsg: Record<SurveyEducation, string> = {
		[SurveyEducation.HIGHSCHOOL]: 'Brak wyższego wykształcenia',
		[SurveyEducation.TECHNICAL_SCHOOL]: 'Wykształcenie zawodowe',
		[SurveyEducation.BACHELOR]: 'Licencjat / Inżynier',
		[SurveyEducation.MASTER]: 'Magister / Magister Architekt',
		[SurveyEducation.PHD]: 'Doktorat  ( phd )',
		[SurveyEducation.PROFESSOR]: 'Profesor'
	};

	export function getEducationDegreeLabel(
		education: SurveyEducation
	): string {
		return educationDegreeToMsg[education];
	}
</script>

<script lang="ts">
	import { SurveyEducation } from '$lib/utils/surveyTypes';
	export let education: SurveyEducation;

	$: label = getEducationDegreeLabel(education);
</script>

{label}
