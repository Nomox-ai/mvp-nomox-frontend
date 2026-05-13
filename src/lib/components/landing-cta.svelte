<script lang="ts">
	import { fadeUp } from "$lib/actions/fade-up";
	import PostgresqlIcon from "$lib/assets/icons/postgresql-icon.svelte";
	import SnowflakeIcon from "$lib/assets/icons/snowflake.svelte";
	import MongodbIcon from "$lib/assets/icons/mongodb-icon.svelte";
	import GoogleSheetsIcon from "$lib/assets/icons/google-sheets-icon.svelte";

	// Floating source chips with logos — positioned around the headline
	const sources = [
		{ name: "PostgreSQL",    Icon: PostgresqlIcon,   x: "8%",  y: "22%", delay: "0s",   dur: "6s",   rot: "-4deg" },
		{ name: "Snowflake",     Icon: SnowflakeIcon,    x: "16%", y: "70%", delay: "1.2s", dur: "7s",   rot: "3deg"  },
		{ name: "MongoDB",       Icon: MongodbIcon,      x: "78%", y: "20%", delay: "0.7s", dur: "5.5s", rot: "5deg"  },
		{ name: "Google Sheets", Icon: GoogleSheetsIcon, x: "82%", y: "68%", delay: "2s",   dur: "6.5s", rot: "-3deg" },
	];

	// Text-only chips — pad the landscape
	const textSources = [
		{ name: "BigQuery",   x: "4%",  y: "50%", delay: "0.4s", dur: "7s",   rot: "2deg"  },
		{ name: "Redshift",   x: "72%", y: "45%", delay: "1.8s", dur: "5.8s", rot: "-2deg" },
		{ name: "Databricks", x: "62%", y: "78%", delay: "0.3s", dur: "6.8s", rot: "2deg"  },
	];
</script>

<section class="cta-wrap relative overflow-hidden border-b border-border">
	<!-- Subtle dot pattern matching the hero -->
	<div class="cta-dots" aria-hidden="true"></div>

	<!-- Floating data source chips -->
	{#each sources as s}
		<div
			class="chip absolute flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 shadow-sm"
			style="left:{s.x}; top:{s.y}; --rot:{s.rot}; animation-delay:{s.delay}; animation-duration:{s.dur};"
		>
			<svelte:component this={s.Icon} class="size-3.5 shrink-0" />
			<span class="text-foreground/80 text-xs font-medium whitespace-nowrap">{s.name}</span>
		</div>
	{/each}

	{#each textSources as s}
		<div
			class="chip absolute flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5"
			style="left:{s.x}; top:{s.y}; --rot:{s.rot}; animation-delay:{s.delay}; animation-duration:{s.dur};"
		>
			<span class="bg-foreground/30 size-1.5 shrink-0 rounded-full"></span>
			<span class="text-foreground/60 text-xs font-medium whitespace-nowrap">{s.name}</span>
		</div>
	{/each}

	<!-- Main content -->
	<div class="relative z-[1] mx-auto max-w-section px-8 py-24 text-center">
		<!-- Status pill, same language as hero -->
		<div
			data-fade-up="pending"
			use:fadeUp
			class="mb-6 inline-flex items-center gap-2.5 rounded-full border border-border bg-background px-3 py-1.5"
		>
			<span class="relative flex size-1.5">
				<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
				<span class="relative inline-flex size-1.5 rounded-full bg-emerald-500"></span>
			</span>
			<span class="text-primary font-mono text-[10px] uppercase tracking-widest">
				Early access · taking partners now
			</span>
		</div>

		<h2
			data-fade-up="pending"
			use:fadeUp={{ delay: 60 }}
			class="text-foreground mx-auto max-w-2xl text-4xl md:text-5xl leading-[1.1] tracking-tight"
		>
			It's time to understand your data.
		</h2>
		<p
			data-fade-up="pending"
			use:fadeUp={{ delay: 140 }}
			class="text-muted-foreground mx-auto mt-5 max-w-md text-sm leading-relaxed"
		>
			We're looking for our first partners. Connect a source in minutes and shape the catalog with us.
		</p>

		<div
			data-fade-up="pending"
			use:fadeUp={{ delay: 200 }}
			class="mt-9 flex flex-wrap items-center justify-center gap-3"
		>
			<a
				href="/try-it"
				class="group bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-medium transition-all"
			>
				Get started
				<span class="transition-transform group-hover:translate-x-0.5">→</span>
			</a>
			<a
				href="#how-it-works"
				class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
			>
				See how it works
			</a>
		</div>
	</div>
</section>

<style>
	.cta-wrap {
		background-color: #fcfcfc;
	}

	/* Subtle dot pattern — same language as hero */
	.cta-dots {
		position: absolute;
		inset: 0;
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><circle cx='1' cy='1' r='1' fill='rgba(45,45,246,0.18)'/></svg>");
		background-size: 24px 24px;
		pointer-events: none;
		z-index: 0;
	}

	.chip {
		animation-name: float;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
		animation-direction: alternate;
		z-index: 0;
	}

	@keyframes float {
		from { transform: rotate(var(--rot, 0deg)) translateY(0px); }
		to   { transform: rotate(var(--rot, 0deg)) translateY(-10px); }
	}
</style>
