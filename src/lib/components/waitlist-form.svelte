<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';

	let email = $state('');
	let isCompany = $state(false);
	let companyName = $state('');
	let loading = $state(false);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		loading = true;

		try {
			const res = await fetch('/api/waitlist', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, is_company: isCompany, company_name: companyName })
			});

			const data = await res.json();

			if (!res.ok || !data.success) {
				toast.error(data.error ?? 'Something went wrong. Please try again.');
			} else {
				toast.success("You're on the list! We'll be in touch soon.");
				email = '';
				isCompany = false;
				companyName = '';
			}
		} catch {
			toast.error('Network error. Please check your connection and try again.');
		} finally {
			loading = false;
		}
	}
</script>

<form onsubmit={handleSubmit} class="flex w-full flex-col gap-4">
	<div class="flex flex-col gap-1.5">
		<Label for="wl-email">Email</Label>
		<Input
			id="wl-email"
			type="email"
			placeholder="your@email.com"
			bind:value={email}
			required
			autocomplete="email"
		/>
	</div>

	<div class="flex items-center gap-2.5">
		<Checkbox id="wl-company" bind:checked={isCompany} />
		<Label for="wl-company" class="cursor-pointer font-normal text-muted-foreground">
			I represent a company
		</Label>
	</div>

	{#if isCompany}
		<div class="flex flex-col gap-1.5">
			<Label for="wl-company-name">Company name</Label>
			<Input
				id="wl-company-name"
				type="text"
				placeholder="Acme Corp"
				bind:value={companyName}
				required={isCompany}
				autocomplete="organization"
			/>
		</div>
	{/if}

	<Button type="submit" disabled={loading} class="w-full">
		{loading ? 'Submitting…' : 'Join the waitlist'}
	</Button>
</form>
