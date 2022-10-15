<script lang="ts">
	export let bgColor: string = 'bg-black';
</script>

<div class="flex justify-center w-full h-full">
	<div class={`spinner ${bgColor} rounded-sm h-full aspect-square`} />
</div>

<style>
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.spinner {
		animation-name: spin;
		animation-duration: 4s;
		animation-iteration-count: infinite;
	}
</style>
