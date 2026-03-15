<!--
  Source column — 4 × h-14 (56 px) + 3 × gap-4 (16 px) = 272 px total
  Hub centre at 50 % = 136 px.

  Source card centres (px → SVG y %):
    PostgreSQL:   28 / 272 ≈ 10 %
    MongoDB:     100 / 272 ≈ 37 %
    Spreadsheets:172 / 272 ≈ 63 %
    Snowflake:   244 / 272 ≈ 90 %

  Output column — 3 × h-14 (56 px) + 2 × gap-4 (16 px) = 200 px, centred in 272 px.
  Top offset = (272 − 200) / 2 = 36 px.
  Output card centres (px → SVG y %):
    Semantic catalog: 36 + 28  = 64  / 272 ≈ 24 %
    MCP Server:       36 + 100 = 136 / 272 = 50 %  ← straight line
    BI Platform:      36 + 172 = 208 / 272 ≈ 77 %

  Connector div = 320 px (704 px inner − 2 × 192 px cards).
  1 SVG x unit = 3.2 px.  SVG has overflow:visible so paths can extend
  LEFT into the source column to reach each card's visual right edge:
    PostgreSQL   (translate-x-0):  x start =  0      (  0 px)
    MongoDB      (-translate-x-6): x start = -7.5    (-24 px)
    Spreadsheets (-translate-x-2): x start = -2.5    ( -8 px)
    Snowflake    (-translate-x-4): x start = -5      (-16 px)
-->
<style>
	@keyframes float {
		0%, 100% { transform: translateY(0px); }
		50%       { transform: translateY(-2px); }
	}
	.float-card {
		animation-name: float;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
	}
</style>

<script lang="ts">
	import PostgresqlIcon from '$lib/assets/icons/postgresql-icon.svelte';
	import MongodbIcon from '$lib/assets/icons/mongodb-icon.svelte';
	import GoogleSheetsIcon from '$lib/assets/icons/google-sheets-icon.svelte';
	import SnowflakeIcon from '$lib/assets/icons/snowflake.svelte';
	import McpIcon from '$lib/assets/icons/mcp.svelte';
	import BookOpenIcon from '@lucide/svelte/icons/book-open';
	import Layers2Icon from '@lucide/svelte/icons/layers-2';
	import logo from '$lib/assets/logo.svg';
</script>

<div class="flex w-full items-stretch overflow-visible">

	<!-- ── Source cards ──────────────────────────────────────────────── -->
	<div class="flex flex-col gap-4 overflow-visible">

		<div class="float-card" style="animation-duration:3.2s; animation-delay:0s;">
			<div class="border-border bg-background flex h-14 w-48 shrink-0 translate-x-0 items-center gap-3 rounded-lg border px-4">
				<PostgresqlIcon class="size-7 shrink-0" />
				<div class="min-w-0">
					<p class="text-foreground truncate text-xs font-semibold">PostgreSQL</p>
					<p class="text-muted-foreground text-[10px]">Relational database</p>
				</div>
			</div>
		</div>

		<div class="float-card" style="animation-duration:3.8s; animation-delay:0.6s;">
			<div class="border-border bg-background flex h-14 w-48 shrink-0 -translate-x-6 items-center gap-3 rounded-lg border px-4">
				<MongodbIcon class="size-7 shrink-0" />
				<div class="min-w-0">
					<p class="text-foreground truncate text-xs font-semibold">MongoDB</p>
					<p class="text-muted-foreground text-[10px]">Document database</p>
				</div>
			</div>
		</div>

		<div class="float-card" style="animation-duration:3.5s; animation-delay:1.1s;">
			<div class="border-border bg-background flex h-14 w-48 shrink-0 -translate-x-2 items-center gap-3 rounded-lg border px-4">
				<div class="[&>svg]:size-full size-7 shrink-0"><GoogleSheetsIcon /></div>
				<div class="min-w-0">
					<p class="text-foreground truncate text-xs font-semibold">Spreadsheets</p>
					<p class="text-muted-foreground text-[10px]">Files &amp; CSV</p>
				</div>
			</div>
		</div>

		<div class="float-card" style="animation-duration:4.1s; animation-delay:0.3s;">
			<div class="border-border bg-background flex h-14 w-48 shrink-0 -translate-x-4 items-center gap-3 rounded-lg border px-4">
				<div class="[&>svg]:size-full size-7 shrink-0"><SnowflakeIcon /></div>
				<div class="min-w-0">
					<p class="text-foreground truncate text-xs font-semibold">Snowflake</p>
					<p class="text-muted-foreground text-[10px]">Cloud data warehouse</p>
				</div>
			</div>
		</div>

	</div>

	<!-- ── Connector (SVG lines + hub) ───────────────────────────────── -->
	<div class="relative flex-1">

		<svg
			class="absolute inset-0 h-full w-full overflow-visible"
			viewBox="0 0 100 100"
			preserveAspectRatio="none"
			overflow="visible"
			xmlns="http://www.w3.org/2000/svg"
		>
			<!-- sources → hub -->
			<path d="M 0 10 C 35 10 35 50 50 50"      stroke="#e5e7eb" stroke-width="1.5" fill="none" vector-effect="non-scaling-stroke"/>
			<path d="M -7.5 37 C 30 37 30 50 50 50"   stroke="#e5e7eb" stroke-width="1.5" fill="none" vector-effect="non-scaling-stroke"/>
			<path d="M -2.5 63 C 33 63 33 50 50 50"   stroke="#e5e7eb" stroke-width="1.5" fill="none" vector-effect="non-scaling-stroke"/>
			<path d="M -5 90 C 32 90 32 50 50 50"     stroke="#e5e7eb" stroke-width="1.5" fill="none" vector-effect="non-scaling-stroke"/>
			<!-- hub → output cards -->
			<path d="M 50 50 C 65 50 65 24 100 24"    stroke="#e5e7eb" stroke-width="1.5" fill="none" vector-effect="non-scaling-stroke"/>
			<path d="M 50 50 L 120 50"                 stroke="#e5e7eb" stroke-width="1.5" fill="none" vector-effect="non-scaling-stroke"/>
			<path d="M 50 50 C 65 50 65 77 100 77"    stroke="#e5e7eb" stroke-width="1.5" fill="none" vector-effect="non-scaling-stroke"/>
			<!-- junction dot -->
			<circle cx="50" cy="50" r="2.5" fill="#d1d5db" vector-effect="non-scaling-stroke"/>
		</svg>

		<!-- Nomox hub -->
		<div class="absolute inset-0 flex items-center justify-center">
			<div style="box-shadow: 0 0 0 1px rgba(45,45,246,0.15), 0 12px 40px rgba(45,45,246,0.25);" class="rounded-2xl">
				<img src={logo} alt="nomox" class="size-12 rounded-l" />
			</div>
		</div>

	</div>

	<!-- ── Output cards ──────────────────────────────────────────────── -->
	<div class="flex flex-col justify-center gap-4">

		<div class="float-card" style="animation-duration:3.4s; animation-delay:0.4s;">
			<a href="/product#semantic-catalog" class="border-border bg-background hover:border-primary/40 hover:shadow-sm flex h-14 w-48 shrink-0 items-center gap-3 rounded-lg border px-4 transition-all">
				<BookOpenIcon class="text-foreground size-5 shrink-0" />
				<div class="min-w-0">
					<p class="text-foreground truncate text-xs font-semibold">Semantic catalog</p>
					<p class="text-muted-foreground text-[10px]">Meanings &amp; relationships</p>
				</div>
			</a>
		</div>

		<div class="float-card translate-x-5" style="animation-duration:3.6s; animation-delay:0.9s;">
			<a href="/product#mcp" class="border-border bg-background hover:border-primary/40 hover:shadow-sm flex h-14 w-48 shrink-0 items-center gap-3 rounded-lg border px-4 transition-all">
				<div class="text-primary [&>svg]:size-7 shrink-0"><McpIcon /></div>
				<div class="min-w-0">
					<p class="text-foreground truncate text-xs font-semibold">MCP Server</p>
					<p class="text-muted-foreground text-[10px]">Claude, Cursor &amp; more</p>
				</div>
			</a>
		</div>

		<div class="float-card" style="animation-duration:3.9s; animation-delay:1.4s;">
			<a href="/product#bi" class="border-border bg-background hover:border-primary/40 hover:shadow-sm flex h-14 w-48 shrink-0 items-center gap-3 rounded-lg border px-4 transition-all">
				<Layers2Icon class="text-foreground size-5 shrink-0" />
				<div class="min-w-0">
					<p class="text-foreground truncate text-xs font-semibold">BI Platform</p>
					<p class="text-muted-foreground text-[10px]">Explore &amp; visualise</p>
				</div>
			</a>
		</div>

	</div>

</div>
