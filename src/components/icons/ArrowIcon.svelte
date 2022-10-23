<script lang="ts">
	export let height: number = 20;
	export let color: string = 'black';
	export let weight: number = 2;
	export let direction: 'up' | 'down' | 'left' | 'right';
</script>

<svg
	class={direction}
	{height}
	viewBox="0 0 17 20"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path d="M1 9.5L8.5 2L16 9.5" stroke={color} stroke-width={weight} />
	<path d="M8.5 2.5V19.5" stroke={color} stroke-width={weight} />
</svg>

<style>
	.down {
		transform: rotate(180deg);
	}
	.left {
		transform: rotate(-90deg);
	}
	.right {
		transform: rotate(90deg);
	}
</style>
