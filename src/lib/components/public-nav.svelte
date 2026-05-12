<script lang="ts">
	import logo from "$lib/assets/logo.svg";
	import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
	import MenuIcon from "@lucide/svelte/icons/menu";
	import XIcon from "@lucide/svelte/icons/x";
	import LibraryIcon from "@lucide/svelte/icons/library-big";
	import PlugIcon from "@lucide/svelte/icons/plug-2";
	import BarChartIcon from "@lucide/svelte/icons/bar-chart-3";
	import UsersIcon from "@lucide/svelte/icons/users";
	import BriefcaseIcon from "@lucide/svelte/icons/briefcase";
	import RocketIcon from "@lucide/svelte/icons/rocket";
	import type { ComponentType } from "svelte";
	import { slide } from "svelte/transition";

	let isMobile = false;
	let menuOpen = false;

	type NavItem = { title: string; href: string; Icon: ComponentType; desc: string };

	const productItems: NavItem[] = [
		{
			title: "Semantic catalog",
			href: "/product/semantic-catalog",
			Icon: LibraryIcon,
			desc: "Every column, enriched with meaning",
		},
		{
			title: "Agent integration",
			href: "/product/mcp",
			Icon: PlugIcon,
			desc: "Expose your data to AI tools",
		},
	];

	const solutionItems: NavItem[] = [
		{
			title: "Data teams",
			href: "/solutions/data-teams",
			Icon: UsersIcon,
			desc: "A shared vocabulary, automatically",
		},
		{
			title: "Decision Makers",
			href: "/solutions/decision-makers",
			Icon: BriefcaseIcon,
			desc: "Understand data without SQL",
		},
		{
			title: "Engineering onboarding",
			href: "/solutions/onboarding",
			Icon: RocketIcon,
			desc: "Map your stack in hours",
		},
	];
</script>

<header class="border-border bg-background/95 relative z-[100] border-b backdrop-blur-sm md:sticky md:top-0">
	<!-- ── Main bar ──────────────────────────────────────────────────── -->
	<div class="mx-auto flex max-w-section items-center px-8 py-3">
		<!-- Logo -->
		<a href="/" class="mr-2 flex items-center gap-2">
			<img src={logo} alt="nomox" class="size-5" />
			<span class="text-base font-medium tracking-tight" style="font-family: 'DM Mono', monospace;">nomox</span>
		</a>

		<!-- Desktop navigation menu -->
		<NavigationMenu.Root viewport={isMobile}>
			<NavigationMenu.List class="flex-wrap">
				<NavigationMenu.Item class="hidden md:block">
					<NavigationMenu.Trigger>Solution</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<ul class="grid w-[340px] gap-0.5 p-2">
							{#each solutionItems as item}
								<li>
									<NavigationMenu.Link href={item.href} class="cursor-pointer flex flex-row items-center gap-3 rounded-lg p-3 hover:bg-muted/60 transition-colors">
										<span class="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-background shrink-0">
											<svelte:component this={item.Icon} class="text-foreground size-[18px]" />
										</span>
										<div class="flex-1 min-w-0">
											<div class="text-sm font-semibold text-foreground">{item.title}</div>
											<div class="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
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
						<ul class="grid w-[340px] gap-0.5 p-2">
							{#each productItems as item}
								<li>
									<NavigationMenu.Link href={item.href} class="cursor-pointer flex flex-row items-center gap-3 rounded-lg p-3 hover:bg-muted/60 transition-colors">
										<span class="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-background shrink-0">
											<svelte:component this={item.Icon} class="text-foreground size-[18px]" />
										</span>
										<div class="flex-1 min-w-0">
											<div class="text-sm font-semibold text-foreground">{item.title}</div>
											<div class="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
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
				href="/try-it"
				class="bg-foreground text-background hover:bg-foreground/85 rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors"
			>
				Get started
			</a>
		</div>

		<!-- Mobile hamburger -->
		<button
			class="cursor-pointer text-foreground ml-auto flex items-center justify-center md:hidden"
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
			<div class="mx-auto max-w-section px-8 py-5 flex flex-col gap-1">
				<p
					class="text-muted-foreground mb-2 text-[10px] font-semibold uppercase tracking-widest"
				>
					Solution
				</p>
				{#each solutionItems as item}
					<a
						href={item.href}
						class="text-foreground hover:text-primary flex items-center gap-2.5 py-1.5 text-sm transition-colors"
						on:click={() => (menuOpen = false)}
					>
						<span class="inline-flex size-6 items-center justify-center rounded-md border border-border bg-background">
							<svelte:component this={item.Icon} class="text-primary size-3.5" />
						</span>
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
						class="text-foreground hover:text-primary flex items-center gap-2.5 py-1.5 text-sm transition-colors"
						on:click={() => (menuOpen = false)}
					>
						<span class="inline-flex size-6 items-center justify-center rounded-md border border-border bg-background">
							<svelte:component this={item.Icon} class="text-primary size-3.5" />
						</span>
						{item.title}
					</a>
				{/each}

				<p
					class="text-muted-foreground mb-2 mt-5 text-[10px] font-semibold uppercase tracking-widest"
				>
					Company
				</p>
				<a
					href="/pricing"
					class="text-foreground hover:text-primary py-1.5 text-sm transition-colors"
					on:click={() => (menuOpen = false)}
				>
					Pricing
				</a>

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
						href="/try-it"
						class="bg-foreground text-background hover:bg-foreground/85 rounded-md px-3.5 py-2 text-center text-sm font-medium transition-colors"
						on:click={() => (menuOpen = false)}
					>
						Get started
					</a>
				</div>
			</div>
		</div>
	{/if}
</header>
