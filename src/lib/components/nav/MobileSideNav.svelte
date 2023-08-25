<script lang="ts">
	import { slide } from 'svelte/transition';
	import { appUser } from '$lib/stores/auth';
	import {
		getLoginUrl,
		getSigninUrl,
		getHomeUrl
	} from '$lib/utils/appUrls';
	import { logout } from '$lib/utils/logout';

	export let isOpen: boolean;
	export let setIsMobileMenuOpen: (v: boolean) => void;

	const hideNav = () => setIsMobileMenuOpen(false);
</script>

{#if isOpen}
	<div
		transition:slide={{}}
		class="mobile-side-nav flex items-center justify-center absolute w-full h-full z-10 lg:hidden"
	>
		<div class="inline">
			<ul class="text-4xl">
				<button on:click={hideNav} class="mb-7">
					<a href={getHomeUrl()}>home</a>
				</button>
				{#if $appUser}
					<button
						on:click={async () => {
							await logout(() => appUser.set(null));
							hideNav();
						}}
						class="mb-7 cursor-pointer"
					>
						logout
					</button>
				{:else}
					<button on:click={hideNav} class="mb-7 cursor-pointer">
						<a href={getLoginUrl()}>login</a>
					</button>
					<button on:click={hideNav} class="mb-7 cursor-pointer">
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
