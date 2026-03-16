<script lang="ts">
	import logo from "$lib/assets/logo.svg";
	import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
	import MenuIcon from "@lucide/svelte/icons/menu";
	import XIcon from "@lucide/svelte/icons/x";
	import { slide } from "svelte/transition";

	let isMobile = false;
	let menuOpen = false;

	const productItems: { title: string; href: string; description: string }[] =
		[
			{
				title: "Semantic catalog",
				href: "/product#semantic-catalog",
				description:
					"Every source, table and column enriched with inferred business meanings, entities, and domain relationships.",
			},
			{
				title: "MCP integration",
				href: "/product#mcp",
				description:
					"Expose your catalog to Claude, Cursor and any MCP-compatible AI client with one toggle.",
			},
			{
				title: "BI platform",
				href: "/product#bi",
				description:
					"Explore and visualise your data with a built-in analytics layer powered by your semantic model.",
			},
		];

	const solutionItems: {
		title: string;
		href: string;
		description: string;
	}[] = [
		{
			title: "Data teams",
			href: "/solutions#data-teams",
			description:
				"Give analysts a shared vocabulary without manual tagging or lengthy governance projects.",
		},
		{
			title: "Decision Makers",
			href: "/solutions#decision-makers",
			description:
				"Let executives explore and understand their data landscape without needing to know SQL or the schema.",
		},
		{
			title: "Engineering onboarding",
			href: "/solutions#onboarding",
			description:
				"Let new engineers understand your data stack in hours instead of weeks.",
		},
	];
</script>

<header class="border-border bg-background relative z-10 border-b">
	<!-- ── Main bar ──────────────────────────────────────────────────── -->
	<div class="mx-auto flex max-w-5xl items-center px-8 py-3">
		<!-- Logo -->
		<a href="/" class="mr-2 flex items-center gap-2">
			<img src={logo} alt="nomox" class="size-5" />
			<span class="text-sm font-semibold tracking-tight">nomox</span>
		</a>

		<!-- Desktop navigation menu -->
		<NavigationMenu.Root viewport={isMobile}>
			<NavigationMenu.List class="flex-wrap">
				<NavigationMenu.Item class="hidden md:block">
					<NavigationMenu.Trigger>Solution</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<ul class="grid w-[300px] gap-4 p-2">
							{#each solutionItems as item}
								<li>
									<NavigationMenu.Link href={item.href}>
										<div class="font-medium">
											{item.title}
										</div>
										<div class="text-muted-foreground">
											{item.description}
										</div>
									</NavigationMenu.Link>
								</li>
							{/each}
						</ul>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
				<NavigationMenu.Item class="hidden md:block">
					<NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<ul class="grid w-[300px] gap-4 p-2">
							{#each productItems as item}
								<li>
									<NavigationMenu.Link href={item.href}>
										<div class="font-medium">
											{item.title}
										</div>
										<div class="text-muted-foreground">
											{item.description}
										</div>
									</NavigationMenu.Link>
								</li>
							{/each}
						</ul>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu.Root>

		<!-- Desktop right actions -->
		<div class="ml-auto hidden items-center gap-4 md:flex">
			<a
				href="/login"
				class="text-muted-foreground hover:text-foreground text-sm transition-colors"
			>
				Sign in
			</a>
			<a
				href="/waitlist"
				class="bg-foreground text-background hover:bg-foreground/85 rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors"
			>
				Request Demo
			</a>
		</div>

		<!-- Mobile hamburger -->
		<button
			class="text-foreground ml-auto flex items-center justify-center md:hidden"
			on:click={() => (menuOpen = !menuOpen)}
			aria-label={menuOpen ? "Close menu" : "Open menu"}
		>
			{#if menuOpen}
				<XIcon class="size-5" />
			{:else}
				<MenuIcon class="size-5" />
			{/if}
		</button>
	</div>

	<!-- ── Mobile collapsible menu ───────────────────────────────────── -->
	{#if menuOpen}
		<div
			transition:slide={{ duration: 220 }}
			class="border-border bg-background absolute inset-x-0 top-full border-t shadow-lg md:hidden"
		>
			<div class="mx-auto max-w-5xl px-8 py-5 flex flex-col gap-1">
				<p
					class="text-muted-foreground mb-2 text-[10px] font-semibold uppercase tracking-widest"
				>
					Solution
				</p>
				{#each solutionItems as item}
					<a
						href={item.href}
						class="text-foreground hover:text-primary py-1.5 text-sm transition-colors"
						on:click={() => (menuOpen = false)}
					>
						{item.title}
					</a>
				{/each}

				<p
					class="text-muted-foreground mb-2 mt-5 text-[10px] font-semibold uppercase tracking-widest"
				>
					Products
				</p>
				{#each productItems as item}
					<a
						href={item.href}
						class="text-foreground hover:text-primary py-1.5 text-sm transition-colors"
						on:click={() => (menuOpen = false)}
					>
						{item.title}
					</a>
				{/each}

				<div
					class="border-border mt-5 flex flex-col gap-3 border-t pt-5"
				>
					<a
						href="/login"
						class="text-muted-foreground hover:text-foreground text-sm transition-colors"
						on:click={() => (menuOpen = false)}
					>
						Sign in
					</a>
					<a
						href="/waitlist"
						class="bg-foreground text-background hover:bg-foreground/85 rounded-md px-3.5 py-2 text-center text-sm font-medium transition-colors"
						on:click={() => (menuOpen = false)}
					>
						Request Demo
					</a>
				</div>
			</div>
		</div>
	{/if}
</header>
