// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { TokenUser } from '$lib/server/TokenUserUtils';

declare global {
	namespace App {
		interface Locals {
			user: TokenUser | null;
		}
	}
}
export {};
