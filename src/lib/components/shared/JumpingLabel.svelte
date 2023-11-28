<script lang="ts">
	export let label: string | undefined;
	export let forHTML: string;
</script>

<div class="relative">
	<label class="left-0" for={forHTML}>
		<slot name="label">
			{label || ''}
		</slot>
	</label>
	<slot />
</div>
