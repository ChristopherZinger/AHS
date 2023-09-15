<script lang="ts">
	export let label: string;
	export let forHTML: string;

	$: isMouseOver = false;
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
	<label class="left-0" for={forHTML}>{label}</label>
	<slot />
</div>
