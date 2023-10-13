<script lang="ts">
	import InputErrors from '$lib/components/inputs/InputErrors.svelte';
	import InputText from '$lib/components/shared/InputText.svelte';
	import JumpingLabel from '$lib/components/shared/JumpingLabel.svelte';

	export let inputErrors: Record<string, string[]>;
	export let onCityChange: (city: string) => void;
	export let onOfficeNameChange: (city: string) => void;
	export let initialOfficeName: string;
	export let initialCity: string;
	export let onClearErrors: (field: string | number) => void;

	function _onCityChange(value: string) {
		onCityChange(value);
		if (inputErrors.city) {
			onClearErrors('city');
		}
	}

	let officeName = initialOfficeName;
	function _onOfficeNameChange(value: string) {
		officeName = value.replaceAll('<', ' ').replaceAll('>', ' ');
		onOfficeNameChange(officeName);
		if (inputErrors.officeName) {
			onClearErrors('officeName');
		}
	}
</script>

<JumpingLabel label="Nazwa biura:" forHTML="officeName">
	<InputText
		type="text"
		onChange={_onOfficeNameChange}
		id="officeName"
		name="officeName"
		value={officeName}
		placeholder={`np. "APA Janusz i Architekci"`}
		maxLength={150}
	/>
	<InputErrors msgs={inputErrors.officeName || []} />
</JumpingLabel>

<JumpingLabel label={undefined} forHTML="city">
	<div slot="label">
		{#if !officeName}
			W jakim mieście znajduje się to biuro?
		{:else}
			{'W jakim mieście znajduje się '}<b>{officeName}</b>?
		{/if}
	</div>
	<InputText
		type="text"
		onChange={_onCityChange}
		id="city"
		name="city"
		value={initialCity}
		placeholder={`np. "Warszawa"`}
		maxLength={150}
	/>
	<InputErrors msgs={inputErrors.city || []} />
</JumpingLabel>
