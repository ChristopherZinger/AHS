<script lang="ts">
	import './styles.css';
	import TopNav from '$lib/components/nav/TopNav.svelte';
	import MobileSideNav from '$lib/components/nav/MobileSideNav.svelte';
	import { appUser, type AppUser } from '$lib/stores/auth';
	import {
		initializeAuth,
		getAuth,
		onIdTokenChanged,
		browserLocalPersistence
	} from 'firebase/auth';
	import { onMount } from 'svelte';
	import { initializeApp } from 'firebase/app';
	import fbConfig from '../../firebase.config.json';
	import { FIREBASE_AUTH_COOKIE_NAME } from '$lib/utils/firebase-utils';

	onMount(() => {
		const app = initializeApp(fbConfig);
		initializeAuth(app, {
			persistence: browserLocalPersistence
		});
		const auth = getAuth();

		onIdTokenChanged(auth, async (user) => {
			const idToken = await user?.getIdToken();
			document.cookie = idToken
				? `${FIREBASE_AUTH_COOKIE_NAME}=${idToken}; path=/; secure;`
				: `${FIREBASE_AUTH_COOKIE_NAME}=; path=/; secure; expires=${new Date(
						'1-1-2000'
				  ).toUTCString()}`;

			appUser.set(
				user
					? {
							email: user.email,
							firebaseUserUid: user.uid
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
			<TopNav />
		</header>

		<!-- <MobileSideNav isOpen={isMobileMenuOpen} {setIsMobileMenuOpen} /> -->

		<div class="mx-3">
			<slot />
		</div>
	</main>
</div>
