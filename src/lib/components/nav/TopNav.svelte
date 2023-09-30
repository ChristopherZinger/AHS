<script lang="ts">
	import NavLogo from './NavLogo.svelte';
	import { getHomeUrl } from '$lib/utils/appUrls';

	// export let onNavBtnClick: () => void;
	// export let isMobileMenuOpen: boolean;
</script>

<nav class="flex justify-between items-center app-section">
	<ul class="">
		<li><a href={getHomeUrl()}><NavLogo /></a></li>
	</ul>

	<!-- <TopNavLeftSide /> -->

	<!-- phone main menu button -->
	<!-- <ul class="lg:hidden cursor-pointer">
		<li>
			<button on:click={onNavBtnClick}>
				<NavBtn isMenuOpen={isMobileMenuOpen} />
			</button>
		</li>
	</ul> -->
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
