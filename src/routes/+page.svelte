<script lang="ts">
	import logo from "$lib/assets/logo.svg";
</script>

<div class="bg-background text-foreground flex min-h-screen flex-col">

	<!-- Nav -->
	<header class="flex items-center justify-between px-8 py-6">
		<div class="flex items-center gap-2.5">
			<img src={logo} alt="nomox" class="size-6" />
			<span class="text-sm font-semibold tracking-tight">nomox</span>
		</div>
		<a
			href="/login"
			class="text-muted-foreground hover:text-foreground text-sm transition-colors"
		>
			Sign in →
		</a>
	</header>

	<!-- Hero -->
	<main class="flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-16 text-center">
		<p class="text-muted-foreground mb-6 text-xs font-medium uppercase tracking-widest">
			Semantic data catalog
		</p>

		<h1 class="text-foreground max-w-xl text-4xl font-semibold tracking-tight leading-tight">
			Understand your data.<br />Automatically.
		</h1>

		<p class="text-muted-foreground mt-5 max-w-sm text-sm leading-relaxed">
			Nomox indexes your data sources, infers business semantics with AI, and
			exposes a structured catalog to your team and AI tools.
		</p>

		<div class="mt-10 flex items-center gap-4">
			<a
				href="/login"
				class="bg-foreground text-background hover:bg-foreground/90 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
			>
				Open admin console
			</a>
			<a
				href="#features"
				class="text-muted-foreground hover:text-foreground text-sm transition-colors"
			>
				Learn more ↓
			</a>
		</div>
	</main>

	<!-- Features -->
	<section id="features" class="border-border border-t">
		<div class="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-y-0">
			{#each [
				{ label: "Schema catalog",    desc: "Sources, tables, columns — with inferred business meanings, types and relationships." },
				{ label: "Semantic model",    desc: "Entities, glossary terms and relationships extracted automatically from your data." },
				{ label: "MCP integration",   desc: "Expose your catalog to Claude, Cursor and any MCP-compatible AI client." },
			] as feature}
				<div class="px-8 py-10">
					<p class="text-foreground mb-2 text-sm font-semibold">{feature.label}</p>
					<p class="text-muted-foreground text-xs leading-relaxed">{feature.desc}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- Footer -->
	<footer class="border-border border-t px-8 py-5">
		<div class="mx-auto flex max-w-4xl items-center justify-between">
			<div class="flex items-center gap-2">
				<img src={logo} alt="nomox" class="size-4 opacity-50" />
				<span class="text-muted-foreground text-xs">nomox</span>
			</div>
			<p class="text-muted-foreground text-xs">Semantic data intelligence</p>
		</div>
	</footer>

</div>
