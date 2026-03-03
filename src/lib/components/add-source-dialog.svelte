<script lang="ts">
	import { Dialog } from "bits-ui";
	import Button from "$lib/components/ui/button/button.svelte";
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import { cn } from "$lib/utils.js";
	import XIcon from "@lucide/svelte/icons/x";
	import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
	import ArrowLeftIcon from "@lucide/svelte/icons/arrow-left";
	import CheckIcon from "@lucide/svelte/icons/check";
	import { ConnectorType } from "$lib/types/connector.js";
	import type { AnyConnectorModel } from "$lib/types/connector.js";
	import MongodbIcon from "$lib/assets/icons/mongodb-icon.svelte";
	import PostgresqlIcon from "$lib/assets/icons/postgresql-icon.svelte";

	let {
		open = $bindable(false),
		oncreate,
	}: {
		open: boolean;
		oncreate?: (model: AnyConnectorModel) => void;
	} = $props();

	let step = $state(1);

	// Step 1
	let connectorId = $state("");
	let selectedType = $state<ConnectorType | null>(null);
	let owner = $state("");

	// Step 2 — shared
	let description = $state("");

	// Step 2 — MongoDB
	let mongoConnectionUrl = $state("");
	let mongoDatabase = $state("");
	let mongoSchemaCollection = $state("_schema");
	let mongoCaseInsensitive = $state(false);

	// Step 2 — PostgreSQL
	let pgHost = $state("");
	let pgPort = $state(5432);
	let pgDatabase = $state("");
	let pgUsername = $state("");
	let pgPassword = $state("");

	const canProceed = $derived(connectorId.trim().length > 0 && selectedType !== null);

	const canCreate = $derived(
		selectedType === ConnectorType.MONGODB
			? mongoConnectionUrl.trim().length > 0
			: pgHost.trim().length > 0 &&
					pgDatabase.trim().length > 0 &&
					pgUsername.trim().length > 0 &&
					pgPassword.trim().length > 0
	);

	function reset() {
		step = 1;
		connectorId = "";
		selectedType = null;
		owner = "";
		description = "";
		mongoConnectionUrl = "";
		mongoDatabase = "";
		mongoSchemaCollection = "_schema";
		mongoCaseInsensitive = false;
		pgHost = "";
		pgPort = 5432;
		pgDatabase = "";
		pgUsername = "";
		pgPassword = "";
	}

	function handleOpenChange(v: boolean) {
		if (!v) reset();
		open = v;
	}

	function handleCreate() {
		if (!selectedType) return;

		let model: AnyConnectorModel;
		if (selectedType === ConnectorType.MONGODB) {
			model = {
				connector_id: connectorId.trim(),
				connector_type: ConnectorType.MONGODB,
				description: description.trim() || undefined,
				connection_url: mongoConnectionUrl.trim(),
				database: mongoDatabase.trim() || undefined,
				schema_collection: mongoSchemaCollection.trim() || "_schema",
				case_insensitive_name_matching: mongoCaseInsensitive,
			};
		} else {
			model = {
				connector_id: connectorId.trim(),
				connector_type: ConnectorType.POSTGRESQL,
				description: description.trim() || undefined,
				host: pgHost.trim(),
				port: pgPort,
				database: pgDatabase.trim(),
				username: pgUsername.trim(),
				password: pgPassword,
			};
		}

		oncreate?.(model);
		open = false;
		reset();
	}

	const sourceTypes = [
		{
			type: ConnectorType.MONGODB,
			label: "MongoDB",
			description: "Document database",
			icon: MongodbIcon,
		},
		{
			type: ConnectorType.POSTGRESQL,
			label: "PostgreSQL",
			description: "Relational database",
			icon: PostgresqlIcon,
		},
	];
</script>

<Dialog.Root {open} onOpenChange={handleOpenChange}>
	<Dialog.Portal>
		<Dialog.Overlay
			class="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
		/>
		<Dialog.Content
			class="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[520px] max-w-[95vw] bg-background border border-border rounded-xl shadow-xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
		>
			<!-- Header -->
			<div class="flex items-start justify-between px-6 pt-6 pb-4">
				<div>
					<Dialog.Title class="text-base font-semibold leading-none">
						Add data source
					</Dialog.Title>
					<Dialog.Description class="text-muted-foreground mt-1.5 text-sm">
						{step === 1 ? "Choose a source type and give it a name." : "Fill in the connection details."}
					</Dialog.Description>
				</div>
				<Dialog.Close
					class="text-muted-foreground hover:text-foreground hover:bg-accent -mt-1 -mr-1 rounded-md p-1.5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					<XIcon class="size-4" />
				</Dialog.Close>
			</div>

			<!-- Step indicator -->
			<div class="flex items-center gap-2 px-6 pb-5">
				{#each [1, 2] as s (s)}
					<div class="flex items-center gap-2">
						<div
							class={cn(
								"flex size-5 items-center justify-center rounded-full text-[11px] font-semibold transition-colors",
								step >= s
									? "bg-primary text-primary-foreground"
									: "bg-muted text-muted-foreground"
							)}
						>
							{s}
						</div>
						<span
							class={cn(
								"text-xs font-medium transition-colors",
								step === s ? "text-foreground" : "text-muted-foreground"
							)}
						>
							{s === 1 ? "Source type" : "Connection"}
						</span>
					</div>
					{#if s < 2}
						<div class="mx-1 h-px flex-1 bg-border"></div>
					{/if}
				{/each}
			</div>

			<div class="border-t border-border"></div>

			<!-- Step 1 -->
			{#if step === 1}
				<div class="px-6 pt-5 pb-6 space-y-5">
					<!-- Name input -->
					<div class="space-y-1.5">
						<Label for="connector-id">Source name</Label>
						<Input
							id="connector-id"
							bind:value={connectorId}
							placeholder="e.g. analytics-mongo"
							class="font-mono text-sm"
			
						/>
						<p class="text-muted-foreground text-xs">
							Used as the Trino catalog name - must be unique, lowercase, no spaces.
						</p>
					</div>

					<!-- Source type -->
					<div class="space-y-2">
						<Label>Source type</Label>
						<div class="grid grid-cols-2 gap-3">
							{#each sourceTypes as src (src.type)}
								{@const Icon = src.icon}
								<button
									type="button"
									onclick={() => (selectedType = src.type)}
									class={cn(
										"relative flex items-center gap-3 rounded-lg border p-3.5 text-left transition-all outline-none",
										"focus-visible:ring-2 focus-visible:ring-ring",
										selectedType === src.type
											? "border-primary bg-primary/5 ring-1 ring-primary"
											: "border-border hover:border-border/80 hover:bg-accent/50"
									)}
								>
									<div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
										<Icon class="size-5" />
									</div>
									<div class="min-w-0">
										<p class="text-sm font-medium leading-none">{src.label}</p>
										<p class="text-muted-foreground mt-1 text-xs">{src.description}</p>
									</div>
									{#if selectedType === src.type}
										<div
											class="absolute right-2 top-2 flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground"
										>
											<CheckIcon class="size-2.5" />
										</div>
									{/if}
								</button>
							{/each}
						</div>
					</div>

					<div class="space-y-1.5">
						<Label for="owner" class="flex gap-1.5">
							Owner
							<span class="text-muted-foreground font-normal">(optional)</span>
						</Label>
						<Input id="owner" bind:value={owner} placeholder="e.g. data-engineering" />
					</div>
				</div>
			{/if}

			<!-- Step 2 — MongoDB -->
			{#if step === 2 && selectedType === ConnectorType.MONGODB}
				<div class="px-6 pt-5 pb-6 space-y-4">
					<div class="flex items-center gap-2.5 pb-1">
						<div class="flex size-7 items-center justify-center rounded-md bg-muted">
							<MongodbIcon class="size-4" />
						</div>
						<span class="text-sm font-medium">MongoDB connection</span>
					</div>

					<div class="space-y-1.5">
						<Label for="add-desc-mongo" class="flex gap-1.5">
							Description
							<span class="text-muted-foreground font-normal">(optional)</span>
						</Label>
						<textarea
							id="add-desc-mongo"
							bind:value={description}
							placeholder="What does this source contain? Who uses it?"
							rows="2"
							class="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2 resize-none"
						></textarea>
					</div>

					<div class="space-y-1.5">
						<Label for="mongo-url">Connection URL <span class="text-destructive">*</span></Label>
						<Input
							id="mongo-url"
							bind:value={mongoConnectionUrl}
							placeholder="mongodb+srv://user:pass@cluster.mongodb.net"
							class="font-mono text-sm"
							type="password"
						/>
						<p class="text-muted-foreground text-xs">
							Include credentials in the URL — they will be stored securely.
						</p>
					</div>

					<div class="space-y-1.5">
						<Label for="mongo-db" class="flex gap-1.5">
							Database
							<span class="text-muted-foreground font-normal">(optional)</span>
						</Label>
						<Input
							id="mongo-db"
							bind:value={mongoDatabase}
							placeholder="my-database"
							class="font-mono text-sm"
						/>
						<p class="text-muted-foreground text-xs">
							Restrict schema visibility to a single database.
						</p>
					</div>

					<div class="space-y-1.5">
						<Label for="mongo-schema-col" class="flex gap-1.5">
							Schema collection
							<span class="text-muted-foreground font-normal">(optional)</span>
						</Label>
						<Input
							id="mongo-schema-col"
							bind:value={mongoSchemaCollection}
							placeholder="_schema"
							class="font-mono text-sm"
						/>
					</div>

					<label class="flex cursor-pointer items-center gap-3">
						<input
							type="checkbox"
							bind:checked={mongoCaseInsensitive}
							class="border-input size-4 rounded accent-primary"
						/>
						<span class="text-sm">Case-insensitive name matching</span>
					</label>
				</div>
			{/if}

			<!-- Step 2 — PostgreSQL -->
			{#if step === 2 && selectedType === ConnectorType.POSTGRESQL}
				<div class="px-6 pt-5 pb-6 space-y-4">
					<div class="flex items-center gap-2.5 pb-1">
						<div class="flex size-7 items-center justify-center rounded-md bg-muted">
							<PostgresqlIcon class="size-4" />
						</div>
						<span class="text-sm font-medium">PostgreSQL connection</span>
					</div>

					<div class="space-y-1.5">
						<Label for="add-desc-pg" class="flex gap-1.5">
							Description
							<span class="text-muted-foreground font-normal">(optional)</span>
						</Label>
						<textarea
							id="add-desc-pg"
							bind:value={description}
							placeholder="What does this source contain? Who uses it?"
							rows="2"
							class="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2 resize-none"
						></textarea>
					</div>

					<div class="grid grid-cols-3 gap-3">
						<div class="col-span-2 space-y-1.5">
							<Label for="pg-host">Host <span class="text-destructive">*</span></Label>
							<Input
								id="pg-host"
								bind:value={pgHost}
								placeholder="db.example.com"
								class="font-mono text-sm"
							/>
						</div>
						<div class="space-y-1.5">
							<Label for="pg-port">Port</Label>
							<Input
								id="pg-port"
								bind:value={pgPort}
								type="number"
								min={1}
								max={65535}
								class="font-mono text-sm"
							/>
						</div>
					</div>

					<div class="space-y-1.5">
						<Label for="pg-db">Database <span class="text-destructive">*</span></Label>
						<Input
							id="pg-db"
							bind:value={pgDatabase}
							placeholder="my_database"
							class="font-mono text-sm"
						/>
					</div>

					<div class="grid grid-cols-2 gap-3">
						<div class="space-y-1.5">
							<Label for="pg-user">Username <span class="text-destructive">*</span></Label>
							<Input
								id="pg-user"
								bind:value={pgUsername}
								placeholder="postgres"
								class="font-mono text-sm"
							/>
						</div>
						<div class="space-y-1.5">
							<Label for="pg-pass">Password <span class="text-destructive">*</span></Label>
							<Input
								id="pg-pass"
								bind:value={pgPassword}
								type="password"
								placeholder="••••••••"
								class="font-mono text-sm"
							/>
						</div>
					</div>
				</div>
			{/if}

			<!-- Footer -->
			<div class="border-t border-border flex items-center justify-between px-6 py-4">
				{#if step === 1}
					<Dialog.Close>
						<Button variant="ghost" size="sm">Cancel</Button>
					</Dialog.Close>
					<Button size="sm" onclick={() => (step = 2)} disabled={!canProceed}>
						Next
						<ArrowRightIcon />
					</Button>
				{:else}
					<Button variant="ghost" size="sm" onclick={() => (step = 1)}>
						<ArrowLeftIcon />
						Back
					</Button>
					<Button size="sm" onclick={handleCreate} disabled={!canCreate}>
						Add source
					</Button>
				{/if}
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>