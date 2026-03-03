<script lang="ts">
  import { SvelteFlow, Background, BackgroundVariant, Controls, MiniMap } from '@xyflow/svelte';

  let nodes = $state.raw([
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'MongoDB' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: 'PostgreSQL' } },
  ]);
  let edges = $state.raw([
    { id: 'e1-2', source: '1', target: '2', animated: true },
  ]);
</script>

<div class="flex h-full flex-col">
  <header class="border-border flex h-14 shrink-0 items-center border-b px-6">
    <h1 class="text-base font-semibold">Playground</h1>
    <p class="text-muted-foreground ml-3 text-sm">Visual map of all data sources</p>
  </header>

  <div class="min-h-0 flex-1">
    <SvelteFlow bind:nodes bind:edges fitView>
      <Background />
      <Controls position="bottom-left" />
      <MiniMap
        position="bottom-right"
        nodeColor="#e5e7eb"
        maskColor="rgba(249, 250, 251, 0.85)"
      />
    </SvelteFlow>
  </div>
</div>
