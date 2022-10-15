<script lang="ts">
	export let title: string;
</script>

<div
	class={`
    auth-box py-20
    lg:px-12
    lg:border lg:rounded-2xl lg:border-2 lg:border-black
  `}
>
	<h1 class="font-bold text-2xl mb-12">{title}</h1>
	<slot />
</div>

<style>
	@media only screen and (min-width: 1024px) {
		div {
			width: 455px;
		}
	}
</style>
