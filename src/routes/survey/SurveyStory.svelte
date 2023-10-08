<script lang="ts">
	import InputText from '$lib/components/shared/InputText.svelte';
	import JumpingLabel from '$lib/components/shared/JumpingLabel.svelte';

	export let setTitle: (title: string) => void;
	export let setStory: (title: string) => void;
	export let initialTitle: string = '';
	export let initialStory: string = '';
</script>

<JumpingLabel label="W kilku słowach:" forHTML="title">
	<InputText
		name="title"
		placeholder={`np.  “W biurze panuje okropna atmosfera!” albo “Pracowałam na ciekawymi projektami”`}
		onChange={setTitle}
		type="text"
		value={initialTitle}
		id="title"
	/>
</JumpingLabel>

<div>
	<label for="story">Rozwiń swoją opinię:</label>
	<textarea
		class="bg-slate-100 w-full p-4 my-2 rounded-xl"
		name="story"
		id=""
		cols="30"
		rows="10"
		value={initialStory}
		placeholder="Możesz opisać: atmosferę pracy, stosunek do pracownika, możliwości rozwoju zawodowego, problemy związane z wynagrodzeniem, dyskryminacją itp."
		on:input={({ currentTarget }) => {
			setStory(currentTarget.value);
		}}
	/>
</div>
