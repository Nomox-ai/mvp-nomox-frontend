<script lang="ts">
	import screenshot from '$lib/assets/screenshot_graphic.png';
	import { fadeUp } from '$lib/actions/fade-up';
</script>

<section class="border-border border-b overflow-hidden">
	<!-- Dark gradient stage -->
	<div class="relative bg-[#fcfcfc] py-20 px-8">

		<!-- Subtle radial glow behind the screenshot -->
		<div
			class="pointer-events-none absolute inset-0 flex items-center justify-center"
			aria-hidden="true"
		>
			<div class="h-[480px] w-[860px] rounded-full bg-[#fcfcfc] opacity-[0.07] blur-[120px]"></div>
		</div>

		<!-- Browser chrome + screenshot -->
		<div
			data-fade-up="pending"
			use:fadeUp
			class="relative mx-auto max-w-5xl"
		>

			<!-- Screenshot -->
			<div class="overflow-hidden rounded-xl border border-black/8">
				<img
					src={screenshot}
					alt="Nomox admin console"
					class="block w-full"
					draggable="false"
				/>
			</div>
		</div>
	</div>
</section>
