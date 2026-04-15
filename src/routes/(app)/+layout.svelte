<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import AppSidebar from "$lib/components/app-sidebar.svelte";
	import ChatBubble from "$lib/components/chat-bubble.svelte";
	import UiSpotlight from "$lib/components/ui-spotlight.svelte";
	import DesktopOnly from "$lib/components/desktop-only.svelte";
	import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { user } from "$lib/stores/user.svelte.js";

	let { children } = $props();

	onMount(() => {
		if (!user.isLoggedIn) user.load();
	});

	// Build breadcrumb segments from the current pathname
	// e.g. /sources/playground → ["Sources", "Playground"]
	const crumbs = $derived.by(() => {
		const parts = $page.url.pathname.replace(/^\//, "").split("/").filter(Boolean);
		return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1));
	});
</script>

<DesktopOnly>
	<Sidebar.Provider>
		<AppSidebar />
		<Sidebar.Inset>
			<!-- Top bar: toggle + breadcrumb -->
			<header
				class="flex h-12 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
			>
				<Sidebar.Trigger class="-ms-1" />
				<Separator orientation="vertical" class="me-2 h-4" data-orientation="vertical" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						{#each crumbs as crumb, i (crumb)}
							{#if i > 0}
								<Breadcrumb.Separator />
							{/if}
							<Breadcrumb.Item>
								{#if i === crumbs.length - 1}
									<Breadcrumb.Page>{crumb}</Breadcrumb.Page>
								{:else}
									<Breadcrumb.Link class="hidden md:block">{crumb}</Breadcrumb.Link>
								{/if}
							</Breadcrumb.Item>
						{/each}
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</header>

			<!-- Page content -->
			{@render children()}
		</Sidebar.Inset>
	</Sidebar.Provider>

	<ChatBubble />
	<UiSpotlight />
</DesktopOnly>
