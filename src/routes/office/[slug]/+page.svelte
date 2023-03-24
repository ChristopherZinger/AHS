<script lang="ts">
	import { page } from '$app/stores';
	import FeedReviewItem from '$lib/components/feed/FeedReviewItem.svelte';
	import CommentForm from './CommentForm.svelte';
	import { appUser } from '$lib/stores/auth';
	import Arrow from '$lib/components/shared/Arrow.svelte';
	import OfficePageTitle from '$lib/components/OfficePageTitle.svelte';
	import { redFlagToLabel } from '$lib/utils/redFlagUtils';
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
		comments: {
			id: string;
			title: string;
			content: string;
			createdAt: Date;
			subcomments: {
				content: string;
				createdAt: Date;
			}[];
		}[];
	};
</script>

<div class="app-section__narrow">
	<OfficePageTitle
		office={{
			name: data.office.name,
			city: data.office.city.name,
			country: data.office.city.countryAlpha2,
			subtitle: 'Reviews',
			href: `/office/${data.office.slug}`
		}}
	/>

	<div class="my-20">
		<div class="flex justify-between py-2 border-b-2 border-black my-5">
			<h2 class="font-bold">Red Flags</h2>
			<div class="flex gap-1">
				<a class="font-bold" href={`/office/${data.office.slug}/red-flags`}
					>View All</a
				>
				<Arrow direction="right" />
			</div>
		</div>

		{#if data.office.redFlagCounters.length}
			<ul class="flex justify-between">
				{#each data.office.redFlagCounters as counter}
					<li class="flex gap-2">
						<span class="font-semibold">
							{counter.counter}
						</span>
						{redFlagToLabel[counter.redFlagName]}
					</li>
				{/each}
			</ul>
		{:else}
			<p class="text-center">No red flags raised yet.</p>
		{/if}
	</div>

	{#if $appUser}
		<div class="bg-zinc-50 p-10 my-20">
			{#if data.comments.length === 0}
				<div class="text-center my-5">There are no reviews here yet.</div>
			{/if}
			<CommentForm
				office={{ slug: $page.params.slug, name: data.office.name }}
			/>
		</div>
	{/if}

	<div class="flex flex-col gap-y-20">
		{#each data.comments as comment}
			<FeedReviewItem
				data={{
					city: data.office.city.name,
					officeName: data.office.name,
					...comment,
					commentId: comment.id
				}}
			/>
		{/each}
	</div>
</div>
