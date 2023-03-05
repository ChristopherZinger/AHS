<script lang="ts">
	import { page } from '$app/stores';
	import { clickOutside } from '$lib/actions/outclick';
	import CancelIcon from '../icons/CancelIcon.svelte';

	export let commentId: string;

	let value = '';
	let isFocused = false;

	$: isActive = value.length || isFocused;
	$: nrOfColumns = value.length > 15 ? 5 : 1;
	$: officeSlug = $page.params.slug;
</script>

<form
	method="POST"
	action={`/office/${officeSlug}?/create-subcomment`}
	on:focusin={() => {
		isFocused = true;
	}}
	use:clickOutside={() => {
		isFocused = false;
	}}
>
	<input type="text" name="parentCommentId" hidden value={commentId} />

	<div class="grid grid-cols-5 gap-5">
		<textarea
			placeholder="Respond to this comment ..."
			name="content"
			id="subcomment-input"
			maxlength="1500"
			minlength="2"
			rows={nrOfColumns}
			class="border-b-2 border-black w-full outline-none col-start-2 col-span-5"
			bind:value
		/>
	</div>

	{#if isActive}
		<div class="grid grid-cols-5 gap-5 mt-5">
			<div class="flex justify-between col-start-2 col-span-5">
				<button
					type="reset"
					on:click={() => {
						value = '';
						isFocused = false;
					}}
					class="flex items-center gap-1 "
				>
					Cancel
					<CancelIcon />
				</button>

				<button type="submit">Submit</button>
			</div>
		</div>
	{/if}
</form>
