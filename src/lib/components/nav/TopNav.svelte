<script lang="ts">
	import { appUser } from '$lib/stores/auth';
	import LinkStyle from '$lib/components/shared/LinkStyle.svelte';
	import NavBtn from './NavBtn.svelte';
	import NavLogo from './NavLogo.svelte';
	import {
		getHomeUrl,
		getLoginUrl,
		getSigninUrl
	} from '$lib/utils/appUrls';
	import { logout } from '$lib/auth-client-utils';
	import { getAuth } from 'firebase/auth';

	export let onNavBtnClick: () => void;
	export let isMobileMenuOpen: boolean;
</script>

<nav class="flex justify-between items-center app-section">
	<ul class="">
		<li><a href={getHomeUrl()}><NavLogo /></a></li>
	</ul>

	<ul class="justify-between gap-x-6 hidden lg:flex items-center ">
		<li>
			<LinkStyle><a href={'/search'}>search</a></LinkStyle>
		</li>
		{#if $appUser}
			<li class="cursor-pointer">
				<button on:click={() => logout(getAuth())}>
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
	</ul>

	<ul class="lg:hidden cursor-pointer">
		<li on:click={onNavBtnClick}>
			<NavBtn isMenuOpen={isMobileMenuOpen} />
		</li>
	</ul>
</nav>

<style>
	nav {
		height: 65px;
		border-bottom: 1px solid black;
	}

	@media only screen and (min-width: 1024px) {
		nav {
			height: 180px;
			border-bottom: none;
		}
	}
</style>
