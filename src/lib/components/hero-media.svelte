<script lang="ts">
	import screenshot from "$lib/assets/screenshot_graphic.png";
	import { fadeUp } from "$lib/actions/fade-up";
</script>

<section class="border-b">
	<div class="mx-auto max-w-section px-8 py-12">
		<div
			data-fade-up="pending"
			use:fadeUp={{ delay: 0 }}
			class="border-border overflow-hidden border shadow-2xl shadow-black/10"
		>
			<img
				src={screenshot}
				alt="Nomox admin console"
				class="block w-full"
				draggable="false"
			/>
		</div>
	</div>
</section>
