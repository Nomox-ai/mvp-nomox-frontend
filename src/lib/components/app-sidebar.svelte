<script lang="ts" module>
	import ServerIcon from "@lucide/svelte/icons/server";
	import BookOpenIcon from "@lucide/svelte/icons/book-open";
	import BlocksIcon from "@lucide/svelte/icons/blocks";
	import UsersIcon from "@lucide/svelte/icons/users";

	export type SubItem = { title: string; url: string; badge?: number };
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export type NavSection = { title: string; url: string; icon: any; items: SubItem[] };

	export const navItems: NavSection[] = [
		{
			title: "Sources",
			url: "/sources",
			icon: ServerIcon,
			items: [
				{ title: "Configs",    url: "/sources/configs" },
				{ title: "Playground", url: "/sources/playground" },
				{ title: "Schemas",    url: "/sources/schemas" },
			],
		},
		{
			title: "Catalog",
			url: "/catalog",
			icon: BookOpenIcon,
			items: [
				{ title: "Schema",    url: "/catalog/schema" },
				{ title: "Semantics", url: "/catalog/semantics" },
				{ title: "Reviews",   url: "/catalog/reviews", badge: 3 },
			],
		},
		{
			title: "Integrations",
			url: "/integrations",
			icon: BlocksIcon,
			items: [
				{ title: "MCP",       url: "/integrations/mcp" },
				{ title: "Inference", url: "/integrations/inference" },
			],
		},
		{
			title: "Team",
			url: "/team",
			icon: UsersIcon,
			items: [
				{ title: "Roles", url: "/team/roles" },
				{ title: "Users", url: "/team/users" },
			],
		},
	];

	export const adminUser = {
		name: "Admin",
		email: "admin@nomox.ai",
		avatar: "",
	};
</script>

<script lang="ts">
	import NavMain from "./nav-main.svelte";
	import NavUser from "./nav-user.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import type { ComponentProps } from "svelte";
	import logo from "$lib/assets/logo.svg";

	let {
		ref = $bindable(null),
		collapsible = "icon",
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root {collapsible} bind:ref {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg" class="pointer-events-none cursor-default">
					{#snippet child({ props })}
						<div {...props}>
							<img src={logo} alt="nomox" class="size-8 shrink-0" />
							<div class="grid flex-1 text-start text-sm leading-tight">
								<span class="truncate font-semibold">nomox</span>
								<span class="text-sidebar-foreground/50 truncate text-xs">Admin console</span>
							</div>
						</div>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>

	<Sidebar.Content>
		<NavMain items={navItems} />
	</Sidebar.Content>

	<Sidebar.Footer>
		<NavUser user={adminUser} />
	</Sidebar.Footer>

	<Sidebar.Rail />
</Sidebar.Root>
