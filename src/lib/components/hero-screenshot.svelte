<script lang="ts">
	import screenshot from "$lib/assets/screenshot_graphic.png";
	import { fadeUp } from "$lib/actions/fade-up";
</script>

<!-- Dark gradient stage -->
<div class="relative bg-[#fcfcfc] pt-12">
	<!-- Subtle radial glow behind the screenshot -->
	<div
		class="pointer-events-none absolute inset-0 flex items-center justify-center"
		aria-hidden="true"
	>
		<div
			class="h-[480px] w-[860px] bg-[#fcfcfc] opacity-[0.07] blur-[120px]"
		></div>
	</div>

	<!-- Screenshot -->
	<img
		data-fade-up="pending"
		use:fadeUp
		src={screenshot}
		alt="Nomox admin console"
		class="relative block w-full overflow-hidden border border-black/8"
		draggable="false"
	/>
</div>
