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

	let officeName = initialOfficeName;
	function _onCityChange(value: string) {
		onCityChange(value);
		if (inputErrors.city) {
			onClearErrors('city');
		}
	}

	function _onOfficeNameChange(value: string) {
		const _officeName = value.replace('<', ' ').replace('>', ' ');
		officeName = _officeName;
		onOfficeNameChange(_officeName);
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
		value={initialOfficeName}
		placeholder={`np. "APA Janusz i Architekci"`}
	/>
	<InputErrors msgs={inputErrors.officeName || []} />
</JumpingLabel>

<JumpingLabel
	label={`W jakim miescie znajduje się ${
		officeName
			? `<b><pre class="inline">${officeName}</pre></b>`
			: ' to biuro'
	}?`}
	forHTML="city"
>
	<InputText
		type="text"
		onChange={_onCityChange}
		id="city"
		name="city"
		value={initialCity}
		placeholder={`np. "Warszawa"`}
	/>
	<InputErrors msgs={inputErrors.city || []} />
</JumpingLabel>
