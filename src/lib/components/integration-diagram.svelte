<!--
  Source column  — 3 × h-14 (56px) + 2 × gap-4 (16px) = 200 px total
  Card centres   — 28 / 100 / 172 px  →  14 / 50 / 86 %
  Output column  — 1 × h-14 (56px), centred in 200 px  →  centre at 50 %
  Hub centre     — 50 %  →  hub→MCP line is a straight horizontal
-->
<script lang="ts">
	import PostgresqlIcon from '$lib/assets/icons/postgresql-icon.svelte';
	import MongodbIcon from '$lib/assets/icons/mongodb-icon.svelte';
	import GoogleSheetsIcon from '$lib/assets/icons/google-sheets-icon.svelte';
	import McpIcon from '$lib/assets/icons/mcp.svelte';
	import logo from '$lib/assets/logo.svg';
</script>

<div class="flex w-full items-stretch">

	<!-- ── Source cards ──────────────────────────────────────────────── -->
	<div class="flex flex-col gap-4">

		<div class="border-border bg-background flex h-14 w-48 shrink-0 items-center gap-3 rounded-lg border px-4">
			<PostgresqlIcon class="size-7 shrink-0" />
			<div class="min-w-0">
				<p class="text-foreground truncate text-xs font-semibold">PostgreSQL</p>
				<p class="text-muted-foreground text-[10px]">Relational database</p>
			</div>
		</div>

		<div class="border-border bg-background flex h-14 w-48 shrink-0 items-center gap-3 rounded-lg border px-4">
			<MongodbIcon class="size-7 shrink-0" />
			<div class="min-w-0">
				<p class="text-foreground truncate text-xs font-semibold">MongoDB</p>
				<p class="text-muted-foreground text-[10px]">Document database</p>
			</div>
		</div>

		<div class="border-border bg-background flex h-14 w-48 shrink-0 items-center gap-3 rounded-lg border px-4">
			<div class="[&>svg]:size-full size-7 shrink-0"><GoogleSheetsIcon /></div>
			<div class="min-w-0">
				<p class="text-foreground truncate text-xs font-semibold">Spreadsheets</p>
				<p class="text-muted-foreground text-[10px]">Files &amp; CSV</p>
			</div>
		</div>

	</div>

	<!-- ── Connector (SVG lines + hub) ───────────────────────────────── -->
	<div class="relative flex-1">

		<svg
			class="absolute inset-0 h-full w-full"
			viewBox="0 0 100 100"
			preserveAspectRatio="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<!-- sources → hub -->
			<path d="M 0 14 C 38 14 38 50 50 50" stroke="#e5e7eb" stroke-width="1.5" fill="none" vector-effect="non-scaling-stroke"/>
			<path d="M 0 50 L 50 50"              stroke="#e5e7eb" stroke-width="1.5" fill="none" vector-effect="non-scaling-stroke"/>
			<path d="M 0 86 C 38 86 38 50 50 50" stroke="#e5e7eb" stroke-width="1.5" fill="none" vector-effect="non-scaling-stroke"/>
			<!-- hub → MCP (straight, both centred at 50 %) -->
			<path d="M 50 50 L 100 50"            stroke="#e5e7eb" stroke-width="1.5" fill="none" vector-effect="non-scaling-stroke"/>
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
