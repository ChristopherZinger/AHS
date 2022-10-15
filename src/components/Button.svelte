<script lang="ts">
	export let type = '';
	export let disabled = false;
</script>

<button
	{disabled}
	class={`
    flex justify-center place-items-center align-middle   
    border-2 ${disabled ? 'border-zinc-500' : 'border-black'} rounded-full
    ${disabled && 'cursor-not-allowed'}
    ${disabled && 'text-zinc-500'}
    text-xl font-medium
    duration-100
    ${!disabled && 'hover:text-white hover:bg-black'}`}
	{type}
>
	<slot />
</button>

<style>
	button {
		width: 223px;
		height: 51px;
	}
</style>
