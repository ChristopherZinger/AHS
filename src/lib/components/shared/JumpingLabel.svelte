<script lang="ts">
	export let label: string;
	export let forHTML: string;
	export let isUp: boolean;

	$: isMouseOver = false;
	$: moveLabelUp = isMouseOver || isUp;
	const setIsMouseOver = () => {
		isMouseOver;
	};
</script>

<div
	on:mouseenter={() => {
		isMouseOver = true;
	}}
	on:mouseleave={() => {
		isMouseOver = false;
	}}
	class="relative"
>
	<label
		class:isUp={moveLabelUp}
		class="absolute top-1.5 left-0 duration-100"
		for={forHTML}>{label}</label
	>
	<slot />
</div>

<style>
	.isUp {
		transform: translateY(-20px);
	}
</style>
