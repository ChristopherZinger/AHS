<script lang="ts">
	import InputText from '$lib/components/shared/InputText.svelte';
	import JumpingLabel from '$lib/components/shared/JumpingLabel.svelte';

	export let setTitle: (title: string) => void;
	export let setStory: (title: string) => void;
	export let initialTitle: string = '';
	export let initialStory: string = '';
</script>

<JumpingLabel label="Tytul" forHTML="title">
	<InputText
		name="title"
		onChange={setTitle}
		type="text"
		value={initialTitle}
		id="title"
	/>
</JumpingLabel>

<div>
	<label for="story">Story:</label>
	<textarea
		name="story"
		id=""
		cols="30"
		rows="10"
		class="w-full"
		value={initialStory}
		on:input={({ currentTarget }) => {
			setStory(currentTarget.value);
		}}
	/>
</div>
