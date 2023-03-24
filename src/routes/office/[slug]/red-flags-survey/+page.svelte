<script lang="ts">
	import { page } from '$app/stores';
	import Checkbox from '$lib/components/inputs/Checkbox.svelte';
	import OfficePageTitle from '$lib/components/OfficePageTitle.svelte';
	import Button from '$lib/components/shared/Button.svelte';
	import {
		redFlagSectionsInOrder,
		redFlagToLabel
	} from '$lib/utils/redFlagUtils';

	export let data: {
		office: {
			slug: string;
			name: string;
			city: {
				name: string;
				countryAlpha2: string;
			};
		};
	};
</script>

<div class="app-section__narrow">
	<OfficePageTitle
		office={{
			name: data.office.name,
			city: data.office.city.name,
			country: data.office.city.countryAlpha2,
			subtitle: 'Survey',
			href: `/office/${data.office.slug}`
		}}
	/>

	<p>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
		quo necessitatibus laudantium sequi. Natus fugit aliquid hic, tempore
		dolore, iusto labore magni doloremque dolores, distinctio aspernatur.
		Provident, enim! Dicta, odio.
	</p>
	{#if $page.form?.success !== true}
		<form class="my-20" method="POST" action="?/submit-red-flag-survey">
			{#each redFlagSectionsInOrder as section}
				<div class="my-14">
					<h1 class="text-lg font-semibold mb-5">{section.label}</h1>
					<div class="grid grid-cols-3 gap-5">
						{#each section.flags as flag}
							<Checkbox name={flag} label={redFlagToLabel[flag]} />
						{/each}
					</div>
				</div>
			{/each}

			<div class="flex justify-center">
				<Button type="submit">Submit</Button>
			</div>
		</form>
	{:else}
		<div
			class="flex flex-wrap justify-between my-20 p-5 bg-zinc-700 text-white text-lg rounded"
		>
			<p>Thanks! Your form was submitted.</p>
			<a class="underline" href={`/office/${data.office.slug}`}>Go back.</a
			>
		</div>
	{/if}
</div>
