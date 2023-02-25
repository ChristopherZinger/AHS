<script lang="ts">
	import { fetchCityListByCountryCode } from '$lib/api/city-utils';
	import NewDropdown, {
		type LabeledValue
	} from '$lib/components/shared/NewDropdown.svelte';
	import type { Country, City } from '@prisma/client';
	import { groupBy } from 'lodash';
	import Spinner from '../../components/Spinner.svelte';
	import Button from '$lib/components/shared/Button.svelte';
	import { fetchOfficeAutocomplete } from '../api/autocomplete/fetchAutocompleteOffice';
	import { fetchOffice, type Office } from '../api/office/fetchOffices';
	import { goto } from '$app/navigation';

	export let data: {
		data: Country[];
	};

	const getHighlightedSearchPhrase = (phrase: string, search: string) => {
		const regExp = new RegExp(search, 'i');
		const startIndex = phrase.search(regExp);
		if (startIndex === -1) {
			return phrase;
		}
		const endIndex = startIndex + search.length;
		const part = phrase.slice(startIndex, endIndex);
		const result = phrase.replace(regExp, `<b>${part}</b>`);

		return result;
	};

	// country input
	let selectedCountry: Country | null = null;
	function onSelectedCountryChange(value: LabeledValue | null) {
		selectedCountry = value
			? data.data.find((c) => c.alpha2 === value.value) || null
			: null;
		selectedCity = null;
		selectedOfficeInputValue = '';
		officeList = undefined;
	}

	// city input
	let selectedCity: City | null = null;
	let selectableCities: City[] = [];
	let isLoadingCities = false;
	function handleCitySelect(v: LabeledValue) {
		selectedCity = selectableCities.find((c) => c.id === v.value) || null;
		selectedOfficeInputValue = '';
		officeList = undefined;
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
	let selectedOfficeInputValue: undefined | null | string;

	function handleOfficeSelect(selectedLabeledValue: LabeledValue) {
		const { value, created } = selectedLabeledValue;
		selectedOfficeInputValue = selectedLabeledValue.value;

		if (created) {
			handleSearchForOffices(value);
		} else {
			goto(`/office/${value}`);
		}
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

	// office list - search result
	let currentSearchPhrase = '';
	let isOfficeListLoading = false;
	let officeList: Office[] | undefined = undefined;
	let noMoreOfficeToLoad = false;
	$: officeListAlphabeticaly =
		officeList && groupBy(officeList, (i) => i.name[0]?.toLowerCase());

	async function loadMoreOfficesForLastSearchPhrase() {
		const offices = await getOfficesForLastSearchPhrase();
		officeList = [...(officeList || []), ...offices];
		if (!offices.length) {
			noMoreOfficeToLoad = true;
		}
	}

	async function handleSearchForOffices(searchPhrase: string) {
		currentSearchPhrase = searchPhrase;
		const offices = await getOfficesForLastSearchPhrase();
		noMoreOfficeToLoad = !offices.length;

		officeList = offices;
	}

	async function getOfficesForLastSearchPhrase() {
		isOfficeListLoading = true;
		const offices = await fetchOffice(currentSearchPhrase, {
			cityName: selectedCity?.name,
			countryAlpha2: selectedCountry?.alpha2,
			startAt: officeList?.length
		});
		isOfficeListLoading = false;
		return offices;
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
					isLoading={isLoadingCities}
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
					value={selectedOfficeInputValue}
				/>
			</div>
		</div>
	</form>

	<div class="results mt-16">
		{#if officeListAlphabeticaly !== undefined}
			{#if Object.keys(officeListAlphabeticaly).length}
				<ul>
					{#each Object.entries(officeListAlphabeticaly) as [key, offices]}
						<li class="my-5 text-lg font-bold border-b border-slate-200">
							{key.toUpperCase()}
						</li>
						{#each offices as office}
							<li class="my-2">
								<a
									class="flex justify-between hover:underline"
									href={`/office/${office.id}`}
								>
									<div>
										{@html getHighlightedSearchPhrase(
											office.name,
											currentSearchPhrase
										)}
									</div>
									<div>
										{office.city.name}, {office.city.country.alpha2}
									</div>
								</a>
							</li>
						{/each}
					{/each}
				</ul>
				<div
					class:hidden={!officeList?.length}
					class="flex justify-center my-10"
				>
					{#if !noMoreOfficeToLoad}
						{#if isLoadingOffices}
							<Spinner />
						{:else}
							<Button
								size="m"
								type="button"
								onClick={() => {
									loadMoreOfficesForLastSearchPhrase();
								}}>Load More</Button
							>
						{/if}
					{/if}
				</div>
			{:else}
				<div class="text-center">
					No results for <span class="font-bold"
						>"{currentSearchPhrase}"</span
					>.
					<a class="underline" href="/create-office">Add new office.</a>
				</div>
			{/if}
		{:else}
			<div class="my-5 text-center text-slate-400">
				Enter office name and start search.
			</div>
		{/if}
	</div>
</div>
