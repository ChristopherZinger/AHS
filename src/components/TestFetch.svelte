<script lang="ts">
	import { FS_TOKEN_BEARER_KEY } from '$lib/constants';
	import { fs_token } from '$lib/stores/auth';

	async function onClick() {
		const token = $fs_token;
		if (!token) {
			throw new Error('missing firestore token');
		}

		const res = await (
			await fetch('api/redis-get', {
				credentials: 'include',
				headers: {
					[FS_TOKEN_BEARER_KEY]: token
				}
			})
		).json();

		console.log(res);
	}
</script>

<button on:click|preventDefault={onClick}>fetch get</button>

<style>
	button {
		margin: '20px 0';
		display: block;
	}
</style>
