<script lang="ts">
	import PublicNav from "$lib/components/public-nav.svelte";
	import PublicFooter from "$lib/components/public-footer.svelte";

	const products = [
		{
			name: "Semantic Catalog",
			href: "/product/semantic-catalog",
			for: "Data engineers & analysts",
			desc: "Automatically reads every connected source, maps cross-source relationships, and enriches each field with business-level meaning — without anyone writing documentation by hand.",
		},
		{
			name: "BI Platform",
			href: "/product/bi",
			for: "Managers & operations teams",
			desc: "Ask questions about company data in plain English and get immediate, traceable answers. Or build persistent dashboards that draw from all connected sources at once.",
		},
		{
			name: "MCP Server",
			href: "/product/mcp",
			for: "Analysts & power users",
			desc: "Plug the unified data layer into Claude, Cursor, and any MCP-compatible AI tool. Query company data inside an AI conversation, grounded in the same trusted semantic layer.",
		},
	];
</script>

<div class="bg-background text-foreground flex min-h-screen flex-col">
	<PublicNav />

	<!-- Page hero -->
	<section class="border-border border-b">
		<div class="mx-auto max-w-7xl px-8 py-20 md:py-24">
			<p class="text-primary mb-5 font-mono text-xs uppercase tracking-widest">Products</p>
			<h1 class="text-foreground text-5xl font-semibold leading-[1.1] tracking-tight">
				One semantic layer.<br />Three ways to use it.
			</h1>
			<p class="text-muted-foreground mt-6 max-w-lg text-sm leading-relaxed">
				Nomox connects to your existing data sources and builds a shared semantic layer — a unified
				map of what every field and table means in business terms. The Semantic Catalog, BI
				Platform, and MCP Server are each built on top of it.
			</p>
		</div>
	</section>

	<!-- Product cards -->
	<section class="border-border border-b">
		<div class="mx-auto max-w-7xl px-8 py-14">
			<div class="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border sm:grid-cols-3">
				{#each products as product}
					<a
						href={product.href}
						class="group bg-background hover:bg-muted/40 flex flex-col gap-4 p-8 transition-colors"
					>
						<div class="flex-1">
							<p class="text-foreground text-sm font-semibold group-hover:text-primary transition-colors">
								{product.name}
							</p>
							<p class="text-muted-foreground mt-0.5 font-mono text-xs uppercase tracking-widest">
								{product.for}
							</p>
							<p class="text-muted-foreground mt-3 text-xs leading-relaxed">
								{product.desc}
							</p>
						</div>
						<span class="text-primary font-mono text-xs opacity-0 transition-opacity group-hover:opacity-100">
							Learn more →
						</span>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<PublicFooter />
</div>
