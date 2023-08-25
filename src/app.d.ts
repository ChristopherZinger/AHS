// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { TokenUser } from '$lib/server/TokenUserUtils';

declare namespace App {
	interface Locals {
		user: TokenUser | null;
	}
}
