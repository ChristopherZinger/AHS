<script lang="ts">
	import OfficePageTitle from '$lib/components/OfficePageTitle.svelte';
	import Arrow from '$lib/components/shared/Arrow.svelte';
	import {
		redFlagSectionsInOrder,
		redFlagToLabel
	} from '$lib/utils/redFlagUtils';
	import type { RedFlag } from '@prisma/client';

	export let data: {
		office: {
			name: string;
			slug: string;
			city: {
				name: string;
				countryAlpha2: string;
			};
			redFlagCounters: {
				redFlagName: RedFlag;
				counter: number;
			}[];
		};
	};

	const existingRedFlagsInSectionsInOrder = redFlagSectionsInOrder.reduce(
		(
			acc: {
				label: string;
				flags: { counter: number; redFlagName: RedFlag }[];
			}[],
			section
		) => {
			const redFlagCounters = data.office.redFlagCounters.filter((f) =>
				section.flags.includes(f.redFlagName)
			);

			if (redFlagCounters.length) {
				acc.push({
					label: section.label,
					flags: redFlagCounters
				});
			}

			return acc;
		},
		[]
	);
</script>

<div class="app-section__narrow">
	<div class="flex justify-between items-center">
		<OfficePageTitle
			office={{
				name: data.office.name,
				city: data.office.city.name,
				country: data.office.city.countryAlpha2,
				subtitle: 'Red Flags',
				href: `/office/${data.office.slug}`
			}}
		/>
		<div class="flex gap-2 items-center underline font-medium">
			<Arrow direction="left" />
			<a href={`/office/${data.office.slug}`}>go back</a>
		</div>
	</div>

	<div class="my-10">
		<p>
			This is red flag report page. Here you can see what kinds of
			suspicious behaviour was noticed or experienced by people who worked
			for <span class="font-medium underline">{data.office.name}</span>.
			Always check this page before you apply for a new job. Be aware what
			awaits you in new job.
		</p>
	</div>

	<ul>
		{#each existingRedFlagsInSectionsInOrder as section}
			<div class="mb-10">
				<h5 class="text-lg font-bold mb-5">{section.label}</h5>
				<div class="grid gap-5 grid-cols-3">
					{#each section.flags as flag}
						<li class="flex gap-8">
							<span class="font-bold">
								{flag.counter}
							</span>
							{redFlagToLabel[flag.redFlagName]}
						</li>
					{/each}
				</div>
			</div>
		{/each}
	</ul>
</div>
