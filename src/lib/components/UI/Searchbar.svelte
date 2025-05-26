<script lang="ts">
  import { Search } from 'lucide-svelte';
  export let value: string;
  export let placeholder: string = '';
</script>

<div
  class="py-2 px-4 text-sm border border-gray-500 text-gray-500 rounded-full flex items-center max-w-[300px]"
>
  <input
    bind:value
    {placeholder}
    type="text"
    class="bg-transparent focus:outline-none focus:border-none focus:ring-none text-gray-600 flex-1 w-full"
  />
  <button>
    <Search size={16} />
  </button>
</div>
