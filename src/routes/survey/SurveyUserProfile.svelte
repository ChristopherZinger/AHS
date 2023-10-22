<script lang="ts">
	import Checkbox from '$lib/components/inputs/Checkbox.svelte';
	import Select from 'svelte-select/Select.svelte';
	import {
		SurveyAgeOption,
		SurveyEducation,
		SurveyNumYearsExperience,
		SurveySexOption,
		type SurveyData,
		getNumYearsExperienceLabel
	} from '../../lib/utils/surveyTypes';
	import Radio from '$lib/components/inputs/Radio.svelte';
	import { getEducationDegreeLabel } from '$lib/components/labels/EducationLabel.svelte';

	export let initialData: undefined | SurveyData['profile'];

	let isLicensed = initialData?.isLicensed;

	const radioOptions: {
		value: SurveySexOption;
		label: string;
	}[] = [
		{
			label: 'Kobieta',
			value: SurveySexOption.FEMALE
		},
		{
			label: 'Meżczyzna',
			value: SurveySexOption.MALE
		},
		{
			label: 'Żadne z powyższych',
			value: SurveySexOption.NONBINARY
		},
		{
			label: 'Wolę nie podawać',
			value: SurveySexOption.SECRET
		}
	];

	let radioSelected: undefined | SurveySexOption = initialData?.sex;
	let experience = initialData?.numYearsExperience
		? {
				label: getNumYearsExperienceLabel(initialData.numYearsExperience),
				value: initialData.numYearsExperience
		  }
		: undefined;
	let education = initialData?.education
		? {
				label: getEducationDegreeLabel(initialData.education),
				value: initialData.education
		  }
		: undefined;
	let age = initialData?.age
		? {
				label: initialData.age,
				value: initialData.age
		  }
		: undefined;
</script>

<div class="flex flex-col gap-8">
	<div>
		<label for="numYearsExperience"
			>Jaki jest Twój staż w zawodzie architekta?</label
		>
		<Select
			name="experience-select"
			placeholder="np 2-5 lat"
			searchable={false}
			items={Object.values(SurveyNumYearsExperience).map((v) => ({
				label: getNumYearsExperienceLabel(v),
				value: v
			}))}
			bind:value={experience}
		/>
		<input
			hidden
			type="text"
			value={experience?.value || null}
			name="experience"
		/>
	</div>

	<div>
		<label for="age">Twój wiek:</label>
		<Select
			name="age-select"
			placeholder="np. 30-35 lat"
			searchable={false}
			items={Object.values(SurveyAgeOption).map((v) => ({
				value: v,
				label: v
			}))}
			bind:value={age}
		/>
		<input hidden type="text" value={age?.value || null} name="age" />
	</div>

	<div>
		<label for="education">Wykształcenie:</label>
		<Select
			name="education-select"
			placeholder="np. Magister"
			searchable={false}
			items={Object.values(SurveyEducation).map((key) => ({
				label: getEducationDegreeLabel(key),
				value: key
			}))}
			bind:value={education}
		/>
		<input
			hidden
			type="text"
			value={education?.value || null}
			name="education"
		/>
	</div>

	<div class="flex gap-2 items-center">
		<Checkbox
			label="Posiadasz uprawnienia architektoniczne?"
			name="is-licensed"
			bind:value={isLicensed}
		/>
		<span
			>{isLicensed === undefined ? '-' : isLicensed ? 'Tak' : 'Nie'}</span
		>
	</div>

	<div>
		<p class="mb-2">Płeć:</p>
		<Radio options={radioOptions} name="sex" bind:group={radioSelected} />
	</div>
</div>
