<script lang="ts">
  import { Check } from 'lucide-svelte';

  export let active: boolean = false;
  export let label: string = 'Checkbox';
</script>

<label class="flex gap-2 items-center mt-5 text-sm cursor-pointer">
  <input type="checkbox" class="hidden" bind:checked={active} />
  <div
    class="w-4 h-4 border-2 rounded-sm border-primary flex items-center justify-center"
    class:bg-primary={active}
  >
    {#if active}
      <Check class="text-white text-xs" />
    {/if}
  </div>
  {label}
</label>
