<script lang="ts">
	export let label: string;
	export let name: string;
	export let value = false;
	export let onChange: (v: boolean) => void = () => {};
</script>

<div>
	<label
		for={name}
		class="flex gap-2  cursor-pointer"
		class:font-medium={value}
		class:underline={value}
	>
		<div class="app-checkbox" class:isSelected={value} />
		{label}
	</label>

	<input
		type="checkbox"
		on:input={({ currentTarget }) => onChange(currentTarget.checked)}
		{name}
		id={name}
		bind:checked={value}
		hidden
	/>
</div>

<style>
	label {
		user-select: none;
	}

	.app-checkbox {
		width: 22px;
		min-width: 22px;
		height: 16px;
		border-radius: 8px;
		background-color: gray;
		border: 2px solid gray;
		box-sizing: border-box;
		position: relative;
		margin-top: 4px;
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
