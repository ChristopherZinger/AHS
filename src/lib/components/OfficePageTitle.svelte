<script lang="ts">
	export let office: {
		name: string;
		city: string;
		country: string;
		href: string;
		subtitle?: string;
	};
</script>

<div class="my-16">
	<h1 class="text-4xl font-bold">
		<a href={office.href}>
			{office.name}
		</a>
		{#if office.subtitle}
			<span class="font-thin"> / {office.subtitle}</span>
		{/if}
	</h1>
	<b>{office.city}, {office.country}</b>
</div>
