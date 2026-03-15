<script lang="ts">
	import logo from '$lib/assets/logo.svg';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';

	const product = [
		{
			href: '/product#schema-catalog',
			title: 'Schema catalog',
			desc: 'Every source, table and column enriched with inferred business meanings and types.'
		},
		{
			href: '/product#semantic-model',
			title: 'Semantic model',
			desc: 'Entities, glossary terms and domain relationships extracted automatically from your data.'
		},
		{
			href: '/product#mcp',
			title: 'MCP integration',
			desc: 'Expose your catalog to Claude, Cursor and any MCP-compatible AI client with one toggle.'
		}
	];

	const solutions = [
		{
			href: '/solutions#data-teams',
			title: 'Data teams',
			desc: 'Give analysts a shared vocabulary without manual tagging or lengthy governance projects.'
		},
		{
			href: '/solutions#ai-engineering',
			title: 'AI engineering',
			desc: 'Supply your AI tools with the structured context they need to answer data questions accurately.'
		},
		{
			href: '/solutions#onboarding',
			title: 'Engineering onboarding',
			desc: 'Let new engineers understand your data stack in hours instead of weeks.'
		}
	];
</script>

<header class="border-border border-b">
	<div class="mx-auto flex max-w-5xl items-center justify-between px-8 py-4">

		<!-- Logo + nav (left-aligned together) -->
		<div class="flex items-center gap-1">
		<a href="/" class="flex items-center gap-2.5 mr-2">
			<img src={logo} alt="nomox" class="size-5" />
			<span class="text-sm font-semibold tracking-tight">nomox</span>
		</a>

		<!-- Nav menu -->
		<NavigationMenu.Root>
			<NavigationMenu.List>

				<!-- Product -->
				<NavigationMenu.Item>
					<NavigationMenu.Trigger class="text-muted-foreground hover:text-foreground! bg-transparent! text-sm">
						Product
					</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<ul class="grid w-[480px] grid-cols-1 gap-0.5 p-3">
							{#each product as item}
								<li>
									<NavigationMenu.Link href={item.href}>
										<span class="text-foreground text-sm font-medium">{item.title}</span>
										<span class="text-muted-foreground text-xs leading-snug">{item.desc}</span>
									</NavigationMenu.Link>
								</li>
							{/each}
						</ul>
					</NavigationMenu.Content>
				</NavigationMenu.Item>

				<!-- Solutions -->
				<NavigationMenu.Item>
					<NavigationMenu.Trigger class="text-muted-foreground hover:text-foreground! bg-transparent! text-sm">
						Solutions
					</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<ul class="grid w-[480px] grid-cols-1 gap-0.5 p-3">
							{#each solutions as item}
								<li>
									<NavigationMenu.Link href={item.href}>
										<span class="text-foreground text-sm font-medium">{item.title}</span>
										<span class="text-muted-foreground text-xs leading-snug">{item.desc}</span>
									</NavigationMenu.Link>
								</li>
							{/each}
						</ul>
					</NavigationMenu.Content>
				</NavigationMenu.Item>

			</NavigationMenu.List>
		</NavigationMenu.Root>
		</div>

		<!-- Right actions -->
		<div class="flex items-center gap-5">
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
