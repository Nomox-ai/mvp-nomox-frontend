<script lang="ts">
	import { goto } from "$app/navigation";
	import logo from "$lib/assets/logo.svg";
	import { login } from "$lib/api/auth.js";

	let username = $state("");
	let password = $state("");
	let loading = $state(false);
	let error = $state("");

	async function handleLogin(e: Event) {
		e.preventDefault();
		error = "";
		loading = true;
		try {
			await login(username, password);
			goto("/sources/configs");
		} catch {
			error = "Invalid username or password.";
			loading = false;
		}
	}
</script>

<div class="bg-background text-foreground flex min-h-screen flex-col">

	<!-- Nav — mirrors landing page -->
	<header class="flex items-center justify-between px-8 py-6">
		<a href="/" class="flex items-center gap-2.5">
			<img src={logo} alt="nomox" class="size-6" />
			<span class="text-sm font-semibold tracking-tight">nomox</span>
		</a>
	</header>

	<!-- Form -->
	<main class="flex flex-1 items-center justify-center px-6 pb-24">
		<div class="w-full max-w-xs">
			<div class="mb-8 text-center">
				<h1 class="text-foreground text-xl font-semibold tracking-tight">Sign in</h1>
				<p class="text-muted-foreground mt-1 text-sm">Admin console access</p>
			</div>

			<form onsubmit={handleLogin} class="flex flex-col gap-3">
				<input
					id="username"
					type="text"
					placeholder="Username"
					autocomplete="username"
					bind:value={username}
					required
					class="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-lg border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1"
				/>
				<input
					id="password"
					type="password"
					placeholder="Password"
					autocomplete="current-password"
					bind:value={password}
					required
					class="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-lg border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1"
				/>

				{#if error}
					<p class="text-destructive text-xs">{error}</p>
				{/if}

				<button
					type="submit"
					disabled={loading}
					class="bg-foreground text-background hover:bg-foreground/90 mt-1 w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
				>
					{loading ? "Signing in…" : "Sign in"}
				</button>
			</form>

			<p class="text-muted-foreground mt-6 text-center text-xs">admin-only access</p>
		</div>
	</main>

</div>
