<script lang="ts">
	import { clickOutside } from '$lib/actions/outclick';
	import CancelIcon from '$lib/components/icons/CancelIcon.svelte';

	export let officeSlug: string;

	let commentTitleInputValue = '';
	const commentTitleMaxLength = 90;

	let commentContentInputValue = '';
	const commentContentMaxLength = 4000;

	let isFocusIn = false;

	$: isOpen =
		commentTitleInputValue.length ||
		commentContentInputValue.length ||
		isFocusIn;
</script>

<form
	method="POST"
	action="?/create-comment"
	on:focusin={() => {
		isFocusIn = true;
	}}
	use:clickOutside={() => {
		isFocusIn = false;
	}}
>
	<input
		hidden
		type="text"
		name="officeSlug"
		id="officeSlug"
		value={officeSlug}
	/>

	<div class="form-grid">
		<div class="col-span-2 border-b-2 border-black">
			<label for="title" hidden>Title</label>
			<input
				type="text"
				placeholder="Write your story ..."
				name="title"
				id="title"
				maxlength={commentTitleMaxLength}
				class="py-2 w-full bg-transparent"
				bind:value={commentTitleInputValue}
			/>
		</div>

		{#if isOpen}
			<button
				on:click={() => {
					commentContentInputValue = '';
					commentTitleInputValue = '';
					isOpen = false;
					isFocusIn = false;
				}}
				type="reset"
				class="justify-self-end self-center"
			>
				<CancelIcon height="20px" />
			</button>
		{/if}
	</div>

	{#if isOpen}
		<div class="form-grid">
			<div class="col-start-2">
				<label hidden for="comment">Comment</label>
				<textarea
					class="bg-transparent rounded mt-10 p-2 w-full"
					placeholder="My story ..."
					name="content"
					id="comment"
					cols="30"
					rows="10"
					maxlength={commentContentMaxLength}
					bind:value={commentContentInputValue}
				/>
			</div>
		</div>

		<div class="form-grid">
			<div class="py-1 italic col-start-2">
				{commentContentMaxLength - commentContentInputValue.length} left
			</div>
		</div>

		<div class="form-grid">
			<div class="col-start-2 justify-self-end">
				<!-- TODO user Button component but first create style without border -->
				<button type="submit" class="text-lg font-medium">Submit</button>
			</div>
		</div>
	{/if}
</form>

<style>
	.form-grid {
		display: grid;
		grid-template-columns: 80px 1fr 80px;
	}
</style>
