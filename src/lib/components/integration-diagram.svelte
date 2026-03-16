<!--
  Two responsive layouts driven by container width:
    mobile     (< 560 px): compact icon cards scattered around centred hub
    horizontal (≥ 560 px): full cards side by side

  Lines are drawn dynamically via rAF + getBoundingClientRect so they always
  connect to the actual animated positions of each element and the hub.
-->
<style>
	@keyframes float-card {
		0%   { transform: translate( 0px,  0px); }
		25%  { transform: translate( 1px, -2px); }
		50%  { transform: translate( 0px, -3px); }
		75%  { transform: translate(-1px, -2px); }
		100% { transform: translate( 0px,  0px); }
	}
	.float-card {
		animation-name: float-card;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}

	@keyframes dash-flow {
		from { stroke-dashoffset: 20; }
		to   { stroke-dashoffset: 0; }
	}
	.dash-flow {
		animation-name: dash-flow;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		will-change: stroke-dashoffset;
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import PostgresqlIcon from '$lib/assets/icons/postgresql-icon.svelte';
	import MongodbIcon from '$lib/assets/icons/mongodb-icon.svelte';
	import GoogleSheetsIcon from '$lib/assets/icons/google-sheets-icon.svelte';
	import SnowflakeIcon from '$lib/assets/icons/snowflake.svelte';
	import McpIcon from '$lib/assets/icons/mcp.svelte';
	import BookOpenIcon from '@lucide/svelte/icons/book-open';
	import Layers2Icon from '@lucide/svelte/icons/layers-2';
	import logo from '$lib/assets/logo.svg';

	let container: HTMLElement;
	let containerWidth = 0;
	$: mobile = containerWidth > 0 && containerWidth < 480;

	let hubEl: HTMLElement;
	let srcCard0: HTMLElement;
	let srcCard1: HTMLElement;
	let srcCard2: HTMLElement;
	let srcCard3: HTMLElement;
	let outCard0: HTMLElement;
	let outCard1: HTMLElement;
	let outCard2: HTMLElement;

	let sp0 = '', sp1 = '', sp2 = '', sp3 = '';
	let op0 = '', op1 = '', op2 = '';
	let dotCx = 0, dotCy = 0;

	function relPos(el: HTMLElement) {
		const er = el.getBoundingClientRect();
		const cr = container.getBoundingClientRect();
		return {
			left:   er.left   - cr.left,
			right:  er.right  - cr.left,
			top:    er.top    - cr.top,
			bottom: er.bottom - cr.top,
			cx:     er.left   + er.width  / 2 - cr.left,
			cy:     er.top    + er.height / 2 - cr.top,
		};
	}

	// Quadratic bezier bowed perpendicular to the line.
	// The hub end is pulled back by `hubOffset` px so lines stop near the hub edge.
	function curveQ(
		x1: number, y1: number, x2: number, y2: number,
		bow: number, hubOffset = 0
	): string {
		let ex = x2, ey = y2;
		if (hubOffset > 0) {
			const dx = x1 - x2, dy = y1 - y2;
			const len = Math.sqrt(dx * dx + dy * dy) || 1;
			ex = x2 + (dx / len) * hubOffset;
			ey = y2 + (dy / len) * hubOffset;
		}
		const mx  = (x1 + ex) / 2;
		const my  = (y1 + ey) / 2;
		const dx  = ex - x1;
		const dy  = ey - y1;
		const len = Math.sqrt(dx * dx + dy * dy) || 1;
		return `M ${x1} ${y1} Q ${mx + (-dy / len) * bow} ${my + (dx / len) * bow} ${ex} ${ey}`;
	}

	// Horizontal cubic bezier — asymmetric control points per line
	function curveH(
		x1: number, y1: number, x2: number, y2: number,
		cx1f: number, cy1: number, cx2f: number, cy2: number
	): string {
		const dx = x2 - x1;
		return `M ${x1} ${y1} C ${x1 + dx * cx1f} ${y1 + cy1} ${x1 + dx * cx2f} ${y2 + cy2} ${x2} ${y2}`;
	}

	// Hub edge offset for mobile lines (hub logo is size-12 = 48px, radius ≈ 24px)
	const HUB_R = 22;

	onMount(() => {
		let rafId: number;
		function tick() {
			if (container && hubEl) {
				const hub = relPos(hubEl);
				dotCx = hub.cx;
				dotCy = hub.cy;

				if (mobile) {
					if (srcCard0) { const c = relPos(srcCard0); sp0 = curveQ(c.cx, c.cy, hub.cx, hub.cy, -22, HUB_R); }
					if (srcCard1) { const c = relPos(srcCard1); sp1 = curveQ(c.cx, c.cy, hub.cx, hub.cy,  10, HUB_R); }
					if (srcCard2) { const c = relPos(srcCard2); sp2 = curveQ(c.cx, c.cy, hub.cx, hub.cy,  -7, HUB_R); }
					if (srcCard3) { const c = relPos(srcCard3); sp3 = curveQ(c.cx, c.cy, hub.cx, hub.cy,  19, HUB_R); }
					if (outCard0) { const c = relPos(outCard0); op0 = curveQ(hub.cx, hub.cy, c.cx, c.cy,  14, HUB_R); }
					if (outCard1) { const c = relPos(outCard1); op1 = curveQ(hub.cx, hub.cy, c.cx, c.cy, -20, HUB_R); }
					if (outCard2) { const c = relPos(outCard2); op2 = curveQ(hub.cx, hub.cy, c.cx, c.cy,  -5, HUB_R); }
				} else {
					// card right-center → hub center
					if (srcCard0) { const c = relPos(srcCard0); sp0 = curveH(c.right, c.cy, hub.cx, hub.cy,  0.55,  -8, 0.42,  6); }
					if (srcCard1) { const c = relPos(srcCard1); sp1 = curveH(c.right, c.cy, hub.cx, hub.cy,  0.40,   0, 0.60,  0); }
					if (srcCard2) { const c = relPos(srcCard2); sp2 = curveH(c.right, c.cy, hub.cx, hub.cy,  0.50,  12, 0.38, -5); }
					if (srcCard3) { const c = relPos(srcCard3); sp3 = curveH(c.right, c.cy, hub.cx, hub.cy,  0.35,   7, 0.55, -9); }
					// hub center → card left-center
					if (outCard0) { const c = relPos(outCard0); op0 = curveH(hub.cx, hub.cy, c.left, c.cy,  0.45,  -7, 0.58,  9); }
					if (outCard1) { const c = relPos(outCard1); op1 = curveH(hub.cx, hub.cy, c.left, c.cy,  0.62,   5, 0.40, -5); }
					if (outCard2) { const c = relPos(outCard2); op2 = curveH(hub.cx, hub.cy, c.left, c.cy,  0.38,   9, 0.52, -7); }
				}
			}
			rafId = requestAnimationFrame(tick);
		}
		rafId = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafId);
	});
</script>

<div class="relative flex w-full items-stretch overflow-visible" bind:this={container} bind:clientWidth={containerWidth}>

	<!-- ── Dynamic connector SVG (covers the whole component) ─────────── -->
	<svg
		class="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d={sp0} stroke="#e5e7eb" stroke-width="1.5" stroke-dasharray="10 10" fill="none" class="dash-flow" style="animation-duration:2.4s;animation-delay:0s"/>
		<path d={sp1} stroke="#e5e7eb" stroke-width="1.5" stroke-dasharray="10 10" fill="none" class="dash-flow" style="animation-duration:2.8s;animation-delay:-0.6s"/>
		<path d={sp2} stroke="#e5e7eb" stroke-width="1.5" stroke-dasharray="10 10" fill="none" class="dash-flow" style="animation-duration:2.2s;animation-delay:-1.1s"/>
		<path d={sp3} stroke="#e5e7eb" stroke-width="1.5" stroke-dasharray="10 10" fill="none" class="dash-flow" style="animation-duration:2.6s;animation-delay:-0.4s"/>
		<path d={op0} stroke="#e5e7eb" stroke-width="1.5" stroke-dasharray="10 10" fill="none" class="dash-flow" style="animation-duration:2.5s;animation-delay:-0.9s"/>
		<path d={op1} stroke="#e5e7eb" stroke-width="1.5" stroke-dasharray="10 10" fill="none" class="dash-flow" style="animation-duration:2.3s;animation-delay:-0.3s"/>
		<path d={op2} stroke="#e5e7eb" stroke-width="1.5" stroke-dasharray="10 10" fill="none" class="dash-flow" style="animation-duration:2.7s;animation-delay:-0.7s"/>
		<circle cx={dotCx} cy={dotCy} r="3" fill="#d1d5db"/>
	</svg>

	{#if mobile}

		<!-- ══ Mobile layout — compact icon cards scattered around hub ══ -->
		<div class="relative h-[300px] w-full">

			<!-- Source icon cards (left side, scattered vertically) -->
			<div class="float-card absolute" style="top: 4%;  left: 14%; animation-duration:3.2s; animation-delay:0s;">
				<div bind:this={srcCard0} class="border-border bg-background flex h-12 w-12 items-center justify-center rounded-lg border">
					<PostgresqlIcon class="size-6" />
				</div>
			</div>
			<div class="float-card absolute" style="top: 30%; left: 10%; animation-duration:3.8s; animation-delay:0.6s;">
				<div bind:this={srcCard1} class="border-border bg-background flex h-12 w-12 items-center justify-center rounded-lg border">
					<MongodbIcon class="size-6" />
				</div>
			</div>
			<div class="float-card absolute" style="top: 62%; left: 16%; animation-duration:3.5s; animation-delay:1.1s;">
				<div bind:this={srcCard2} class="border-border bg-background flex h-12 w-12 items-center justify-center rounded-lg border">
					<div class="[&>svg]:size-6 size-6"><GoogleSheetsIcon /></div>
				</div>
			</div>
			<div class="float-card absolute" style="top: 86%; left: 11%; animation-duration:4.1s; animation-delay:0.3s;">
				<div bind:this={srcCard3} class="border-border bg-background flex h-12 w-12 items-center justify-center rounded-lg border">
					<div class="[&>svg]:size-6 size-6"><SnowflakeIcon /></div>
				</div>
			</div>

			<!-- Hub (centred) -->
			<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				<div bind:this={hubEl} style="box-shadow: 0 0 0 1px rgba(45,45,246,0.15), 0 12px 40px rgba(45,45,246,0.25);" class="rounded-2xl">
					<img src={logo} alt="nomox" class="size-12 rounded-l" />
				</div>
			</div>

			<!-- Output icon cards (right side, scattered vertically) -->
			<div class="float-card absolute" style="top: 6%;  right: 14%; animation-duration:3.4s; animation-delay:0.4s;">
				<div bind:this={outCard0} class="border-border bg-background flex h-12 w-12 items-center justify-center rounded-lg border">
					<BookOpenIcon class="text-foreground size-6" />
				</div>
			</div>
			<div class="float-card absolute" style="top: 44%; right: 10%; animation-duration:3.6s; animation-delay:0.9s;">
				<div bind:this={outCard1} class="border-border bg-background flex h-12 w-12 items-center justify-center rounded-lg border">
					<div class="text-primary [&>svg]:size-6 size-6"><McpIcon /></div>
				</div>
			</div>
			<div class="float-card absolute" style="top: 80%; right: 13%; animation-duration:3.9s; animation-delay:1.4s;">
				<div bind:this={outCard2} class="border-border bg-background flex h-12 w-12 items-center justify-center rounded-lg border">
					<Layers2Icon class="text-foreground size-6" />
				</div>
			</div>

		</div>

	{:else}

		<!-- ══ Horizontal layout ═════════════════════════════════════════ -->

		<div class="flex flex-col gap-4 overflow-visible">
			<div class="float-card" style="animation-duration:3.2s; animation-delay:0s;">
				<div bind:this={srcCard0} class="border-border bg-background flex h-14 w-48 shrink-0 translate-x-0 items-center gap-3 rounded-lg border px-4">
					<PostgresqlIcon class="size-7 shrink-0" />
					<div class="min-w-0">
						<p class="text-foreground truncate text-xs font-semibold">PostgreSQL</p>
						<p class="text-muted-foreground text-[10px]">Relational database</p>
					</div>
				</div>
			</div>
			<div class="float-card" style="animation-duration:3.8s; animation-delay:0.6s;">
				<div bind:this={srcCard1} class="border-border bg-background flex h-14 w-48 shrink-0 -translate-x-6 items-center gap-3 rounded-lg border px-4">
					<MongodbIcon class="size-7 shrink-0" />
					<div class="min-w-0">
						<p class="text-foreground truncate text-xs font-semibold">MongoDB</p>
						<p class="text-muted-foreground text-[10px]">Document database</p>
					</div>
				</div>
			</div>
			<div class="float-card" style="animation-duration:3.5s; animation-delay:1.1s;">
				<div bind:this={srcCard2} class="border-border bg-background flex h-14 w-48 shrink-0 -translate-x-2 items-center gap-3 rounded-lg border px-4">
					<div class="[&>svg]:size-full size-7 shrink-0"><GoogleSheetsIcon /></div>
					<div class="min-w-0">
						<p class="text-foreground truncate text-xs font-semibold">Spreadsheets</p>
						<p class="text-muted-foreground text-[10px]">Files &amp; CSV</p>
					</div>
				</div>
			</div>
			<div class="float-card" style="animation-duration:4.1s; animation-delay:0.3s;">
				<div bind:this={srcCard3} class="border-border bg-background flex h-14 w-48 shrink-0 -translate-x-4 items-center gap-3 rounded-lg border px-4">
					<div class="[&>svg]:size-full size-7 shrink-0"><SnowflakeIcon /></div>
					<div class="min-w-0">
						<p class="text-foreground truncate text-xs font-semibold">Snowflake</p>
						<p class="text-muted-foreground text-[10px]">Cloud data warehouse</p>
					</div>
				</div>
			</div>
		</div>

		<div class="relative flex-1">
			<div class="absolute inset-0 flex items-center justify-center">
				<div bind:this={hubEl} style="box-shadow: 0 0 0 1px rgba(45,45,246,0.15), 0 12px 40px rgba(45,45,246,0.25);" class="rounded-2xl">
					<img src={logo} alt="nomox" class="size-12 rounded-l" />
				</div>
			</div>
		</div>

		<div class="flex flex-col justify-center gap-4">
			<div class="float-card" style="animation-duration:3.4s; animation-delay:0.4s;">
				<a bind:this={outCard0} href="/product/semantic-catalog" class="border-border bg-background hover:border-primary/40 hover:shadow-sm flex h-14 w-48 shrink-0 items-center gap-3 rounded-lg border px-4 transition-all">
					<BookOpenIcon class="text-foreground size-5 shrink-0" />
					<div class="min-w-0">
						<p class="text-foreground truncate text-xs font-semibold">Semantic catalog</p>
						<p class="text-muted-foreground text-[10px]">Meanings &amp; relationships</p>
					</div>
				</a>
			</div>
			<div class="float-card translate-x-5" style="animation-duration:3.6s; animation-delay:0.9s;">
				<a bind:this={outCard1} href="/product/mcp" class="border-border bg-background hover:border-primary/40 hover:shadow-sm flex h-14 w-48 shrink-0 items-center gap-3 rounded-lg border px-4 transition-all">
					<div class="text-primary [&>svg]:size-7 shrink-0"><McpIcon /></div>
					<div class="min-w-0">
						<p class="text-foreground truncate text-xs font-semibold">MCP Server</p>
						<p class="text-muted-foreground text-[10px]">Claude, Cursor &amp; more</p>
					</div>
				</a>
			</div>
			<div class="float-card" style="animation-duration:3.9s; animation-delay:1.4s;">
				<a bind:this={outCard2} href="/product/bi" class="border-border bg-background hover:border-primary/40 hover:shadow-sm flex h-14 w-48 shrink-0 items-center gap-3 rounded-lg border px-4 transition-all">
					<Layers2Icon class="text-foreground size-5 shrink-0" />
					<div class="min-w-0">
						<p class="text-foreground truncate text-xs font-semibold">BI Platform</p>
						<p class="text-muted-foreground text-[10px]">Explore &amp; visualise</p>
					</div>
				</a>
			</div>
		</div>

	{/if}

</div>
