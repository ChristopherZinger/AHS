<script lang="ts">
	import FeedItem from './FeedItem.svelte';
	import CommentIcon from '$lib/components/icons/CommentIcon.svelte';
	import Arrow from '$lib/components/shared/Arrow.svelte';

	export let data: {
		city: 'Rotterdam';
		officeName: 'OMA';
		title: 'Nice Job';
		content: 'lorem ipsum';
	};
</script>

<FeedItem>
	<header class="flex justify-between">
		<div>
			<p class="flex gap-2 items-center text-s font-semibold underline">
				{data.officeName}, {data.city}<Arrow size="s" direction="right" />
			</p>
			<p />
			<h1 class="text-2xl font-bold">{data.title}</h1>
		</div>
		<div class="flex gap-2">
			<div class="flex gap-2 items-end">
				up <Arrow direction="up" size="l" hasBorder={true} />
			</div>
			<div class="flex gap-2 items-end">
				<Arrow direction="down" size="l" hasBorder={true} />down
			</div>
		</div>
	</header>

	<main>
		{data.content}
	</main>

	<section class="flex justify-between">
		<div class="flex gap-x-10 text-sm font-semibold">
			<div class="flex gap-2 items-center">
				<Arrow size="s" direction="up" /> 20
			</div>
			<div class="flex gap-2 items-center">
				<Arrow size="s" direction="down" />100
			</div>
			<div class="flex gap-2 items-center"><CommentIcon />5</div>
		</div>
		<div class="text-sm font-semibold">12 sept 2020</div>
	</section>

	<section />
</FeedItem>
