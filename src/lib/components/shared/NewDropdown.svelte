<script lang="ts" context="module">
	export type LabeledValue = {
		value: string;
		label: string;
		labelExtraInfo?: string;
	};

	type LabeledValueWithCreate = LabeledValue & { created?: boolean };
</script>

<script lang="ts">
	import Select from 'svelte-select';

	export let allowExtraItem = false;
	export let isDisabled = false;
	export let isLoading = false;
	export let label: string;
	export let onClear: () => void;
	export let onInputChange: ((value: string) => void) | undefined =
		undefined;
	export let onSelect: (v: LabeledValue) => void;
	export let options: LabeledValue[];
	export let value: string | null | undefined = undefined;

	let filterText = '';
	$: {
		filterText, onInputChange && onInputChange(filterText);
	}

	let items: LabeledValueWithCreate[];
	$: items = isDisabled ? [] : options;

	function handleFilter({ detail }: { detail: LabeledValueWithCreate[] }) {
		const searchPhraseItem = {
			created: true,
			value: filterText,
			label: filterText
		};
		if (
			filterText.length > 3 &&
			allowExtraItem &&
			(!detail[0]?.created || detail[0].label !== searchPhraseItem.label)
		) {
			items = [searchPhraseItem, ...options];
		}
	}

	function handleChange() {
		items = items.map((i) => {
			delete i.created;
			return i;
		});
	}
</script>

<div class="border-b-2 border-black">
	<Select
		{value}
		disabled={isDisabled}
		loading={isLoading}
		on:clear={onClear}
		on:select={({ detail }) => {
			onSelect(detail);
		}}
		on:change={handleChange}
		on:filter={handleFilter}
		bind:filterText
		{items}
		--border="none"
		--border-focused="none"
		--border-hover="none"
		--padding="0px"
	>
		<div slot="prepend"><div class="pr-2">{label}:</div></div>

		<div class="flex justify-between" slot="item" let:item>
			<div>
				{item.created ? 'Search: ' : ''}
				{item.label}
			</div>
			{#if item.labelExtraInfo}
				<div>
					{item.labelExtraInfo}
				</div>
			{/if}
		</div>
	</Select>
</div>
