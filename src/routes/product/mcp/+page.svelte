<script lang="ts">
	import PublicNav from "$lib/components/public-nav.svelte";
	import PublicFooter from "$lib/components/public-footer.svelte";
	import LandingCta from "$lib/components/landing-cta.svelte";
	import ProductHero from "$lib/components/products/product-hero.svelte";
	import { fadeUp } from "$lib/actions/fade-up";

	const capabilities = [
		{
			num: "01",
			label: "Works where you work",
			desc: "Plug the unified data layer into Claude, Cursor, and any MCP-compatible AI tool. No switching between platforms, no copy-pasting numbers out of a dashboard and into a chat window.",
		},
		{
			num: "02",
			label: "Company data in AI conversations",
			desc: "Query your internal numbers directly inside an AI conversation and combine them with external research in the same thread-market data, news, analysis, and your own metrics together.",
		},
		{
			num: "03",
			label: "Grounded in your semantic layer",
			desc: "All answers are constrained to fields and relationships that actually exist in your data. The same trusted catalog that powers the rest of Nomox-no hallucinated column names or invented metrics.",
		},
		{
			num: "04",
			label: "Persistent context across sessions",
			desc: "The semantic layer is always available. You do not need to re-explain the data model at the start of every session-Nomox keeps the context grounded so your AI tools can reason accurately from the start.",
		},
	];

	const solutions = [
		{ label: "Data teams", href: "/solutions/data-teams" },
		{ label: "Decision makers", href: "/solutions/decision-makers" },
	];
</script>

<div class="bg-background text-foreground flex min-h-screen flex-col">
	<PublicNav />

	<ProductHero
		eyebrow="Products · MCP Server"
		title="Your data, available wherever you work."
		subtitle="Nomox ships as a Model Context Protocol server, letting analysts plug the unified data layer directly into AI tools-Claude, or any other LLM that supports MCP. It turns Nomox from a product you visit into a layer that is available wherever you work."
		forLine="For analysts & power users"
	/>

	<!-- Description -->
	<section class="border-border border-b">
		<div class="mx-auto max-w-section px-8 py-14">
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
				<p
					data-fade-up="pending"
					use:fadeUp
					class="text-foreground text-sm leading-relaxed"
				>
					The MCP Server exposes Nomox's unified semantic layer through the Model Context Protocol
					— an open standard that lets AI tools like Claude connect to external data sources
					directly. Rather than switching between your AI assistant and your data platform, you
					can query company data inside an AI conversation.
				</p>
				<p
					data-fade-up="pending"
					use:fadeUp={{ delay: 80 }}
					class="text-muted-foreground text-sm leading-relaxed"
				>
					Combine internal numbers with external research, ask follow-up questions, and run
					deeper analyses-all grounded in the same trusted semantic layer. The MCP Server is
					designed for analysts and technically comfortable users who already work inside AI tools
					and want their company's data available there too.
				</p>
			</div>
		</div>
	</section>

	<!-- Capabilities -->
	<section class="border-border border-b">
		<div class="mx-auto max-w-section px-8 py-14">
			<p class="text-muted-foreground mb-8 font-mono text-xs uppercase tracking-widest">
				Capabilities
			</p>
			<div class="divide-border divide-y">
				{#each capabilities as cap, i}
					<div
						data-fade-up="pending"
						use:fadeUp={{ delay: i * 60 }}
						class="grid grid-cols-1 gap-2 py-6 md:grid-cols-3 md:gap-8"
					>
						<div class="flex items-baseline gap-4">
							<span class="text-muted-foreground font-mono text-xs">{cap.num}</span>
							<span class="text-foreground text-sm font-semibold">{cap.label}</span>
						</div>
						<p class="text-muted-foreground text-sm leading-relaxed md:col-span-2">
							{cap.desc}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Who it's for -->
	<section class="border-border border-b">
		<div class="mx-auto max-w-section px-8 py-10">
			<div class="flex flex-col gap-4 md:flex-row md:items-center md:gap-10">
				<p class="text-muted-foreground font-mono text-xs uppercase tracking-widest">
					Explore by role
				</p>
				<div class="flex flex-wrap gap-4">
					{#each solutions as s}
						<a
							href={s.href}
							class="text-foreground hover:text-primary text-sm font-medium transition-colors"
						>
							{s.label} →
						</a>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<LandingCta />

	<PublicFooter />
</div>
