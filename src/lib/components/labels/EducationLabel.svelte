<script context="module" lang="ts">
	const educationDegreeToMsg: Record<SurveyEducation, string> = {
		[SurveyEducation.HIGHSCHOOL]: 'Brak wyższego wykształcenia',
		[SurveyEducation.TECHNICAL_SCHOOL]: 'Wykształcenie zawodowe',
		[SurveyEducation.BACHELOR]: 'Licencjat / Inżynier',
		[SurveyEducation.MASTER]: 'Tytył magistra',
		[SurveyEducation.PHD]: 'Tytuł doktora',
		[SurveyEducation.PROFESSOR]: 'Tytuł profesora'
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
