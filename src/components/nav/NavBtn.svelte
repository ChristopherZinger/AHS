<script lang="ts">
	import { scale } from 'svelte/transition';

	export let isMenuOpen: boolean;
</script>

<div class:isOpen={isMenuOpen} class="navbtn-wrapper">
	<div class="navbtn-sqr" />
	{#if isMenuOpen}
		<div class="line l1" in:scale={{}} />
		<div class="line l2" in:scale={{}} />
		<div class="line l3" in:scale={{}} />
		<div class="line l4" in:scale={{}} />
	{/if}
</div>

<style>
	.navbtn-wrapper {
		width: 24px;
		height: 24px;
		position: relative;
	}

	.navbtn-sqr {
		position: absolute;
		top: 0;
		left: 0px;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		border: 3px solid black;
		border-radius: 8px;
		box-sizing: border-box;
		transition-duration: 0.2s;
	}

	.isOpen .navbtn-sqr {
		transform: scale(75%);
		border-radius: 5px;
		border-width: 3px;
	}

	.line {
		position: absolute;
		width: 3px;
		height: 2.5px;
		background: black;
	}

	.l1 {
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}

	.l2 {
		top: 50%;
		left: 100%;
		transform: translate(-100%, -50%);
	}

	.l3 {
		top: 0%;
		left: 50%;
		transform: translate(-50%);
		height: 3px;
		width: 2.5px;
	}

	.l4 {
		transform: translate(-50%, -100%);
		top: 100%;
		left: 50%;
		height: 3px;
		width: 2.5px;
	}
</style>
