<script lang="ts">
	import { fadeUp } from '$lib/actions/fade-up';

	export type FeatureTile = {
		label: string;
		desc: string;
		href: string; // product page anchor
		productName: string;
	};

	export let eyebrow: string = "In Nomox";
	export let tiles: FeatureTile[];
</script>

<!--
  2×2 grid of clickable feature tiles.
  Each tile links to the relevant section of the product page.
  Designed to sit below solution-problems as a "what you get" bridge.
-->
<section class="border-border border-b">
	<div class="mx-auto max-w-7xl px-8 py-14">
		<p
			class="text-muted-foreground mb-8 font-mono text-xs uppercase tracking-widest"
		>
			{eyebrow}
		</p>
		<div
			class="grid grid-cols-1 gap-px sm:grid-cols-2 border-border overflow-hidden rounded-lg border"
		>
			{#each tiles as tile, i}
				<a
				data-fade-up="pending"
				use:fadeUp={{ delay: i * 80 }}
					href={tile.href}
					class="group bg-background hover:bg-muted/40 flex flex-col gap-4 p-8 transition-colors"
				>
					<div class="flex-1">
						<p
							class="text-foreground text-sm font-semibold group-hover:text-primary transition-colors"
						>
							{tile.label}
						</p>
						<p
							class="text-muted-foreground mt-1.5 text-xs leading-relaxed"
						>
							{tile.desc}
						</p>
					</div>
					<span
						class="text-primary font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity"
					>
						See in {tile.productName} →
					</span>
				</a>
			{/each}
		</div>
	</div>
</section>
