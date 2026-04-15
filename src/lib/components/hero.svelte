<script lang="ts">
	import { fadeUp } from "$lib/actions/fade-up";
	import HeroScreenshot from "./hero-screenshot.svelte";
	import VideoDemo from "./video-demo.svelte";
</script>

<section class="border-border border-b bg-[#fcfcfc]">
	<div class="mx-auto max-w-section px-8 pt-20 pb-20 md:pt-20">
		<div class="mx-auto max-w-2xl text-center">
			<p
				data-fade-up="pending"
				use:fadeUp={{ delay: 0 }}
				class="text-primary mb-5 font-mono text-xs uppercase tracking-widest"
			>
				Semantic data catalog · Early access
			</p>
			<h1
				data-fade-up="pending"
				use:fadeUp={{ delay: 80 }}
				class="text-foreground text-5xl leading-[1.1] tracking-tight md:text-6xl"
			>
				Navigate your data.<br />Automatically.
			</h1>
			<p
				data-fade-up="pending"
				use:fadeUp={{ delay: 160 }}
				class="text-foreground mt-6 text-sm leading-relaxed"
			>
				Nomox indexes your data sources, infers business semantics with
				AI, and exposes a structured catalog to your team and AI tools.
			</p>
			<div
				data-fade-up="pending"
				use:fadeUp={{ delay: 240 }}
				class="mt-10 flex items-center justify-center gap-4"
			>
				<a
					href="/try-it"
					class="waitlist-btn bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
				>
					Get started
				</a>
				<a
					href="#how-it-works"
					class="text-muted-foreground hover:text-foreground text-sm transition-colors"
				>
					How it works ↓
				</a>
			</div>
		</div>

		<!-- <HeroScreenshot /> -->
		<div
			data-fade-up="pending"
			use:fadeUp={{ delay: 360, y: 40 }}
			class="mt-14 overflow-hidden rounded-[4px] md:rounded-[12px] ring-1 ring-black/8"
		>
			<VideoDemo />
		</div>
	</div>
</section>
