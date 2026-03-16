<script lang="ts">
	import screenshot from '$lib/assets/screenshot_graphic.png';
</script>

<section class="border-border relative overflow-hidden border-b">
	<!--
		pb-0 on mobile: no bottom padding so the section's border-b lands flush
		with the cut edge of the screenshot. md:py-28 restores symmetry on desktop.
	-->
	<div class="mx-auto max-w-5xl px-8 pt-20 pb-0 md:py-28">

		<!-- Copy — natural width on desktop (screenshot is absolutely positioned), full width on mobile -->
		<div class="w-fit">
			<p class="text-primary mb-5 font-mono text-xs uppercase tracking-widest">
				Semantic data catalog · Early access
			</p>
			<h1 class="text-foreground text-5xl font-semibold leading-[1.1] tracking-tight md:text-6xl">
				Understand your data.<br />Automatically.
			</h1>
			<p class="text-muted-foreground mt-6 max-w-md text-sm leading-relaxed">
				Nomox indexes your data sources, infers business semantics with AI, and exposes a
				structured catalog to your team and AI tools.
			</p>
			<div class="mt-10 flex items-center gap-4">
				<a
					href="/waitlist"
					class="waitlist-btn bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
				>
					Request Demo
				</a>
				<a
					href="#how-it-works"
					class="text-muted-foreground hover:text-foreground text-sm transition-colors"
				>
					How it works ↓
				</a>
			</div>
		</div>

		<!--
			Mobile screenshot — full natural width/height ratio, top 70% visible.

			Technique: padding-top on the container creates a box whose height =
			30% of its own width. The screenshot is ~2.35:1, so its natural height
			= width / 2.35 ≈ 42.6% of width. The container shows
			30% / 42.6% ≈ 70% of the image before overflow:hidden clips the rest.
			With pb-0 on the parent, the section border-b lands right at this edge.
		-->
		<div
			class="border-border relative mt-10 overflow-hidden rounded-t-xl border-l border-r border-t shadow-2xl shadow-black/10 md:hidden"
			style="padding-top: 40%;"
		>
			<img
				src={screenshot}
				alt="Nomox admin console"
				class="absolute left-0 top-0 w-full"
				draggable="false"
			/>
		</div>

	</div>

	<!-- Desktop: screenshot absolutely positioned, bleeds right and below section border -->
	<div
		class="border-border absolute hidden overflow-hidden rounded-tl-xl border-l border-t shadow-2xl shadow-black/10 md:block"
		style="top: 6.5rem; left: 65%; right: 0; bottom: -3.5rem;"
	>
		<img
			src={screenshot}
			alt="Nomox admin console"
			class="block h-full w-full object-cover object-left-top"
			draggable="false"
		/>
	</div>
</section>
