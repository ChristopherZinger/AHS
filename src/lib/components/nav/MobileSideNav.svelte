<script lang="ts">
	import { slide } from 'svelte/transition';
	import { appUser } from '$lib/stores/auth';
	import {
		getLoginUrl,
		getSigninUrl,
		getHomeUrl
	} from '$lib/utils/appUrls';
	import { getAuth, signOut } from '@firebase/auth';

	export let isOpen: boolean;
	export let setIsMobileMenuOpen: (v: boolean) => void;

	function logout() {
		signOut(getAuth()).then(() => {
			setIsMobileMenuOpen(false);
		});
	}
</script>

{#if isOpen}
	<div
		transition:slide={{}}
		class="mobile-side-nav flex items-center justify-center absolute w-full h-full z-10 lg:hidden"
	>
		<div class="inline">
			<ul class="text-4xl">
				<button on:click={() => setIsMobileMenuOpen(false)} class="mb-7">
					<a href={getHomeUrl()}>home</a>
				</button>
				{#if $appUser}
					<button on:click={logout} class="mb-7 cursor-pointer">
						logout
					</button>
				{:else}
					<button
						on:click={() => setIsMobileMenuOpen(false)}
						class="mb-7 cursor-pointer"
					>
						<a href={getLoginUrl()}>login</a>
					</button>
					<button
						on:click={() => setIsMobileMenuOpen(false)}
						class="mb-7 cursor-pointer"
					>
						<a href={getSigninUrl()}> signup </a>
					</button>
				{/if}
			</ul>
		</div>
	</div>
{/if}

<style>
	.mobile-side-nav {
		background: white;
		top: 65px;
		height: calc(100% - 65px);
	}
</style>
