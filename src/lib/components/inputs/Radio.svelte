<script lang="ts">
	export let options: {
		label: string;
		value: string;
	}[];
	export let name: string;
	export let group: string | number | undefined;
</script>

{#each options as option}
	<label
		for={`${name}-${option.value}`}
		class="flex gap-2 items-center cursor-pointer"
	>
		<div class="app-checkbox" class:isSelected={group === option.value} />
		{option.label}
		<input
			type="radio"
			{name}
			id={`${name}-${option.value}`}
			bind:group
			value={option.value}
			hidden
		/>
	</label>
{/each}

<style>
	label {
		user-select: none;
	}

	.app-checkbox {
		width: 22px;
		height: 16px;
		border-radius: 8px;
		background-color: gray;
		border: 2px solid gray;
		box-sizing: border-box;
		position: relative;
	}

	.app-checkbox.isSelected {
		border: 2px solid black;
		background-color: black;
	}

	.app-checkbox::after {
		content: '';
		position: absolute;
		display: block;
		border-radius: 50%;
		width: 12px;
		height: 12px;
		background-color: white;
		top: 0;
		left: 0;
		transition-duration: 0.1s;
	}

	.app-checkbox.isSelected::after {
		left: 6px;
	}
</style>
