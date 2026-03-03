<script lang="ts">
	import { page } from "$app/stores";
	import * as Collapsible from "$lib/components/ui/collapsible/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import type { NavSection } from "./app-sidebar.svelte";

	let { items }: { items: NavSection[] } = $props();

	function sectionIsActive(basePath: string) {
		return $page.url.pathname.startsWith(basePath);
	}
	function subItemIsActive(url: string) {
		return $page.url.pathname === url;
	}
</script>

<Sidebar.Group>
	<Sidebar.Menu>
		{#each items as item (item.title)}
			<Collapsible.Root open={sectionIsActive(item.url)} class="group/collapsible">
				{#snippet child({ props })}
					<Sidebar.MenuItem {...props}>
						<Collapsible.Trigger>
							{#snippet child({ props })}
								<Sidebar.MenuButton {...props} tooltipContent={item.title}>
									{#if item.icon}
										<item.icon />
									{/if}
									<span>{item.title}</span>
									<ChevronRightIcon
										class="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
									/>
								</Sidebar.MenuButton>
							{/snippet}
						</Collapsible.Trigger>
						<Collapsible.Content>
							<Sidebar.MenuSub>
								{#each item.items as subItem (subItem.title)}
									<Sidebar.MenuSubItem>
										<Sidebar.MenuSubButton isActive={subItemIsActive(subItem.url)}>
											{#snippet child({ props })}
												<a href={subItem.url} {...props}>
													<span>{subItem.title}</span>
													{#if subItem.badge}
														<span
															class="bg-destructive text-destructive-foreground ms-auto flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-medium tabular-nums text-white"
														>
															{subItem.badge}
														</span>
													{/if}
												</a>
											{/snippet}
										</Sidebar.MenuSubButton>
									</Sidebar.MenuSubItem>
								{/each}
							</Sidebar.MenuSub>
						</Collapsible.Content>
					</Sidebar.MenuItem>
				{/snippet}
			</Collapsible.Root>
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
