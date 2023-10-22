<script lang="ts">
	export let type: 'text' | 'password' = 'text';
	export let id: string;
	export let name: string;
	export let value = '';
	export let onChange: (v: string) => void = (v) => {};
	export let placeholder: string = '';
	export let maxLength: number = 250;
	export let required = false;
</script>

<input
	class={`
  w-full
  px-2.5 py-1.5
  border-b-2 border-black
`}
	{type}
	{id}
	{name}
	{value}
	on:input={({ currentTarget: { value } }) => onChange(value)}
	{placeholder}
	maxlength={maxLength}
	{required}
/>

<style>
	input {
		outline: none;
	}
</style>
