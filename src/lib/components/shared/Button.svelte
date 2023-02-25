<script lang="ts">
	import Spinner from './Spinner.svelte';

	export let type: 'submit' | 'button' | 'reset' | null | undefined =
		undefined;
	export let disabled = false;
	export let isLoading = false;
	export let onClick: (() => void) | undefined = undefined;
	export let size: 'm' | 'l' = 'l';

	$: isGray = disabled || isLoading;
</script>

<button
	{disabled}
	on:click={() => onClick && onClick()}
	class={`
	${size}
    flex justify-center place-items-center align-middle   
    border-2  rounded-full
    font-medium
    duration-100
    ${
			isGray
				? 'text-zinc-500 cursor-not-allowed border-zinc-500'
				: 'border-black hover:text-white hover:bg-black'
		}
    `}
	class:text-base={size === 'm'}
	class:text-xl={size === 'l'}
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
	.m {
		width: 180px;
		height: 35px;
	}

	.l {
		width: 223px;
		height: 51px;
	}
</style>
