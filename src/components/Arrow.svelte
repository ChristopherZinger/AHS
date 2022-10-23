<script lang="ts">
	import ArrowIcon from './icons/ArrowIcon.svelte';

	export let size: 's' | 'l' = 's';
	export let hasBorder: boolean = false;
	export let direction: 'up' | 'down' | 'right' | 'left';
</script>

<div
	class:hasBorder
	class={`${size} flex justify-center align-center items-center ${
		size === 's' ? 'rounded-lg' : 'rounded-xl'
	} `}
>
	<ArrowIcon
		height={size === 's' ? 12 : 18}
		weight={size === 's' ? 4 : 2}
		{direction}
	/>
</div>

<style>
	.l {
		width: 37px;
		height: 37px;
	}

	.s {
		width: 21px;
		height: 21px;
	}

	.hasBorder {
		border: 2px solid black;
	}
</style>
