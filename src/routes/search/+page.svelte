<script lang="ts">
	import { fetchCityListByCountryCode } from '$lib/api/city-utils';
	import CancelIcon from '$lib/components/icons/CancelIcon.svelte';
	import Dropdown from '$lib/components/shared/Dropdown.svelte';
	import type { Country, Entity, City } from '@prisma/client';
	import Arrow from '../../components/Arrow.svelte';
	import {
		fetchOfficeAutocomplete,
		type OfficeAutocomplete
	} from '../api/autocomplete/fetchAutocompleteOffice';

	export let data: {
		data: Country[];
	};

	// country input
	let countryInput = '';
	let selectedCountry: Country | undefined = undefined;
	$: selectedCountry;
	const getCountrySetter = () => {
		let previousCountryValue: string | null = null;
		return (countryName: string | null) => {
			const country = countryName
				? data.data.find(
						(c) => c.name.toLowerCase() === countryName.toLowerCase()
				  )
				: undefined;

			const value = country?.name || null;

			if (previousCountryValue === value) {
				return;
			} else {
				previousCountryValue = value;
			}

			setCity(null);

			if (country) {
				selectedCountry = country;
				countryInput = country.name;
			} else {
				selectedCountry = undefined;
				countryInput = '';
			}
		};
	};
	const setCountry = getCountrySetter();
	const getSelectableCountries = (inputValue: string) =>
		inputValue
			? data.data.filter((country) =>
					country.name.toLowerCase().startsWith(inputValue.toLowerCase())
			  )
			: data.data;

	// city input
	let cityInput = '';
	let selectedCity: City | undefined = undefined;
	$: selectedCity;
	const getCitySetter = () => {
		let previousValue: null | string = null;
		return (cityName: string | null) => {
			const city = cityName
				? selectableCities.find(
						(c) => c.name.toLowerCase() === cityName.toLowerCase()
				  )
				: null;

			const value = city?.name || null;
			if (previousValue === value) {
				return;
			} else {
				previousValue = value;
			}

			if (city) {
				selectedCity = city;
				cityInput = city.name;
			} else {
				selectedCity = undefined;
				cityInput = '';
			}
		};
	};
	const setCity = getCitySetter();
	let citiesInSelectedCountry: City[] | undefined;
	let previouslySelectedCountryAlpha: string | undefined;
	$: if (selectedCountry?.alpha2 !== previouslySelectedCountryAlpha) {
		if (selectedCountry) {
			fetchCityListByCountryCode(selectedCountry.alpha2).then((cities) => {
				citiesInSelectedCountry = cities;
			});
		} else {
			citiesInSelectedCountry = undefined;
		}

		previouslySelectedCountryAlpha = selectedCountry?.alpha2;
	}
	$: selectableCities = citiesInSelectedCountry
		? cityInput
			? citiesInSelectedCountry.filter((city) =>
					city.name.toLowerCase().startsWith(cityInput.toLowerCase())
			  )
			: citiesInSelectedCountry
		: [];

	// office input
	let officeInput: string = '';
	let selectableOffice: OfficeAutocomplete[] = [];

	const setSelectableOffices = (() => {
		let previousValue: string | null = null;

		return (input: string | null) => {
			if (input === previousValue) {
				return;
			}
			console.log('set offices');

			if (!input || input.length <= 2) {
				selectableOffice = [];
				return;
			}

			fetchOfficeAutocomplete(input, {
				cityName: selectedCity?.name,
				countryAlpha2: selectedCountry?.alpha2
			}).then((result) => {
				selectableOffice = result;
			});
		};
	})();

	$: setSelectableOffices(officeInput);
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
		<div class="flex gap-10 flex-wrap">
			<div class="grow">
				<Dropdown doBeforeWrap={() => setCountry(countryInput)}>
					<div
						class="flex gap-x-5 flex-grow border-b-2 border-black pb-2"
						slot="input"
					>
						<label for="country">Country:</label>
						<input
							id="country"
							name="country"
							on:input={({ currentTarget: { value } }) => {
								countryInput = value;
							}}
							value={countryInput}
							autocomplete="off"
							type="text"
							class="grow"
						/>
						{#if selectedCountry}
							<button
								on:click={() => {
									setCountry(null);
								}}><CancelIcon /></button
							>
						{/if}
					</div>
					<ul slot="options" class=" bg-white drop-shadow-md">
						{#each getSelectableCountries(countryInput) as country}
							<li>
								<button
									class="w-full hover:underline text-left p-2"
									on:click={() => setCountry(country.name)}
									>{country.name}
								</button>
							</li>
						{/each}
					</ul>
				</Dropdown>
			</div>

			<div class="grow">
				<Dropdown doBeforeWrap={() => setCity(cityInput)}>
					<div
						class="flex gap-x-5 flex-grow border-b-2 border-black pb-2"
						slot="input"
					>
						<label for="city">City:</label>
						<input
							id="city"
							name="city"
							on:input={({ currentTarget: { value } }) => {
								cityInput = value;
							}}
							value={cityInput}
							autocomplete="off"
							type="text"
							class="grow"
						/>
						{#if selectedCity}
							<button
								on:click={() => {
									setCity(null);
								}}><CancelIcon /></button
							>
						{/if}
					</div>
					<ul slot="options" class=" bg-white">
						{#each selectableCities as city}
							<li>
								<button
									class="w-full hover:bg-gray-100 text-left p-2"
									on:click={() => setCity(city.name)}
									>{city.name}
								</button>
							</li>
						{/each}
					</ul>
				</Dropdown>
			</div>
		</div>

		<div class="flex gap-x-5">
			<div class="grow">
				<Dropdown doBeforeWrap={() => {}}>
					<div
						class="flex gap-x-5 flex-grow border-b-2 border-black pb-2"
						slot="input"
					>
						<label for="office">Office Name:</label>
						<input
							id="office"
							name="office"
							on:input={({ currentTarget: { value } }) => {
								officeInput = value;
							}}
							value={officeInput}
							autocomplete="off"
							type="text"
							class="grow"
						/>

						<div class="flex gap-x-2">
							<button class="font-bold" type="submit">Find</button>
							<Arrow direction="right" size="s" hasBorder={false} />
						</div>
					</div>
					<ul slot="options" class=" bg-white">
						{#each selectableOffice as office}
							<li class="flex justify-between items-center">
								<div>
									<button
										class="w-full hover:bg-gray-100 text-left p-2"
										on:click={() => {}}
										>{office.name}
									</button>
								</div>

								<div class="italic text-zinc-400 mr-10">
									{office.city.name}, {office.city.country.alpha2}
								</div>
							</li>
						{/each}
					</ul>
				</Dropdown>
			</div>
		</div>
	</form>
</div>
