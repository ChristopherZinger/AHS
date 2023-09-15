<script lang="ts">
	import Checkbox from '$lib/components/inputs/Checkbox.svelte';
	import Select from 'svelte-select/Select.svelte';
	import {
		SurveyAgeOption,
		SurveyEducation,
		SurveyNumYearsExperience,
		SurveySexOption,
		isSurveyAgeOptons,
		isSurveyEducation,
		isSurveyNumOfExperience,
		type SurveyData
	} from '../../lib/utils/surveyTypes';
	import Radio from '$lib/components/inputs/Radio.svelte';
	import { getEducationDegreeLabel } from '$lib/components/labels/EducationLabel.svelte';

	export let setAge: (v: SurveyAgeOption) => void;
	export let setEducation: (v: SurveyEducation) => void;
	export let setSex: (v: SurveySexOption | undefined) => void;
	export let setIsLicensed: (v: boolean) => void;
	export let setNumYearsExperience: (v: SurveyNumYearsExperience) => void;
	export let initialData: undefined | SurveyData['profile'];

	let isLicensed = initialData?.isLicensed || false;
	$: setIsLicensed(isLicensed);

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
			label: 'Osoba niebinarna',
			value: SurveySexOption.NONBINARY
		}
	];

	let radioSelected: undefined | SurveySexOption = initialData?.sex;
	$: setSex(radioSelected);
</script>

<div>
	<label for="numYearsExperience">Ile masz lat doświadczenia?</label>
	<Select
		name="numYearsExperience"
		placeholder="np 2-5 lat"
		searchable={false}
		items={Object.values(SurveyNumYearsExperience)}
		on:input={({ detail }) => {
			const value = detail?.value;
			if (isSurveyNumOfExperience(value)) {
				setNumYearsExperience(value);
			}
		}}
		value={initialData?.numYearsExperience}
	/>
</div>

<div>
	<label for="age">Wiek</label>
	<Select
		name="age"
		placeholder="np. 30-35 lat"
		searchable={false}
		items={Object.values(SurveyAgeOption)}
		on:input={({ detail }) => {
			const value = detail?.value;
			if (isSurveyAgeOptons(value)) {
				setAge(value);
			}
		}}
		value={initialData?.age}
	/>
</div>

<div>
	<label for="age">Edukacja</label>
	<Select
		name="education"
		placeholder="np. Magister"
		searchable={false}
		items={Object.values(SurveyEducation).map((key) => ({
			label: getEducationDegreeLabel(key),
			value: key
		}))}
		on:input={({ detail }) => {
			const value = detail?.value;
			if (isSurveyEducation(value)) {
				setEducation(value);
			}
		}}
		value={initialData?.education}
	/>
</div>

<div class="flex gap-2">
	<Checkbox
		label="Posiadasz uprawnienia?"
		name="isLicensed"
		bind:value={isLicensed}
	/>
	<span>{isLicensed ? 'Tak' : 'Nie'}</span>
</div>

<div>
	<p class="mb-2">Płeć:</p>
	<Radio options={radioOptions} name="gege" bind:group={radioSelected} />
</div>
