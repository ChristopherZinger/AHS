<script lang="ts">
	export let type = '';
</script>

<button
	class={`
    flex justify-center place-items-center align-middle   
    border-2 border-black rounded-full
    text-xl font-medium
    duration-100
    hover:text-white hover:bg-black`}
	{type}
>
	<slot />
</button>

<style>
	button {
		width: 223px;
		height: 51px;
	}
</style>
