<script lang="ts">
	import { page } from '$app/stores';
	import FeedReviewItem from '$lib/components/feed/FeedReviewItem.svelte';
	import CommentForm from './CommentForm.svelte';
	import { appUser } from '$lib/stores/auth';
	import dayjs from 'dayjs';

	export let data: {
		office: any;
		comments: {
			title: string;
			content: string;
			createdAt: Date;
		}[];
	};

	console.log(
		data.comments.map((c) => dayjs(c.createdAt).format('D MMM YYYY'))
	);
</script>

<div class="app-section__narrow flex flex-col gap-10">
	<div class="my-16">
		<h1 class="text-4xl font-bold">
			{data.office.name}: <span class="font-extralight">Feed</span>
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
		<div>
			<CommentForm officeSlug={$page.params.slug} />
		</div>
	{/if}

	<div>
		<div class="flex flex-col gap-y-12">
			{#each data.comments as comment}
				<FeedReviewItem
					data={{
						city: data.office.city.name,
						officeName: data.office.name,
						...comment,
						title:
							'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolo'
					}}
				/>
			{/each}
		</div>
	</div>
</div>
