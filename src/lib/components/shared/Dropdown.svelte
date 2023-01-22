<script lang="ts">
	import { clickOutside } from '$lib/actions/outclick';

	let isFocused = false;
</script>

<div
	on:focusin={() => {
		isFocused = true;
	}}
	use:clickOutside={(hi) => {
		isFocused = false;
	}}
>
	<slot name="input" />

	<div class="relative w-full" class:hidden={!isFocused}>
		<div class="drop-down absolute">
			<slot name="options" />
		</div>
	</div>
</div>

<style>
	.drop-down {
		width: 100%;
		max-height: 400px;
		overflow-x: hidden;
		overflow-y: auto;
	}
</style>
