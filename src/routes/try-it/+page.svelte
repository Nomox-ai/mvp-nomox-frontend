<script lang="ts">
	import PublicNav from "$lib/components/public-nav.svelte";
	import PublicFooter from "$lib/components/public-footer.svelte";
	import { toast } from "svelte-sonner";

	let waitlistEmail = $state("");
	let waitlistLoading = $state(false);
	let waitlistDone = $state(false);

	async function handleWaitlist(e: Event) {
		e.preventDefault();
		waitlistLoading = true;
		try {
			const BASE_URL =
				import.meta.env.VITE_API_URL ?? "https://api.get-nomox.com";
			const res = await fetch(`${BASE_URL}/waitlist`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: waitlistEmail,
					is_company: false,
				}),
			});
			if (!res.ok) {
				toast.error("Something went wrong. Please try again.");
			} else {
				waitlistDone = true;
			}
		} catch {
			toast.error(
				"Network error. Please check your connection and try again.",
			);
		} finally {
			waitlistLoading = false;
		}
	}
</script>

<div class="bg-background text-foreground flex min-h-screen flex-col">
	<PublicNav />

	<main class="border-border flex flex-1 items-stretch border-b">
		<div
			class="mx-auto grid w-full max-w-section grid-cols-1 md:grid-cols-2 md:divide-x self-stretch"
		>
			<!-- Left: Sign in with OTP -->
			<div
				class="border-border flex flex-col justify-center border-b px-8 py-14 md:border-b-0"
			>
				<p class="text-muted-foreground mb-4 font-mono text-xs">
					Try it yourself
				</p>
				<h2
					class="text-foreground text-2xl font-semibold tracking-tight leading-tight"
				>
					Sign in with your email.
				</h2>
				<p
					class="text-muted-foreground mt-3 max-w-xs text-sm leading-relaxed"
				>
					No account setup required. Enter your email address and you
					will receive a one-time code to sign in immediately.
				</p>

				<div class="mt-8 grid gap-4">
					{#each [{ num: "01", text: "Enter your email address on the sign-in page." }, { num: "02", text: "Receive a 6-digit code in your inbox." }, { num: "03", text: "Enter the code and start exploring." }] as item}
						<div class="flex items-start gap-3">
							<span
								class="text-muted-foreground mt-0.5 font-mono text-xs"
								>{item.num}</span
							>
							<p class="text-muted-foreground text-sm">
								{item.text}
							</p>
						</div>
					{/each}
				</div>

				<a
					href="/login"
					class="bg-foreground text-background hover:bg-foreground/90 mt-10 inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
				>
					Sign in →
				</a>
			</div>

			<!-- Right: Request a demo -->
			<div class="flex flex-col justify-center px-8 py-14">
				<p class="text-muted-foreground mb-4 font-mono text-xs">
					Request a demo
				</p>
				<h2
					class="text-foreground text-2xl font-semibold tracking-tight leading-tight"
				>
					Speak with our team.
				</h2>
				<p
					class="text-muted-foreground mt-3 max-w-xs text-sm leading-relaxed"
				>
					Prefer a guided walkthrough? Leave your email address and a
					member of our team will be in touch to arrange a
					personalised demo.
				</p>

				<div class="mt-8">
					{#if waitlistDone}
						<div class="border-border rounded-lg border px-5 py-6">
							<p class="text-foreground text-sm font-medium">
								Thank you — we will be in touch shortly.
							</p>
							<p class="text-muted-foreground mt-1 text-sm">
								We will reach out to <span
									class="text-foreground"
									>{waitlistEmail}</span
								> to arrange a time.
							</p>
						</div>
					{:else}
						<form
							onsubmit={handleWaitlist}
							class="flex flex-col gap-3"
						>
							<input
								type="email"
								placeholder="you@company.com"
								bind:value={waitlistEmail}
								required
								autocomplete="email"
								class="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1"
							/>
							<button
								type="submit"
								disabled={waitlistLoading}
								class="bg-foreground text-background hover:bg-foreground/90 w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50"
							>
								{waitlistLoading
									? "Submitting…"
									: "Request a demo"}
							</button>
						</form>
						<p
							class="text-muted-foreground mt-4 text-xs leading-relaxed"
						>
							By submitting you agree to our
							<a
								href="/privacy"
								class="underline underline-offset-2 hover:text-foreground transition-colors"
								>Privacy Policy</a
							>. No spam. Unsubscribe at any time.
						</p>
					{/if}
				</div>
			</div>
		</div>
	</main>

	<PublicFooter />
</div>
