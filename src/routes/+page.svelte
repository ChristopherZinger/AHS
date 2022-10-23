<script>
	import { appUser } from '$lib/stores/auth';
	import FeedContainer from '../components/feed/FeedContainer.svelte';
</script>

<svelte:head>
	<title>AHS - Home</title>
</svelte:head>

{#if $appUser}
	{$appUser.email}
{/if}

<FeedContainer />
