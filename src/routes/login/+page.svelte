<script lang="ts">
	import logo from "$lib/assets/logo.svg";
	import { requestOtp, verifyOtp, getMe } from "$lib/api/auth.js";
	import { user } from "$lib/stores/user.svelte.js";
	import { goto } from "$app/navigation";

	type Step = "email" | "otp" | "sent";

	let step = $state<Step>("email");
	let email = $state("");
	let otp = $state("");
	let loading = $state(false);
	let error = $state("");

	async function handleEmailSubmit(e: Event) {
		e.preventDefault();
		error = "";
		loading = true;
		try {
			await requestOtp(email);
			step = "otp";
		} catch {
			error = "Something went wrong. Please try again.";
		} finally {
			loading = false;
		}
	}

	async function handleOtpSubmit(e: Event) {
		e.preventDefault();
		error = "";
		loading = true;
		try {
			await verifyOtp(email, otp);
			const me = await getMe();
			user.set(me);
			goto("/sources/configs");
		} catch {
			error = "Invalid or expired code. Please try again.";
		} finally {
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

	<main class="flex-1 grid grid-cols-[1fr_auto_1fr] grid-rows-[1fr_auto_1fr]">
		<div class="border-border border-b border-r"></div>
		<div class="border-border border-b"></div>
		<div class="border-border border-b border-l"></div>

		<div class="border-border border-r"></div>

		<div class="w-120 px-12 py-14">
			{#if step === "email"}
				<p class="text-muted-foreground mb-4 font-mono text-xs">Get started</p>
				<h1 class="text-foreground mb-8 text-2xl font-semibold tracking-tight leading-tight">
					Sign in.
				</h1>

				<form onsubmit={handleEmailSubmit} class="flex flex-col gap-3">
					<input
						id="email"
						type="email"
						placeholder="Email address"
						autocomplete="email"
						bind:value={email}
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
						{loading ? "Sending…" : "Send sign-in code"}
					</button>
				</form>

				<p class="text-muted-foreground mt-8 text-center text-xs">
					<a href="/login/admin" class="hover:text-foreground transition-colors underline underline-offset-4">
						Login as admin
					</a>
				</p>

			{:else if step === "otp"}
				<p class="text-muted-foreground mb-4 font-mono text-xs">Check your inbox</p>
				<h1 class="text-foreground mb-3 text-2xl font-semibold tracking-tight leading-tight">
					Enter the code.
				</h1>
				<p class="text-muted-foreground mb-8 text-sm">
					We sent a 6-digit code to <span class="text-foreground font-medium">{email}</span>.
				</p>

				<form onsubmit={handleOtpSubmit} class="flex flex-col gap-3">
					<input
						id="otp"
						type="text"
						inputmode="numeric"
						placeholder="123456"
						autocomplete="one-time-code"
						bind:value={otp}
						required
						maxlength={6}
						class="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1 tracking-widest text-center"
					/>

					{#if error}
						<p class="text-destructive text-xs">{error}</p>
					{/if}

					<button
						type="submit"
						disabled={loading}
						class="bg-foreground text-background hover:bg-foreground/90 mt-2 w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
					>
						{loading ? "Verifying…" : "Continue"}
					</button>
				</form>

				<p class="text-muted-foreground mt-6 text-center text-xs">
					Wrong email?
					<button
						onclick={() => { step = "email"; error = ""; otp = ""; }}
						class="hover:text-foreground transition-colors underline underline-offset-4"
					>
						Go back
					</button>
				</p>
			{/if}
		</div>

		<div class="border-border border-l"></div>

		<div class="border-border border-t border-r"></div>
		<div class="border-border border-t"></div>
		<div class="border-border border-t border-l"></div>
	</main>

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
