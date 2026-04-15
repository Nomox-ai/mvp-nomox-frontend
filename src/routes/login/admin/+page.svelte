<script lang="ts">
	import { goto } from "$app/navigation";
	import logo from "$lib/assets/logo.svg";
	import { login, getMe } from "$lib/api/auth.js";
	import { user } from "$lib/stores/user.svelte.js";

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
			const me = await getMe();
			user.set(me);
			goto("/sources/configs");
		} catch {
			error = "Invalid username or password.";
			loading = false;
		}
	}
</script>

<div class="bg-background text-foreground flex min-h-screen flex-col">

	<header class="border-border border-b px-4 py-4 sm:px-8">
		<div class="mx-auto max-w-section">
			<a href="/" class="flex items-center gap-2">
				<img src={logo} alt="nomox" class="size-5" />
				<span class="text-sm font-semibold tracking-tight">nomox</span>
			</a>
		</div>
	</header>

	<main class="flex-1 flex items-center justify-center sm:grid sm:grid-cols-[1fr_auto_1fr] sm:grid-rows-[1fr_auto_1fr]">
		<div class="border-border hidden sm:block border-b border-r"></div>
		<div class="border-border hidden sm:block border-b"></div>
		<div class="border-border hidden sm:block border-b border-l"></div>

		<div class="border-border hidden sm:block border-r"></div>

		<div class="w-full max-w-sm px-6 py-10 sm:w-120 sm:max-w-none sm:px-12 sm:py-14">
			<p class="text-muted-foreground mb-4 font-mono text-xs">Limited access</p>
			<h1 class="text-foreground mb-8 text-2xl font-semibold tracking-tight leading-tight">
				Admin sign in.
			</h1>

			<form onsubmit={handleLogin} class="flex flex-col gap-3">
				<input
					id="username"
					type="text"
					placeholder="Username"
					autocomplete="username"
					bind:value={username}
					required
					class="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1"
				/>
				<input
					id="password"
					type="password"
					placeholder="Password"
					autocomplete="current-password"
					bind:value={password}
					required
					class="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1"
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

			<p class="text-muted-foreground mt-8 text-center text-xs">
				<a href="/login" class="hover:text-foreground transition-colors underline underline-offset-4">
					← Back
				</a>
			</p>
		</div>

		<div class="border-border hidden sm:block border-l"></div>

		<div class="border-border hidden sm:block border-t border-r"></div>
		<div class="border-border hidden sm:block border-t"></div>
		<div class="border-border hidden sm:block border-t border-l"></div>
	</main>

	<footer class="border-border border-t px-4 py-5 sm:px-8">
		<div class="mx-auto flex max-w-section items-center justify-between">
			<div class="flex items-center gap-2">
				<img src={logo} alt="nomox" class="size-4 opacity-40" />
				<span class="text-muted-foreground text-xs">nomox</span>
			</div>
			<a href="mailto:team@get-nomox.com" class="text-muted-foreground hover:text-foreground text-xs transition-colors">team@get-nomox.com</a>
		</div>
	</footer>

</div>
