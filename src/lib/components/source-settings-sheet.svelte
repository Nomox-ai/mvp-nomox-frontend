<script lang="ts">
	import * as Drawer from "$lib/components/ui/drawer/index.js";
	import Button from "$lib/components/ui/button/button.svelte";
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
	import MongodbIcon from "$lib/assets/icons/mongodb-icon.svelte";
	import PostgresqlIcon from "$lib/assets/icons/postgresql-icon.svelte";
	import { ConnectorType } from "$lib/types/connector.js";
	import type { AnyConnectorModel } from "$lib/types/connector.js";
	import { getConnector, updateConnector, deleteConnector } from "$lib/api/connectors.js";
	import { user } from "$lib/stores/user.svelte.js";

	let {
		open = $bindable(false),
		connectorId,
		connectorType,
		onupdate,
		ondelete,
	}: {
		open: boolean;
		connectorId: string;
		connectorType: ConnectorType;
		onupdate?: (model: AnyConnectorModel) => void;
		ondelete?: (id: string) => void;
	} = $props();

	// ─── Local state ──────────────────────────────────────────────────────────

	let fetching = $state(true);
	let saving = $state(false);
	let deleting = $state(false);
	let confirmDelete = $state(false);
	let saveError = $state("");

	// Shared
	let description = $state("");

	// MongoDB
	let mongoConnectionUrl = $state("");
	let mongoDatabase = $state("");
	let mongoSchemaCollection = $state("_schema");
	let mongoCaseInsensitive = $state(false);

	// PostgreSQL
	let pgHost = $state("");
	let pgPort = $state(5432);
	let pgDatabase = $state("");
	let pgUsername = $state("");
	let pgPassword = $state("");

	// ─── Load config when drawer opens ────────────────────────────────────────

	$effect(() => {
		if (open && connectorId) {
			fetching = true;
			saveError = "";
			confirmDelete = false;
			loadConfig();
		}
	});

	async function loadConfig() {
		try {
			const cfg = await getConnector(connectorId);
			const c = cfg.connector;
			description = c.description ?? "";
			if (c.connector_type === ConnectorType.MONGODB) {
				mongoConnectionUrl = c.connection_url;
				mongoDatabase = c.database ?? "";
				mongoSchemaCollection = c.schema_collection ?? "_schema";
				mongoCaseInsensitive = c.case_insensitive_name_matching ?? false;
			} else {
				pgHost = c.host;
				pgPort = c.port ?? 5432;
				pgDatabase = c.database;
				pgUsername = c.username;
				pgPassword = c.password;
			}
		} catch {
			saveError = "Failed to load connector config.";
		} finally {
			fetching = false;
		}
	}

	// ─── Actions ──────────────────────────────────────────────────────────────

	async function handleSave() {
		saving = true;
		saveError = "";
		try {
			let model: AnyConnectorModel;
			if (connectorType === ConnectorType.MONGODB) {
				model = {
					connector_id: connectorId,
					connector_type: ConnectorType.MONGODB,
					description: description.trim() || undefined,
					connection_url: mongoConnectionUrl.trim(),
					database: mongoDatabase.trim() || undefined,
					schema_collection: mongoSchemaCollection.trim() || "_schema",
					case_insensitive_name_matching: mongoCaseInsensitive,
				};
			} else {
				model = {
					connector_id: connectorId,
					connector_type: ConnectorType.POSTGRESQL,
					description: description.trim() || undefined,
					host: pgHost.trim(),
					port: pgPort,
					database: pgDatabase.trim(),
					username: pgUsername.trim(),
					password: pgPassword,
				};
			}
			await updateConnector(connectorId, model);
			onupdate?.(model);
			open = false;
		} catch (e) {
			saveError = e instanceof Error ? e.message : "Failed to save.";
		} finally {
			saving = false;
		}
	}

	async function handleDelete() {
		deleting = true;
		try {
			await deleteConnector(connectorId);
			ondelete?.(connectorId);
			open = false;
		} catch (e) {
			saveError = e instanceof Error ? e.message : "Failed to delete.";
			deleting = false;
			confirmDelete = false;
		}
	}
</script>

<Drawer.Root
	bind:open
	direction="right"
	shouldScaleBackground={false}
	onOpenChange={(v) => { if (!v) confirmDelete = false; }}
>
	<Drawer.Portal>
		<Drawer.Overlay class="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]" />
		<Drawer.Content
			class="rounded-l-xl border-y border-l border-border shadow-xl flex flex-col !w-[540px] !max-w-[95vw]"
		>
			<!-- Header -->
			<Drawer.Header class="flex flex-row items-start justify-between border-b border-border px-6 py-5 shrink-0">
				<div class="flex items-center gap-3">
					<div class="flex size-8 items-center justify-center rounded-lg bg-muted">
						{#if connectorType === ConnectorType.MONGODB}
							<MongodbIcon class="size-5" />
						{:else}
							<PostgresqlIcon class="size-5" />
						{/if}
					</div>
					<div>
						<Drawer.Title class="font-mono text-sm font-semibold leading-none">
							{connectorId}
						</Drawer.Title>
						<Drawer.Description class="text-muted-foreground mt-1 text-xs">
							{connectorType === ConnectorType.MONGODB ? "MongoDB" : "PostgreSQL"} · Source settings
						</Drawer.Description>
					</div>
				</div>
				<Drawer.Close class="text-muted-foreground hover:text-foreground hover:bg-accent -mt-1 -mr-1 rounded-md p-1.5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring">
					<svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M18 6 6 18"/><path d="m6 6 12 12"/>
					</svg>
				</Drawer.Close>
			</Drawer.Header>

			<!-- Scrollable body -->
			<div class="no-scrollbar flex-1 overflow-y-auto px-6 py-5 space-y-5">
				{#if fetching}
					<div class="space-y-4">
						<Skeleton class="h-5 w-24" />
						<Skeleton class="h-16 w-full rounded-md" />
						<Skeleton class="h-px w-full" />
						<Skeleton class="h-5 w-32" />
						<Skeleton class="h-9 w-full rounded-md" />
						<Skeleton class="h-9 w-full rounded-md" />
					</div>
				{:else}
					<!-- Description -->
					<div class="space-y-1.5">
						<Label for="sheet-desc" class="flex gap-1.5">
							Description
							<span class="text-muted-foreground font-normal">(optional)</span>
						</Label>
						<textarea
							id="sheet-desc"
							bind:value={description}
							placeholder="What does this source contain? Who uses it?"
							rows="3"
							readonly={user.isHost}
							class="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2 resize-none {user.isHost ? 'opacity-60 cursor-default' : ''}"
						></textarea>
					</div>

					<div class="border-t border-border"></div>

					<!-- MongoDB connection fields -->
					{#if connectorType === ConnectorType.MONGODB}
						<div class="space-y-4">
							<p class="text-muted-foreground text-xs font-medium uppercase tracking-wide">Connection</p>

							<div class="space-y-1.5">
								<Label for="sheet-mongo-url">
									Connection URL <span class="text-destructive">*</span>
								</Label>
								<Input
								id="sheet-mongo-url"
								bind:value={mongoConnectionUrl}
								placeholder="mongodb+srv://user:pass@cluster.mongodb.net"
								class="font-mono text-sm"
								type="password"
								 disabled={user.isHost}
							/>
								<p class="text-muted-foreground text-xs">Credentials are stored securely in the backend.</p>
							</div>

							<div class="space-y-1.5">
								<Label for="sheet-mongo-db" class="flex gap-1.5">
									Database
									<span class="text-muted-foreground font-normal">(optional)</span>
								</Label>
								<Input id="sheet-mongo-db" bind:value={mongoDatabase} placeholder="my-database" class="font-mono text-sm" disabled={user.isHost} />
							</div>

							<div class="space-y-1.5">
								<Label for="sheet-mongo-schema" class="flex gap-1.5">
									Schema collection
									<span class="text-muted-foreground font-normal">(optional)</span>
								</Label>
								<Input id="sheet-mongo-schema" bind:value={mongoSchemaCollection} placeholder="_schema" class="font-mono text-sm" disabled={user.isHost} />
							</div>

							<label class="flex cursor-pointer items-center gap-3">
								<input type="checkbox" bind:checked={mongoCaseInsensitive} class="border-input size-4 rounded accent-primary" disabled={user.isHost} />
								<span class="text-sm">Case-insensitive name matching</span>
							</label>
						</div>

					<!-- PostgreSQL connection fields -->
					{:else}
						<div class="space-y-4">
							<p class="text-muted-foreground text-xs font-medium uppercase tracking-wide">Connection</p>

							<div class="grid grid-cols-3 gap-3">
								<div class="col-span-2 space-y-1.5">
									<Label for="sheet-pg-host">Host <span class="text-destructive">*</span></Label>
									<Input id="sheet-pg-host" bind:value={pgHost} placeholder="db.example.com" class="font-mono text-sm" disabled={user.isHost} />
								</div>
								<div class="space-y-1.5">
									<Label for="sheet-pg-port">Port</Label>
									<Input id="sheet-pg-port" bind:value={pgPort} type="number" min={1} max={65535} class="font-mono text-sm" disabled={user.isHost} />
								</div>
							</div>

							<div class="space-y-1.5">
								<Label for="sheet-pg-db">Database <span class="text-destructive">*</span></Label>
								<Input id="sheet-pg-db" bind:value={pgDatabase} placeholder="my_database" class="font-mono text-sm" disabled={user.isHost} />
							</div>

							<div class="grid grid-cols-2 gap-3">
								<div class="space-y-1.5">
									<Label for="sheet-pg-user">Username <span class="text-destructive">*</span></Label>
									<Input id="sheet-pg-user" bind:value={pgUsername} placeholder="postgres" class="font-mono text-sm" disabled={user.isHost} />
								</div>
								<div class="space-y-1.5">
									<Label for="sheet-pg-pass">Password <span class="text-destructive">*</span></Label>
									<Input id="sheet-pg-pass" bind:value={pgPassword} type="password" placeholder="••••••••" class="font-mono text-sm" disabled={user.isHost} />
								</div>
							</div>
						</div>
					{/if}
				{/if}
			</div>

			<!-- Footer -->
			<Drawer.Footer class="border-t border-border px-6 py-4 shrink-0">
				{#if confirmDelete}
				<div class="flex items-center justify-between">
				<p class="text-sm text-destructive font-medium">Delete this source permanently?</p>
				<div class="flex items-center gap-2">
				<Button variant="ghost" size="sm" onclick={() => (confirmDelete = false)}>Cancel</Button>
				<Button variant="destructive" size="sm" onclick={handleDelete} disabled={deleting}>
				{deleting ? "Deleting…" : "Confirm delete"}
				</Button>
				</div>
				</div>
				{:else if user.isHost}
				<div class="flex items-center justify-end">
				<p class="text-muted-foreground text-xs">Read-only &mdash; contact your admin to make changes.</p>
				</div>
				{:else}
				<div class="flex items-center justify-end gap-2">
				{#if saveError}
				<p class="text-destructive text-xs mr-1">{saveError}</p>
				{/if}
				<Button
				variant="ghost"
				 size="sm"
				class="text-destructive/70 hover:text-destructive hover:bg-destructive/5"
				 onclick={() => (confirmDelete = true)}
				 disabled={fetching}
				>
				 Delete source
				 </Button>
				  <Button size="sm" onclick={handleSave} disabled={fetching || saving}>
						{saving ? "Saving…" : "Save changes"}
					</Button>
				</div>
			{/if}
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Portal>
</Drawer.Root>
