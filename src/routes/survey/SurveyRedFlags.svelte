<script lang="ts">
	import Checkbox from '$lib/components/inputs/Checkbox.svelte';
	import { getRedFlagNameLabel } from '$lib/components/labels/RedFlagLabel.svelte';
	import { getRedFlagSectionNameLabel } from '$lib/components/labels/RedFlagSectionLabel.svelte';
	import { redFlagSectionsInOrder } from '$lib/utils/redFlagUtils';

	export let flagsToBoolean: Record<string, boolean>;
</script>

<div class="flex flex-col gap-10">
	{#each redFlagSectionsInOrder as section}
		<div>
			<h1 class="text-lg font-semibold mb-5">
				{getRedFlagSectionNameLabel(section.section)}
			</h1>
			<div class="grid md:grid-cols-3 gap-5">
				{#each section.flags as flag}
					<Checkbox
						name={flag}
						label={getRedFlagNameLabel(flag)}
						bind:value={flagsToBoolean[flag]}
					/>
				{/each}
			</div>
		</div>
	{/each}
</div>
