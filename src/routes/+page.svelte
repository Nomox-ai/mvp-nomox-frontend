<script lang="ts">
	import Hero from '$lib/components/hero.svelte';
	import SlidingColumns from '$lib/components/sliding-columns.svelte';
	import HeroScreenshot from '$lib/components/hero-screenshot.svelte';
	import ValuePersonas from '$lib/components/value-personas.svelte';
	import PublicNav from '$lib/components/public-nav.svelte';
	import PublicFooter from '$lib/components/public-footer.svelte';
	import HowItWorksSection from '$lib/components/how-it-works-section.svelte';
	import LandingCta from '$lib/components/landing-cta.svelte';
	import SecuritySection from '$lib/components/security-section.svelte';

</script>

<div class="bg-background text-foreground flex min-h-screen flex-col">

	<PublicNav />

	<Hero />

	<SlidingColumns />

	<ValuePersonas />

	<HowItWorksSection />

	<SecuritySection />

	<LandingCta />

	<PublicFooter />

</div>
