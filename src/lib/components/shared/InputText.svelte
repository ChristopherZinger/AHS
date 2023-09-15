<script lang="ts">
	export let type: 'text' | 'password' = 'text';
	export let id: string;
	export let name: string;
	export let value = '';
	export let onChange: (v: string) => void;
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
/>

<style>
	input {
		outline: none;
	}
</style>
