<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/shared/Button.svelte';
	import { ServerErrorName } from '$lib/utils/appError';

	let isLoading = false;
	let email = '';
	let errors: string[] = [];

	function handleEmailChange(email: string) {
		errors = [];
	}
	$: handleEmailChange(email);
</script>

<div class="app-section__narrow">
	<h1 class="text-4xl font-bold my-10">Subskrybuj</h1>
	<p>
		Checesz dowiedzieć się jakich biur unikać? Zapisz się na listę a
		powiadomimy cię kiedy portal ruszy w życie
	</p>

	<form
		method="POST"
		action="?/register-subscriber"
		use:enhance={() => {
			return ({ result }) => {
				if (result.type === 'success') {
					goto('/survey/thanks');
				} else if (result.type === 'error') {
					console.log(result.error);
					if (result.error.message === ServerErrorName.BAD_INPUT) {
						errors = ['Niepoprawny email.'];
					} else {
						errors = ['Ups! Coś poszło nie tak. Spróbuj później.'];
					}
				}
				isLoading = false;
			};
		}}
		class="flex flex-col gap-10 my-10"
	>
		<div class="flex gap-10">
			<!-- <label for="email">Email:</label> -->
			<input
				type="email"
				placeholder="Email"
				class="border-b-2 border-black grow p-3"
				bind:value={email}
				id="email"
				name="email"
				required
			/>
		</div>

		{#if errors.length}
			<ul class="text-red-600">
				{#each errors as err}
					<li>* {err}</li>
				{/each}
			</ul>
		{/if}

		<div class="grid grid-cols-3">
			<div />
			<Button disabled={isLoading} {isLoading} type="submit">
				Subskrybuj
			</Button>
			<div class="flex justify-end items-center">
				<a href="/survey/thanks">Pomiń &gt</a>
			</div>
		</div>
	</form>
</div>
