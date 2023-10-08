<script lang="ts">
	import { page } from '$app/stores';
	import FeedReviewItem from '$lib/components/feed/FeedReviewItem.svelte';
	import CommentForm from './CommentForm.svelte';
	import { appUser } from '$lib/stores/auth';
	import OfficePageTitle from '$lib/components/OfficePageTitle.svelte';
	// import { redFlagToLabel } from '$lib/utils/redFlagUtils';
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
		allFlags: number;
		didSubmitFlagsWithinPeriod: boolean;
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
		<div style="left" />

		{#if data.office.redFlagCounters.length}
			<ul class="flex justify-between items-center">
				<li class="flex flex-col gap-6 items-center  grow">
					<div class="text-5xl font-medium">
						{data.allFlags}
					</div>
					<p class="text-center">Red Flags in Total</p>
				</li>
				{#each data.office.redFlagCounters as counter}
					<li class="flex flex-col gap-6 items-center grow">
						<div class="text-5xl font-thin">
							{counter.counter}
						</div>
						<p class="text-center">
							<!-- {redFlagToLabel[counter.redFlagName]} -->
						</p>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="text-center">No red flags raised yet.</p>
		{/if}
		<div class="flex justify-center gap-5 my-10 ">
			{#if $appUser && !data.didSubmitFlagsWithinPeriod}
				<a
					href={`/office/${data.office.slug}/red-flags-survey`}
					class="py-2 px-3 text-white bg-zinc-700 rounded flex items-center"
					>Report Red Flags</a
				>
			{/if}
			<a
				href={`/office/${data.office.slug}/red-flags`}
				class="py-2 px-3 text-zinc-700 border-2 border-zinc-700 no  rounded flex items-center"
				>View All Red Flags</a
			>
		</div>
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
