<script lang="ts">
	import { page } from '$app/stores';
	import FeedReviewItem from '$lib/components/feed/FeedReviewItem.svelte';
	import CommentForm from './CommentForm.svelte';
	import { appUser } from '$lib/stores/auth';

	export let data: {
		office: any;
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

<div class="app-section__narrow flex flex-col gap-10">
	<div class="my-16">
		<h1 class="text-4xl font-bold">
			{data.office.name}
		</h1>
		<b>{data.office.city.name}, {data.office.city.countryAlpha2}</b>
	</div>
	<!-- 
		TODO: add flags stats functionality
		
		<div class="flags-container">

		<div>
			<div class="flex justify-between py-2 border-b-2 border-black my-5">
				<h2 class="font-bold">Red Flags</h2>
				<div class="flex gap-1">
					<a class="font-bold" href="/">View All</a>
					<Arrow direction="right" />
				</div>
			</div>
			<ul class="flex justify-between">
				<li>flag: 1000</li>
				<li>flag: 1000</li>
				<li>flag: 1000</li>
			</ul>
		</div>
	</div> -->

	{#if $appUser}
		<div class="bg-zinc-50 p-10">
			{#if data.comments.length === 0}
				<div class="text-center my-5">There are no reviews here yet.</div>
			{/if}
			<CommentForm officeSlug={$page.params.slug} />
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
