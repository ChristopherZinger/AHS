<script lang="ts">
	import { appUser } from '$lib/stores/auth';
	import LinkStyle from '../LinkStyle.svelte';
	import NavBtn from './NavBtn.svelte';
	import NavLogo from './NavLogo.svelte';
	import {
		getHomeUrl,
		getLoginUrl,
		getSigninUrl
	} from '$lib/utils/appUrls';
	import { logout } from '$lib/auth-client-utils';

	export let onNavBtnClick: () => void;
	export let isMobileMenuOpen: boolean;
</script>

<nav class="flex justify-between items-center app-section">
	<ul class="">
		<li><a href={getHomeUrl()}><NavLogo /></a></li>
	</ul>

	<ul class="justify-between gap-x-6 hidden lg:flex items-center ">
		{#if $appUser}
			<li class="cursor-pointer" on:click={logout}>
				<LinkStyle>logout</LinkStyle>
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
