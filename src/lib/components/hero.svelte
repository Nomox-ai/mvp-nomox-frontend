<script lang="ts">
	import { fadeUp } from "$lib/actions/fade-up";
	import VideoDemo from "./video-demo.svelte";
	import { onMount } from "svelte";

	let underlineDrawn = false;

	// Programmatic radial dot pattern — opacity falls off with distance from the
	// top-center of the area, producing a "gradient of dots" without any CSS gradient.
	const DOT_COLS = 56;
	const DOT_ROWS = 28;
	const DOT_SPACING = 18;
	const DOT_WIDTH = (DOT_COLS - 1) * DOT_SPACING;
	const DOT_HEIGHT = (DOT_ROWS - 1) * DOT_SPACING;
	const dots: { x: number; y: number; opacity: number }[] = [];
	{
		const cx = DOT_WIDTH / 2;
		const cy = DOT_HEIGHT * 0.15; // anchor focal point near the top
		const maxDist = DOT_WIDTH * 0.55;
		for (let i = 0; i < DOT_COLS; i++) {
			for (let j = 0; j < DOT_ROWS; j++) {
				const x = i * DOT_SPACING;
				const y = j * DOT_SPACING;
				const dx = x - cx;
				const dy = (y - cy) * 1.25; // squish vertically so the falloff feels balanced
				const d = Math.sqrt(dx * dx + dy * dy);
				const t = Math.max(0, 1 - d / maxDist);
				const opacity = t * t * 0.28; // ease-out, toned down
				if (opacity > 0.01) dots.push({ x, y, opacity });
			}
		}
	}

	onMount(() => {
		const t = setTimeout(() => (underlineDrawn = true), 600);
		return () => clearTimeout(t);
	});
</script>

<section class="hero-wrap relative overflow-hidden border-b border-border">
	<!-- Radial dot cluster — opacity per dot creates a natural fade -->
	<svg
		class="hero-dots"
		viewBox="0 0 {DOT_WIDTH} {DOT_HEIGHT}"
		preserveAspectRatio="xMidYMin slice"
		aria-hidden="true"
	>
		{#each dots as d}
			<circle cx={d.x} cy={d.y} r="1" fill="#0a0a0f" opacity={d.opacity} />
		{/each}
	</svg>

	<div class="relative mx-auto max-w-section px-8 pt-12 pb-24 md:pt-14">
		<div class="mx-auto max-w-3xl text-center">
			<!-- Status pill with live pulse -->
			<div
				data-fade-up="pending"
				use:fadeUp={{ delay: 0 }}
				class="mb-7 inline-flex items-center gap-2.5 rounded-full border border-border bg-background px-3 py-1.5"
			>
				<span class="relative flex size-1.5">
					<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
					<span class="relative inline-flex size-1.5 rounded-full bg-emerald-500"></span>
				</span>
				<span class="text-primary font-mono text-[10px] uppercase tracking-widest">
					Semantic data catalog · Early access
				</span>
			</div>

			<h1
				data-fade-up="pending"
				use:fadeUp={{ delay: 80 }}
				class="text-foreground text-5xl leading-[1.05] tracking-tight md:text-7xl"
			>
				Navigate your data.<br />
				<span class="hero-accent">
					Automatically.
					<!-- Hand-drawn underline that animates in -->
					<svg
						class="hero-underline"
						viewBox="0 0 320 14"
						preserveAspectRatio="none"
						aria-hidden="true"
					>
						<path
							class="hero-underline-path"
							class:drawn={underlineDrawn}
							d="M4 9 C 60 3, 120 11, 180 6 S 280 9, 316 5"
							fill="none"
							stroke="#2d2df6"
							stroke-width="3"
							stroke-linecap="round"
						/>
					</svg>
				</span>
			</h1>

			<p
				data-fade-up="pending"
				use:fadeUp={{ delay: 160 }}
				class="text-muted-foreground mx-auto mt-7 max-w-xl text-base leading-relaxed"
			>
				Nomox indexes your data sources, infers business semantics with
				AI, and exposes a structured catalog to your team and AI tools.
			</p>

			<div
				data-fade-up="pending"
				use:fadeUp={{ delay: 240 }}
				class="mt-10 flex items-center justify-center gap-5"
			>
				<a
					href="/try-it"
					class="waitlist-btn group bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-medium transition-all"
				>
					Get started
					<span class="transition-transform group-hover:translate-x-0.5">→</span>
				</a>
				<a
					href="#how-it-works"
					class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
				>
					How it works
					<span class="text-[10px]">↓</span>
				</a>
			</div>
		</div>

		<!-- Stylized video frame with browser chrome + floating badges -->
		<div
			data-fade-up="pending"
			use:fadeUp={{ delay: 360, y: 40 }}
			class="hero-frame mx-auto mt-16 max-w-6xl"
		>
			<div class="hero-frame-inner">
				<!-- Browser-like chrome bar -->
				<div class="flex items-center gap-2 border-b border-black/8 bg-white px-4 py-2.5">
					<span class="size-2.5 rounded-full bg-red-400/70"></span>
					<span class="size-2.5 rounded-full bg-amber-400/70"></span>
					<span class="size-2.5 rounded-full bg-emerald-400/70"></span>
					<div class="mx-auto flex items-center gap-1.5 rounded-md border border-black/8 bg-white px-2.5 py-0.5">
						<span class="size-1 rounded-full bg-emerald-500"></span>
						<span class="font-mono text-[10px] tracking-wider text-foreground/60">app.get-nomox.com/catalog</span>
					</div>
					<span class="w-12"></span>
				</div>

				<div class="overflow-hidden">
					<VideoDemo />
				</div>
			</div>

			<!-- Floating metric badges -->
			<div class="hero-badge hero-badge-left" aria-hidden="true">
				<div class="flex items-center gap-2">
					<span class="relative flex size-1.5">
						<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60"></span>
						<span class="relative inline-flex size-1.5 rounded-full bg-emerald-500"></span>
					</span>
					<span class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Indexing</span>
				</div>
				<p class="mt-1.5 font-mono text-base font-medium tabular-nums text-foreground leading-none">
					1,248 <span class="text-muted-foreground text-xs font-normal">cols</span>
				</p>
			</div>

			<div class="hero-badge hero-badge-right" aria-hidden="true">
				<div class="flex items-center gap-2">
					<span class="size-1.5 rounded-full bg-primary"></span>
					<span class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Confidence</span>
				</div>
				<p class="mt-1.5 font-mono text-base font-medium tabular-nums text-foreground leading-none">
					96<span class="text-muted-foreground text-xs font-normal">% avg.</span>
				</p>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-wrap {
		background-color: #fcfcfc;
	}

	/* Radial dot cluster — sits behind the top-center of the hero */
	.hero-dots {
		position: absolute;
		left: 50%;
		top: 0;
		transform: translateX(-50%);
		width: min(1080px, 100%);
		height: 520px;
		pointer-events: none;
		z-index: 0;
		overflow: visible;
	}

	/* "Automatically." accent — hand-drawn underline */
	.hero-accent {
		position: relative;
		display: inline-block;
		color: #2d2df6;
		font-weight: 500;
		padding-bottom: 0.12em;
	}
	.hero-underline {
		position: absolute;
		left: -2%;
		right: -2%;
		bottom: -0.05em;
		width: 104%;
		height: 0.32em;
		overflow: visible;
	}
	.hero-underline-path {
		stroke-dasharray: 380;
		stroke-dashoffset: 380;
		transition: stroke-dashoffset 1.1s cubic-bezier(0.65, 0, 0.35, 1);
	}
	.hero-underline-path.drawn {
		stroke-dashoffset: 0;
	}

	/* Video frame — solid colors only */
	.hero-frame {
		position: relative;
		padding: 6px;
		border-radius: 18px;
		background: #ffffff;
		border: 1px solid rgba(0, 0, 0, 0.08);
		box-shadow:
			0 1px 0 rgba(255, 255, 255, 0.5) inset,
			0 30px 60px -30px rgba(0, 0, 0, 0.18),
			0 10px 30px -15px rgba(0, 0, 0, 0.10);
	}
	.hero-frame-inner {
		position: relative;
		overflow: hidden;
		border-radius: 12px;
		background: white;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06);
	}

	/* Floating metric badges */
	.hero-badge {
		position: absolute;
		display: none;
		background: white;
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 12px;
		padding: 10px 14px;
		min-width: 132px;
		box-shadow:
			0 10px 22px -10px rgba(0, 0, 0, 0.12),
			0 2px 6px rgba(0, 0, 0, 0.04);
		animation: badge-float 6s ease-in-out infinite alternate;
		z-index: 2;
	}
	@media (min-width: 1024px) {
		.hero-badge { display: block; }
	}
	.hero-badge-left {
		left: -28px;
		top: 28%;
		animation-delay: 0s;
	}
	.hero-badge-right {
		right: -28px;
		top: 58%;
		animation-delay: 1.5s;
	}
	@keyframes badge-float {
		from { transform: translateY(0px); }
		to { transform: translateY(-10px); }
	}
</style>
