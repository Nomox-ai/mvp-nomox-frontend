<script lang="ts">
	import { fadeUp } from '$lib/actions/fade-up';

	export let eyebrow: string;
	export let title: string;
	export let subtitle: string;
	export let forLine: string | undefined = undefined;
</script>

<section class="border-border border-b">
	<div class="mx-auto max-w-section px-8 py-20 md:pb-24 md:pt-24">
		<p
			data-fade-up="pending"
			use:fadeUp
			class="text-primary mb-5 font-mono text-xs uppercase tracking-widest"
		>
			{eyebrow}
		</p>
		<h1
			data-fade-up="pending"
			use:fadeUp={{ delay: 60 }}
			class="text-foreground max-w-2xl text-5xl leading-[1.1] tracking-tight"
		>
			{title}
		</h1>
		<p
			data-fade-up="pending"
			use:fadeUp={{ delay: 140 }}
			class="text-muted-foreground mt-6 max-w-lg text-sm leading-relaxed"
		>
			{subtitle}
		</p>
		{#if forLine}
			<p class="text-muted-foreground mt-5 font-mono text-xs uppercase tracking-widest">
				{forLine}
			</p>
		{/if}
	</div>
</section>
