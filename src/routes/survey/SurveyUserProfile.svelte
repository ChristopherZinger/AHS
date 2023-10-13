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
		type SurveyData,
		getNumYearsExperienceLabel
	} from '../../lib/utils/surveyTypes';
	import Radio from '$lib/components/inputs/Radio.svelte';
	import { getEducationDegreeLabel } from '$lib/components/labels/EducationLabel.svelte';

	export let setAge: (v: SurveyAgeOption | undefined) => void;
	export let setEducation: (v: SurveyEducation | undefined) => void;
	export let setSex: (v: SurveySexOption | undefined) => void;
	export let setIsLicensed: (v: boolean) => void;
	export let setNumYearsExperience: (
		v: SurveyNumYearsExperience | undefined
	) => void;
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
			label: 'Osoba niebinarna',
			value: SurveySexOption.NONBINARY
		}
	];

	let radioSelected: undefined | SurveySexOption = initialData?.sex;
	$: setSex(radioSelected);
</script>

<div>
	<label for="numYearsExperience"
		>Jaki jest Twój staż w zawodzie architekta?</label
	>
	<Select
		name="numYearsExperience"
		placeholder="np 2-5 lat"
		searchable={false}
		on:clear={() => {
			setNumYearsExperience(undefined);
		}}
		items={Object.values(SurveyNumYearsExperience).map((v) => ({
			label: getNumYearsExperienceLabel(v),
			value: v
		}))}
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
	<label for="age">Twój wiek:</label>
	<Select
		name="age"
		placeholder="np. 30-35 lat"
		searchable={false}
		items={Object.values(SurveyAgeOption).map((v) => ({
			value: v,
			label: v
		}))}
		on:clear={() => {
			setAge(undefined);
		}}
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
	<label for="age">Wykształcenie:</label>
	<Select
		name="education"
		placeholder="np. Magister"
		searchable={false}
		items={Object.values(SurveyEducation).map((key) => ({
			label: getEducationDegreeLabel(key),
			value: key
		}))}
		on:clear={() => {
			setEducation(undefined);
		}}
		on:input={({ detail }) => {
			const value = detail?.value;
			if (isSurveyEducation(value)) {
				setEducation(value);
			}
		}}
		value={initialData?.education}
	/>
</div>

<div class="flex gap-2 items-center">
	<Checkbox
		label="Posiadasz uprawnienia architektoniczne?"
		name="isLicensed"
		bind:value={isLicensed}
		onChange={(v) => {
			setIsLicensed(v);
		}}
	/>
	<span>{isLicensed === undefined ? '-' : isLicensed ? 'Tak' : 'Nie'}</span
	>
</div>

<div>
	<p class="mb-2">Płeć:</p>
	<Radio options={radioOptions} name="gege" bind:group={radioSelected} />
</div>
