<script lang="ts">
	import { page } from '$app/stores';
	import { ServerErrorName } from '$lib/utils/appError';
	import { getIsEnum } from '$lib/utils/types-utils';

	function getMessage(msg: string) {
		const isServerError = getIsEnum(ServerErrorName);
		if (
			isServerError(msg) &&
			[
				ServerErrorName.MISSING_OR_INVALID_ANONYMOUS_SESSION_COOKIE,
				ServerErrorName.MISSING_OR_INVALID_SURVEY_COOKIE
			].includes(msg)
		) {
			return 'Sesja wygasła. Spróbuj jeszcze raz później.';
		}

		return 'Something went wrong.';
	}

	$: message = getMessage($page.error?.message || '');
</script>

<div class="app-section__narrow my-28">
	<h1 class="text-8xl font-bold">{$page.status}</h1>
	<p class="text-4xl font-bold">Ups! {message}</p>
</div>
