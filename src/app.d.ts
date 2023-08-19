// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { CachedUser } from '$lib/server/redis-utils';

// and what to do when importing types
declare namespace App {
	interface Locals {
		user: CachedUser | null;
	}
}
