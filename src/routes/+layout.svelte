<script lang="ts">
	import './styles.css';
	import TopNav from '$lib/components/nav/TopNav.svelte';
	import MobileSideNav from '$lib/components/nav/MobileSideNav.svelte';
	import { appUser, type AppUser } from '$lib/stores/auth';
	import {
		initializeAuth,
		getAuth,
		onAuthStateChanged
	} from 'firebase/auth';
	import { onMount } from 'svelte';
	import { initializeApp } from 'firebase/app';
	import * as fbConfig from '../../firebase.config.json';

	onMount(() => {
		const app = initializeApp(fbConfig);
		initializeAuth(app);

		onAuthStateChanged(getAuth(), (u) => {
			appUser.set(
				u
					? {
							email: u.email,
							id: u.uid
					  }
					: null
			);
		});
	});

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
