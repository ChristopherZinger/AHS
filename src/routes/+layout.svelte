<script lang="ts">
	import './styles.css';
	import TopNav from '$lib/components/nav/TopNav.svelte';
	import MobileSideNav from '$lib/components/nav/MobileSideNav.svelte';

	$: isMobileMenuOpen = false;
	const setIsMobileMenuOpen = (v: boolean) => {
		isMobileMenuOpen = v;
	};
</script>

<div class="app">
	<main>
		<header class="mx-3">
			<!-- <TopNav
				onNavBtnClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				{isMobileMenuOpen}
			/> -->
			<TopNav />
		</header>

		<MobileSideNav isOpen={isMobileMenuOpen} {setIsMobileMenuOpen} />

		<div class="mx-3">
			<slot />
		</div>
	</main>
</div>
