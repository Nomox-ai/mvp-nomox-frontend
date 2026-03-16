<script lang="ts">
	export let eyebrow: string;
	export let title: string;
	export let subtitle: string;
</script>

<section class="border-border border-b">
	<div class="mx-auto max-w-5xl px-8 py-20 md:py-24">
		<p
			class="text-primary mb-5 font-mono text-xs tracking-widest uppercase"
		>
			{eyebrow}
		</p>
		<h2
			class="text-foreground text-5xl font-semibold tracking-tight leading-[1.1] md:text-5xl"
		>
			{title}
		</h2>
		<p class="text-muted-foreground max-w-lg mt-6 text-sm leading-relaxed">
			{subtitle}
		</p>
	</div>
</section>
