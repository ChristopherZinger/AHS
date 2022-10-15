<script lang="ts">
	import Spinner from './Spinner.svelte';

	export let type = '';
	export let disabled = false;
	export let isLoading = false;

	$: isGray = disabled || isLoading;
</script>

<button
	{disabled}
	class={`
    flex justify-center place-items-center align-middle   
    border-2  rounded-full
    text-xl font-medium
    duration-100
    ${
			isGray
				? 'text-zinc-500 cursor-not-allowed border-zinc-500'
				: 'border-black hover:text-white hover:bg-black'
		}
    `}
	{type}
>
	{#if isLoading}
		<div class="h-5">
			<Spinner bgColor="bg-zinc-500" />
		</div>
	{:else}
		<slot />
	{/if}
</button>

<style>
	button {
		width: 223px;
		height: 51px;
	}
</style>
