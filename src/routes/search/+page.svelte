<script lang="ts">
	import { fetchCityListByCountryCode } from '$lib/api/city-utils';
	import NewDropdown, {
		type LabeledValue
	} from '$lib/components/shared/NewDropdown.svelte';
	import type { Country, City } from '@prisma/client';
	import { fetchOfficeAutocomplete } from '../api/autocomplete/fetchAutocompleteOffice';

	export let data: {
		data: Country[];
	};

	// country input
	let selectedCountry: Country | null = null;
	function onSelectedCountryChange(value: LabeledValue | null) {
		selectedCountry = value
			? data.data.find((c) => c.alpha2 === value.value) || null
			: null;
		selectedCity = null;
	}

	// city input
	let selectedCity: City | null = null;
	let selectableCities: City[] = [];
	let isLoadingCities = false;
	function handleCitySelect(v: LabeledValue) {
		selectedCity = selectableCities.find((c) => c.id === v.value) || null;
	}
	function loadCitiesForCityAplha(code: string) {
		isLoadingCities = true;
		fetchCityListByCountryCode(code)
			.then((r) => {
				selectableCities = r;
			})
			.finally(() => {
				isLoadingCities = false;
			});
	}
	$: selectedCountry && loadCitiesForCityAplha(selectedCountry.alpha2);

	// office input
	let selectableOffice: (LabeledValue & { created?: boolean })[] = [];
	let isLoadingOffices = false;

	function handleOfficeSelect(v: any) {
		console.log('selected office', v, selectedCity, selectedCountry);
	}
	function setSelectableOffices(input: string) {
		if (!input || input.length <= 2) {
			selectableOffice = [];
			return;
		}
		isLoadingOffices = true;
		fetchOfficeAutocomplete(input, {
			cityName: selectedCity?.name,
			countryAlpha2: selectedCountry?.alpha2
		})
			.then((result) => {
				selectableOffice = result.map((o) => ({
					value: o.id,
					label: o.name,
					labelExtraInfo: `${o.city.name}, ${o.city.country.alpha2}`
				}));
			})
			.finally(() => {
				isLoadingOffices = false;
			});
	}
</script>

<svelte:head>
	<title>AHS - Search</title>
</svelte:head>

<div class="app-section__narrow">
	<h1 class="text-3xl my-12">
		<span class="font-bold"> Search </span>
		{selectedCountry ? '/ ' + selectedCountry.name : ''}
		{selectedCity ? '/ ' + selectedCity.name : ''}
	</h1>

	<form class="flex flex-col gap-y-10">
		<div class="grid md:grid-cols-2 gap-10 grid-cols-1 ">
			<div class="grow">
				<NewDropdown
					label="Country"
					options={data.data.map((c) => ({
						value: c.alpha2,
						label: c.name,
						labelExtraInfo: c.alpha2
					}))}
					onSelect={onSelectedCountryChange}
					onClear={() => onSelectedCountryChange(null)}
					value={selectedCountry?.alpha2 || null}
				/>
			</div>

			<div class="grow">
				<NewDropdown
					label="City"
					options={selectableCities.map((c) => ({
						value: c.id,
						label: c.name
					}))}
					onSelect={handleCitySelect}
					onClear={() => {
						selectedCity = null;
					}}
					value={selectedCity?.id || null}
					isDisabled={!selectedCountry}
				/>
			</div>
		</div>

		<div class="flex gap-x-5">
			<div class="grow">
				<NewDropdown
					label="Office"
					options={selectableOffice}
					onSelect={handleOfficeSelect}
					onClear={() => {}}
					onInputChange={setSelectableOffices}
					isLoading={isLoadingOffices}
					allowExtraItem={true}
				/>
			</div>
		</div>
	</form>
</div>
