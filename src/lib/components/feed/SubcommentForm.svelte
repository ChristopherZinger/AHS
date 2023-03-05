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

	<textarea
		placeholder="Respond to this comment ..."
		name="content"
		id="subcomment-input"
		maxlength="1500"
		minlength="2"
		rows={nrOfColumns}
		class="border-b-2 border-black w-full outline-none"
		bind:value
	/>

	{#if isActive}
		<div class="flex justify-between">
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
	{/if}
</form>
