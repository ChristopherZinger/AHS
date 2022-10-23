<script lang="ts">
	import FeedReviewItem from './FeedReviewItem.svelte';
</script>

<div class="feed-container flex flex-col gap-y-12">
	<FeedReviewItem />
	<FeedReviewItem />
	<FeedReviewItem />
	<FeedReviewItem />
</div>

<style>
	.feed-container {
		max-width: 890px;
	}
</style>
