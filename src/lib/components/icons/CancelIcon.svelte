<script lang="ts">
	export let color: string = 'black';
	export let height: string = '12px';
</script>

<svg
	width={height}
	{height}
	viewBox="0 0 11 12"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path d="M1 1.5L10 10.5" stroke={color} stroke-width="2" />
	<path d="M1 10.5L10 1.5" stroke={color} stroke-width="2" />
</svg>
