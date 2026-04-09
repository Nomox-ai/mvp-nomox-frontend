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

	<header class="border-border border-b px-8 py-4">
		<div class="mx-auto max-w-section">
			<a href="/" class="flex items-center gap-2">
				<img src={logo} alt="nomox" class="size-5" />
				<span class="text-sm font-semibold tracking-tight">nomox</span>
			</a>
		</div>
	</header>

	<!-- 3×3 grid: borders between cells form 2 full-height + 2 full-width lines -->
	<main class="flex-1 grid grid-cols-[1fr_auto_1fr] grid-rows-[1fr_auto_1fr]">

		<!-- Top row -->
		<div class="border-border border-b border-r"></div>
		<div class="border-border border-b"></div>
		<div class="border-border border-b border-l"></div>

		<!-- Middle row -->
		<div class="border-border border-r"></div>

		<!-- Form cell -->
		<div class="w-120 px-12 py-14">
			<p class="text-muted-foreground mb-4 font-mono text-xs">Admin access</p>
			<h1 class="text-foreground mb-8 text-2xl font-semibold tracking-tight leading-tight">
				Sign in.
			</h1>

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
					class="bg-foreground text-background hover:bg-foreground/90 mt-2 w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
				>
					{loading ? "Signing in…" : "Sign in"}
				</button>
			</form>

			<p class="text-muted-foreground mt-6 text-xs">admin-only access</p>
		</div>

		<div class="border-border border-l"></div>

		<!-- Bottom row -->
		<div class="border-border border-t border-r"></div>
		<div class="border-border border-t"></div>
		<div class="border-border border-t border-l"></div>

	</main>

	<!-- Footer -->
	<footer class="border-border border-t px-8 py-5">
		<div class="mx-auto flex max-w-section items-center justify-between">
			<div class="flex items-center gap-2">
				<img src={logo} alt="nomox" class="size-4 opacity-40" />
				<span class="text-muted-foreground text-xs">nomox</span>
			</div>
			<a href="mailto:team@get-nomox.com" class="text-muted-foreground hover:text-foreground text-xs transition-colors">team@get-nomox.com</a>
		</div>
	</footer>

</div>
