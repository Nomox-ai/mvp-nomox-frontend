<!--
  Source column — 4 × h-14 (56 px) + 3 × gap-4 (16 px) = 272 px total
  Hub centre at 50 % = 136 px.

  Card centres (px → SVG y %):
    PostgreSQL:   28 / 272 ≈ 10 %
    MongoDB:     100 / 272 ≈ 37 %
    Spreadsheets:172 / 272 ≈ 63 %
    Snowflake:   244 / 272 ≈ 90 %

  Connector div = 320 px (704 px inner − 2 × 192 px cards).
  1 SVG x unit = 3.2 px.  SVG has overflow:visible so paths can extend
  LEFT into the source column to reach each card's visual right edge:
    PostgreSQL   (translate-x-0):  x start =  0      (  0 px)
    MongoDB      (-translate-x-6): x start = -7.5    (-24 px)
    Spreadsheets (-translate-x-2): x start = -2.5    ( -8 px)
    Snowflake    (-translate-x-4): x start = -5      (-16 px)
-->
<script lang="ts">
	import PostgresqlIcon from '$lib/assets/icons/postgresql-icon.svelte';
	import MongodbIcon from '$lib/assets/icons/mongodb-icon.svelte';
	import GoogleSheetsIcon from '$lib/assets/icons/google-sheets-icon.svelte';
	import SnowflakeIcon from '$lib/assets/icons/snowflake.svelte';
	import McpIcon from '$lib/assets/icons/mcp.svelte';
	import logo from '$lib/assets/logo.svg';
</script>

<div class="flex w-full items-stretch overflow-visible">

	<!-- ── Source cards ──────────────────────────────────────────────── -->
	<!-- Cards use -translate-x-* to stagger left; layout width stays w-48
	     so all right edges remain at the source column boundary → lines connect. -->
	<div class="flex flex-col gap-4 overflow-visible">

		<div class="border-border bg-background flex h-14 w-48 shrink-0 translate-x-0 items-center gap-3 rounded-lg border px-4">
			<PostgresqlIcon class="size-7 shrink-0" />
			<div class="min-w-0">
				<p class="text-foreground truncate text-xs font-semibold">PostgreSQL</p>
				<p class="text-muted-foreground text-[10px]">Relational database</p>
			</div>
		</div>

		<div class="border-border bg-background flex h-14 w-48 shrink-0 -translate-x-6 items-center gap-3 rounded-lg border px-4">
			<MongodbIcon class="size-7 shrink-0" />
			<div class="min-w-0">
				<p class="text-foreground truncate text-xs font-semibold">MongoDB</p>
				<p class="text-muted-foreground text-[10px]">Document database</p>
			</div>
		</div>

		<div class="border-border bg-background flex h-14 w-48 shrink-0 -translate-x-2 items-center gap-3 rounded-lg border px-4">
			<div class="[&>svg]:size-full size-7 shrink-0"><GoogleSheetsIcon /></div>
			<div class="min-w-0">
				<p class="text-foreground truncate text-xs font-semibold">Spreadsheets</p>
				<p class="text-muted-foreground text-[10px]">Files &amp; CSV</p>
			</div>
		</div>

		<div class="border-border bg-background flex h-14 w-48 shrink-0 -translate-x-4 items-center gap-3 rounded-lg border px-4">
			<div class="[&>svg]:size-full size-7 shrink-0"><SnowflakeIcon /></div>
			<div class="min-w-0">
				<p class="text-foreground truncate text-xs font-semibold">Snowflake</p>
				<p class="text-muted-foreground text-[10px]">Cloud data warehouse</p>
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
			<!-- sources → hub (x start accounts for each card's -translate-x offset) -->
			<path d="M 0 10 C 35 10 35 50 50 50"      stroke="#e5e7eb" stroke-width="1.5" fill="none" vector-effect="non-scaling-stroke"/>
			<path d="M -7.5 37 C 30 37 30 50 50 50"   stroke="#e5e7eb" stroke-width="1.5" fill="none" vector-effect="non-scaling-stroke"/>
			<path d="M -2.5 63 C 33 63 33 50 50 50"   stroke="#e5e7eb" stroke-width="1.5" fill="none" vector-effect="non-scaling-stroke"/>
			<path d="M -5 90 C 32 90 32 50 50 50"     stroke="#e5e7eb" stroke-width="1.5" fill="none" vector-effect="non-scaling-stroke"/>
			<!-- hub → MCP -->
			<path d="M 50 50 L 100 50"                 stroke="#e5e7eb" stroke-width="1.5" fill="none" vector-effect="non-scaling-stroke"/>
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

	<!-- ── Output card (vertically centred) ─────────────────────────── -->
	<div class="flex flex-col justify-center">
		<div class="border-border bg-background flex h-14 w-48 shrink-0 items-center gap-3 rounded-lg border px-4">
			<div class="text-primary [&>svg]:size-7 shrink-0"><McpIcon /></div>
			<div class="min-w-0">
				<p class="text-foreground truncate text-xs font-semibold">MCP Server</p>
				<p class="text-muted-foreground text-[10px]">Claude, Cursor &amp; more</p>
			</div>
		</div>
	</div>

</div>
