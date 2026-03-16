<script lang="ts">
	export let label: string;
	export let desc: string;
</script>

<div class="flex flex-col gap-1.5">
	<p class="text-foreground text-sm font-semibold">{label}</p>
	<p class="text-muted-foreground text-xs leading-relaxed">{desc}</p>
</div>
