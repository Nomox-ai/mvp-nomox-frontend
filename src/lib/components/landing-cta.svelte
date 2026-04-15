<script lang="ts">
	import { fadeUp } from "$lib/actions/fade-up";
	import PostgresqlIcon from "$lib/assets/icons/postgresql-icon.svelte";
	import SnowflakeIcon from "$lib/assets/icons/snowflake.svelte";
	import MongodbIcon from "$lib/assets/icons/mongodb-icon.svelte";
	import GoogleSheetsIcon from "$lib/assets/icons/google-sheets-icon.svelte";

	const sources = [
		{
			name: "PostgreSQL",
			Icon: PostgresqlIcon,
			x: "6%",
			y: "14%",
			delay: "0s",
			dur: "6s",
			rot: "-4deg",
			opacity: 0.9,
		},
		{
			name: "Snowflake",
			Icon: SnowflakeIcon,
			x: "18%",
			y: "72%",
			delay: "1.2s",
			dur: "7s",
			rot: "3deg",
			opacity: 0.85,
		},
		{
			name: "MongoDB",
			Icon: MongodbIcon,
			x: "76%",
			y: "15%",
			delay: "0.7s",
			dur: "5.5s",
			rot: "5deg",
			opacity: 0.85,
		},
		{
			name: "Google Sheets",
			Icon: GoogleSheetsIcon,
			x: "82%",
			y: "65%",
			delay: "2s",
			dur: "6.5s",
			rot: "-3deg",
			opacity: 0.9,
		},
	];

	const textSources = [
		{
			name: "BigQuery",
			x: "3%",
			y: "52%",
			delay: "0.4s",
			dur: "7s",
			rot: "2deg",
			opacity: 0.6,
		},
		{
			name: "Redshift",
			x: "72%",
			y: "42%",
			delay: "1.8s",
			dur: "5.8s",
			rot: "-2deg",
			opacity: 0.6,
		},
		{
			name: "MySQL",
			x: "86%",
			y: "30%",
			delay: "0.9s",
			dur: "6.2s",
			rot: "4deg",
			opacity: 0.55,
		},
		{
			name: "MSSQL",
			x: "10%",
			y: "35%",
			delay: "1.5s",
			dur: "8s",
			rot: "-5deg",
			opacity: 0.55,
		},
		{
			name: "Databricks",
			x: "62%",
			y: "78%",
			delay: "0.3s",
			dur: "6.8s",
			rot: "2deg",
			opacity: 0.6,
		},
	];
</script>

<section class="cta-wrap border-border relative overflow-hidden border-b">
	<!-- Floating data source chips -->
	{#each sources as s}
		<div
			class="chip absolute flex items-center gap-2 rounded-full border border-black/8 bg-white px-3 py-1.5 shadow-sm"
			style="left:{s.x}; top:{s.y}; --rot:{s.rot}; opacity:{s.opacity}; animation-delay:{s.delay}; animation-duration:{s.dur};"
		>
			<svelte:component this={s.Icon} class="size-3.5 shrink-0" />
			<span
				class="text-foreground/70 text-xs font-medium whitespace-nowrap"
				>{s.name}</span
			>
		</div>
	{/each}

	{#each textSources as s}
		<div
			class="chip absolute flex items-center gap-2 rounded-full border border-black/6 bg-white/70 px-3 py-1.5"
			style="left:{s.x}; top:{s.y}; --rot:{s.rot}; opacity:{s.opacity}; animation-delay:{s.delay}; animation-duration:{s.dur};"
		>
			<span class="bg-foreground/20 size-1.5 shrink-0 rounded-full"
			></span>
			<span
				class="text-foreground/50 text-xs font-medium whitespace-nowrap"
				>{s.name}</span
			>
		</div>
	{/each}

	<!-- Main content -->
	<div class="relative z-[1] mx-auto max-w-section px-8 py-28 text-center">
		<p
			data-fade-up="pending"
			use:fadeUp
			class="text-primary mb-6 font-mono text-xs uppercase tracking-widest"
		>
			Early access
		</p>
		<h2
			data-fade-up="pending"
			use:fadeUp={{ delay: 60 }}
			class="text-foreground mx-auto max-w-2xl text-5xl leading-[1.1] tracking-tight"
		>
			It's time to understand your data.
		</h2>
		<p
			data-fade-up="pending"
			use:fadeUp={{ delay: 140 }}
			class="text-muted-foreground mx-auto mt-6 max-w-md text-sm leading-relaxed"
		>
			We're looking for our first partners. Get in touch and we'll reach
			out when we launch.
		</p>
		<div
			data-fade-up="pending"
			use:fadeUp={{ delay: 200 }}
			class="mt-10 flex flex-wrap items-center justify-center gap-4"
		>
			<a
				href="/try-it"
				class="bg-foreground text-background hover:bg-foreground/85 inline-block rounded-lg px-6 py-3 text-sm font-medium transition-colors"
			>
				Get started
			</a>
			<a
				href="/try-it"
				class="text-foreground hover:text-primary inline-block text-sm font-medium transition-colors"
			>
				Join the waitlist →
			</a>
		</div>
	</div>
</section>

<style>
	.cta-wrap {
		background-color: #ffffff;
		background-image: linear-gradient(
				rgba(0, 0, 0, 0.045) 1px,
				transparent 1px
			),
			linear-gradient(90deg, rgba(0, 0, 0, 0.045) 1px, transparent 1px);
		background-size: 56px 56px;
	}

	.cta-wrap::before {
		content: "";
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to bottom,
			white 0%,
			transparent 25%,
			transparent 75%,
			white 100%
		);
		pointer-events: none;
		z-index: 0;
	}

	.chip {
		animation-name: float;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
		animation-direction: alternate;
	}

	@keyframes float {
		from {
			transform: rotate(var(--rot, 0deg)) translateY(0px);
		}
		to {
			transform: rotate(var(--rot, 0deg)) translateY(-10px);
		}
	}
</style>
