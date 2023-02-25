<script lang="ts">
	import './styles.css';
	import TopNav from '$lib/components/nav/TopNav.svelte';
	import MobileSideNav from '$lib/components/nav/MobileSideNav.svelte';
	import { getApps, initializeApp } from 'firebase/app';
	import config from '../../firebase.config.json';
	import { getAuth } from 'firebase/auth';
	import { browser } from '$app/environment';
	import { initializeUser, initFsToken } from '$lib/stores/auth';

	if (!getApps().length) {
		initializeApp(config);
	}

	if (browser) {
		initializeUser(getAuth());
		initFsToken(getAuth());
	}

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
