<script lang="ts">
	import './styles.css';
	import TopNav from '$lib/components/nav/TopNav.svelte';
	import MobileSideNav from '$lib/components/nav/MobileSideNav.svelte';
	import { appUser, type AppUser } from '$lib/stores/auth';

	export let data: { user: null | AppUser };

	appUser.set(data.user);

	$: isMobileMenuOpen = false;
	const setIsMobileMenuOpen = (v: boolean) => {
		isMobileMenuOpen = v;
	};
</script>

<div class="app">
	<main>
		<header class="mx-3">
			<TopNav
				onNavBtnClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				{isMobileMenuOpen}
			/>
		</header>

		<MobileSideNav isOpen={isMobileMenuOpen} {setIsMobileMenuOpen} />

		<div class="mx-3">
			<slot />
		</div>
	</main>
</div>
