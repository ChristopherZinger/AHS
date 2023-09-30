<script lang="ts">
	import { appUser } from '$lib/stores/auth';
	import { getLoginUrl, getSigninUrl } from '$lib/utils/appUrls';
	import { logout } from '$lib/utils/logout';
	import LinkStyle from '../shared/LinkStyle.svelte';
</script>

<ul class="justify-between gap-x-6 hidden lg:flex items-center ">
	<li>
		<LinkStyle><a href={'/search'}>search</a></LinkStyle>
	</li>
	{#if $appUser}
		<li class="cursor-pointer">
			<button on:click={() => logout(() => appUser.set(null))}>
				<LinkStyle>logout</LinkStyle>
			</button>
		</li>
	{:else}
		<li>
			<LinkStyle><a href={getLoginUrl()}>login</a></LinkStyle>
		</li>
		<li>
			<LinkStyle><a href={getSigninUrl()}>signup</a></LinkStyle>
		</li>
	{/if}

	<li>
		<LinkStyle><a href="/survey">survey</a></LinkStyle>
	</li>
</ul>
