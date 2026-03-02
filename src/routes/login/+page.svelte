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

<div class="bg-background relative flex min-h-screen items-center justify-center px-4">
	<!-- Top-left logo -->
	<div class="absolute top-6 left-6 flex items-center gap-2.5">
		<img src={logo} alt="nomox" class="size-10" />
		<span class="text-foreground text-10 font-semibold">nomox</span>
	</div>

	<div class="w-full max-w-sm">
		<Card>
			<CardHeader class="pb-4">
				<CardTitle class="text-xl text-center">Sign in</CardTitle>
				<CardDescription class="text-center">Access your workspace</CardDescription>
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
