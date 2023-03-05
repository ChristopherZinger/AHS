<script lang="ts">
	// import CommentIcon from '$lib/components/icons/CommentIcon.svelte';
	import Arrow from '$lib/components/shared/Arrow.svelte';
	import { appUser } from '$lib/stores/auth';
	import dayjs from 'dayjs';
	import SubcommentForm from './SubcommentForm.svelte';

	export let data: {
		commentId: string;
		city: string;
		officeName: string;
		title: string;
		content: string;
		createdAt: Date;
	};
</script>

<div
	class="feed-review lg:px-16 lg:py-12 lg:border-2 lg:border-black lg:rounded-xl flex flex-col gap-y-12"
>
	<header class="flex justify-between">
		<div>
			<p class="flex gap-2 items-center text-s font-semibold underline">
				{data.officeName}, {data.city}<Arrow size="s" direction="right" />
			</p>
			<p />
			<h1 class="text-2xl font-bold">{data.title}</h1>
		</div>

		<!-- 

			TODO: Add upvote and downvote arrows functionality
			
			<div class="flex gap-2">
			
			<div class="flex gap-2 items-end">
				up <Arrow direction="up" size="l" hasBorder={true} />
			</div>
			<div class="flex gap-2 items-end">
				<Arrow direction="down" size="l" hasBorder={true} />down
			</div>
		</div> -->
	</header>

	<main>
		{data.content}
	</main>

	<section class="flex justify-between">
		<div class="flex gap-x-10 text-sm font-semibold">
			<!-- 
				TODO: add upvote and downwote counter functionallity
			<div class="flex gap-2 items-center">
				<Arrow size="s" direction="up" /> 20
			</div>
			<div class="flex gap-2 items-center">
				<Arrow size="s" direction="down" />100
			</div> 
			-->

			<!-- 
				TODO: Add count subcomments functionallity
				<div class="flex gap-2 items-center"><CommentIcon />5</div> 
			-->
		</div>
		<div class="text-sm font-semibold">
			{dayjs(data.createdAt).format('D MMM YYYY')}
		</div>
	</section>

	<section class="subcomments">
		{#if $appUser}
			<SubcommentForm commentId={data.commentId} />
		{/if}
	</section>
</div>
