<script>
	import { appUser } from '$lib/stores/auth';
</script>

<svelte:head>
	<title>AHS - Home</title>
</svelte:head>

{#if $appUser}
	{$appUser.email}
{/if}
