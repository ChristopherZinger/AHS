<script lang="ts">
	import { appUser } from '$lib/stores/auth';
	import LinkStyle from '../LinkStyle.svelte';
	import NavBtn from './NavBtn.svelte';
	import NavLogo from './NavLogo.svelte';
	import { getLoginUrl, getSigninUrl } from '$lib/utils/appUrls';

	export let onNavBtnClick: () => void;
	export let isMobileMenuOpen: boolean;
</script>

<nav class="flex justify-between items-center">
	<ul class="">
		<li><NavLogo /></li>
	</ul>

	<ul class="justify-between gap-x-6 hidden lg:flex items-center ">
		{#if $appUser}
			<li>
				<LinkStyle><a href={getLoginUrl()}>login</a></LinkStyle>
			</li>
			<li>
				<LinkStyle><a href={getSigninUrl()}>signup</a></LinkStyle>
			</li>
		{:else}
			<li>
				<LinkStyle>logout</LinkStyle>
			</li>
		{/if}
	</ul>

	<ul class="lg:hidden">
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
