<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import logo from '$lib/assets/logo.svg';

	let email = $state('');
	let password = $state('');
	let loading = $state(false);
	let error = $state('');

	async function handleLogin(e: Event) {
		e.preventDefault();
		error = '';
		loading = true;

		// Dummy auth — replace with real API call
		await new Promise((r) => setTimeout(r, 200));

		if (email === 'admin@nomox.ai' && password === 'admin') {
			goto('/sources/playground');
		} else {
			error = 'Invalid email or password.';
			loading = false;
		}
	}
</script>

<div class="bg-background flex min-h-screen items-center justify-center px-4">
	<div class="w-full max-w-sm">

		<div class="mb-8 flex flex-col items-center gap-3">
			<img src={logo} alt="nomox" class="size-12" />
			<div class="text-center">
				<p class="text-foreground text-base font-semibold">nomox</p>
				<p class="text-muted-foreground text-sm">Admin console</p>
			</div>
		</div>

		<Card>
			<CardHeader class="pb-4">
				<CardTitle class="text-lg">Sign in</CardTitle>
				<CardDescription>Access your workspace</CardDescription>
			</CardHeader>
			<CardContent>
				<form onsubmit={handleLogin} class="flex flex-col gap-4">
					<div class="flex flex-col gap-1.5">
						<Label for="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="admin@nomox.ai"
							autocomplete="email"
							bind:value={email}
							required
						/>
					</div>

					<div class="flex flex-col gap-1.5">
						<Label for="password">Password</Label>
						<Input
							id="password"
							type="password"
							placeholder="••••••••"
							autocomplete="current-password"
							bind:value={password}
							required
						/>
					</div>

					{#if error}
						<p class="text-destructive text-sm">{error}</p>
					{/if}

					<Button type="submit" class="w-full" disabled={loading}>
						{loading ? 'Signing in…' : 'Sign in'}
					</Button>
				</form>
			</CardContent>
		</Card>

		<p class="text-muted-foreground mt-6 text-center text-xs">
			nomox · admin-only access
		</p>
	</div>
</div>
