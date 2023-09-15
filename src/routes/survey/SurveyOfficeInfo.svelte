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

	function _onOfficeNameChange(value: string) {
		onOfficeNameChange(value);
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
	/>
	<InputErrors msgs={inputErrors.officeName || []} />
</JumpingLabel>

<JumpingLabel label="W jakim miescie:" forHTML="city">
	<InputText
		type="text"
		onChange={_onCityChange}
		id="city"
		name="city"
		value={initialCity}
	/>
	<InputErrors msgs={inputErrors.city || []} />
</JumpingLabel>
