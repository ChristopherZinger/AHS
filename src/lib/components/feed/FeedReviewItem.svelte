<script lang="ts">
	import CommentIcon from '$lib/components/icons/CommentIcon.svelte';
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
		subcomments: {
			createdAt: Date;
			content: string;
		}[];
	};

	let showSubcomments = false;
</script>

<div
	class="feed-review lg:px-16 lg:py-12 lg:border-2 lg:border-black lg:rounded-xl flex flex-col gap-y-12"
>
	<header
		class="flex justify-between border-b-2 border-black lg:border-none"
	>
		<div>
			<!-- <p class="flex gap-2 items-center text-s font-semibold underline">
				{data.officeName}, {data.city}<Arrow size="s" direction="right" />
			</p> -->
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

			<div class="flex gap-2 items-center">
				<CommentIcon />{data.subcomments.length}
			</div>
		</div>
		<div class="text-sm font-semibold">
			{dayjs(data.createdAt).format('D MMM YYYY')}
		</div>
	</section>

	<div>
		{#if $appUser}
			<SubcommentForm commentId={data.commentId} />
		{/if}
	</div>

	{#if showSubcomments}
		<div class="flex flex-col gap-5">
			{#each data.subcomments as subcomment}
				<div class="lg:grid lg:grid-cols-5 lg:gap-5">
					<div class="justify-self-end font-medium">
						{dayjs(subcomment.createdAt).format('D MMM YYYY')}
					</div>
					<div class="col-span-4">{subcomment.content}</div>
				</div>
			{/each}
		</div>
	{/if}

	{#if data.subcomments.length}
		<div class="flex justify-end">
			<button
				class="hover:underline font-medium"
				type="button"
				on:click={() => {
					showSubcomments = !showSubcomments;
				}}>{showSubcomments ? 'Hide resopnses' : 'Show resopnses'}</button
			>
		</div>
	{/if}
</div>
