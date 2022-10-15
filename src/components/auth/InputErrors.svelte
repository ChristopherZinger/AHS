<script lang="ts">
	export let msgs: string[];
</script>

{#each msgs as msg}
	<div class="text-xs text-red-800 mt-2">** {msg}</div>
{/each}
