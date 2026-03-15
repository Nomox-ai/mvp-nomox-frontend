<script lang="ts">
	import logo from '$lib/assets/logo.svg';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let isMobile = false;

	const productItems: { title: string; href: string; description: string }[] = [
		{
			title: 'Schema catalog',
			href: '/product#schema-catalog',
			description: 'Every source, table and column enriched with inferred business meanings and types.'
		},
		{
			title: 'Semantic model',
			href: '/product#semantic-model',
			description:
				'Entities, glossary terms and domain relationships extracted automatically from your data.'
		},
		{
			title: 'MCP integration',
			href: '/product#mcp',
			description:
				'Expose your catalog to Claude, Cursor and any MCP-compatible AI client with one toggle.'
		}
	];

	const solutionItems: { title: string; href: string; description: string }[] = [
		{
			title: 'Data teams',
			href: '/solutions#data-teams',
			description:
				'Give analysts a shared vocabulary without manual tagging or lengthy governance projects.'
		},
		{
			title: 'AI engineering',
			href: '/solutions#ai-engineering',
			description:
				'Supply your AI tools with the structured context they need to answer data questions accurately.'
		},
		{
			title: 'Engineering onboarding',
			href: '/solutions#onboarding',
			description: 'Let new engineers understand your data stack in hours instead of weeks.'
		}
	];

	type ListItemProps = HTMLAttributes<HTMLAnchorElement> & {
		title: string;
		href: string;
		content: string;
	};
</script>

<header class="border-border border-b">
	<div class="mx-auto flex max-w-5xl items-center px-8 py-3">

		<!-- Logo -->
		<a href="/" class="mr-2 flex items-center gap-2">
			<img src={logo} alt="nomox" class="size-5" />
			<span class="text-sm font-semibold tracking-tight">nomox</span>
		</a>

		<NavigationMenu.Root viewport={isMobile}>
			<NavigationMenu.List class="flex-wrap">
			<NavigationMenu.Item class="hidden md:block">
				<NavigationMenu.Trigger>Solution</NavigationMenu.Trigger>
				<NavigationMenu.Content>
					<ul class="grid w-[300px] gap-4 p-2">
						{#each solutionItems as item}
						<li>
							<NavigationMenu.Link href={item.href}>
							<div class="font-medium">{item.title}</div>
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
							<div class="font-medium">{item.title}</div>
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

		<!-- Right actions -->
		<div class="ml-auto flex items-center gap-4">
			<a href="/waitlist" class="text-muted-foreground hover:text-foreground text-sm transition-colors">
				Join waitlist
			</a>
			<a
				href="/login"
				class="bg-foreground text-background hover:bg-foreground/85 rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors"
			>
				Sign in
			</a>
		</div>

	</div>
</header>
