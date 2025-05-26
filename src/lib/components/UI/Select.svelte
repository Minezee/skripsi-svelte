<script lang="ts">
  import { ChevronDown, ChevronUp, X, Check } from 'lucide-svelte';

  interface SelectOption {
    value: string;
    name?: string;
    label?: string;
  }

  export let label: string;
  export let value: string;
  export let options: SelectOption[];
  export let onSelect: (value: string) => void;

  let isActive = false;

  const handleSelect = (selectedValue: string) => {
    onSelect(selectedValue);
    isActive = false;
  };

  $: selectedName =
    options?.find((option) => option.value === value)?.name || `${label} By:`;
</script>

<div class="w-full flex-1 max-w-[150px] lg:max-w-[200px] relative">
  <!-- Button to toggle dropdown -->
  <button
    on:click={() => (isActive = !isActive)}
    class="text-sm p-2 border border-gray-500 w-full text-start flex items-center justify-between rounded-lg truncate"
  >
    <span class="truncate w-40">{selectedName}</span>
    <svelte:component this={isActive ? ChevronUp : ChevronDown} />
  </button>

  <!-- Dropdown menu for desktop -->
  {#if isActive}
    <div
      class="absolute border border-gray-500 mt-2 w-full p-2 bg-white/50 backdrop-blur-xl rounded-lg z-10 hidden lg:block"
    >
      {#each options as option}
        <button
          on:click={() => handleSelect(option.value)}
          class={`block w-full text-left text-sm p-2 rounded-lg ${
            value === option.value
              ? 'bg-primary text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          {option.name}
        </button>
      {/each}
    </div>
  {/if}

  <!-- Dropdown menu for mobile -->
  <div
    class={`block lg:hidden fixed ${
      isActive ? 'top-0' : 'top-full'
    } left-0 z-[999] bottom-0 w-full flex items-center justify-center transition-opacity duration-500 bg-[#262B1F]/50`}
  >
    <div
      class={`absolute flex flex-col gap-2 w-full ${
        isActive ? 'bottom-0' : '-bottom-[999px]'
      } bg-white px-4 pt-2 pb-4 transition-all duration-300`}
    >
      <div
        class="flex items-center justify-between w-full text-m-regular font-bold py-2"
      >
        <span>{label}</span>
        <button on:click={() => (isActive = false)}>
          <X size={20} />
        </button>
      </div>

      <div class="p-2 border-t border-disabled flex flex-col gap-4">
        <div class="flex flex-col gap-5">
          {#each options as option}
            <button
              on:click={() => handleSelect(option.value)}
              class={`flex items-center justify-between text-start ${
                value === option.value ? 'text-old-moss-green' : 'text-black'
              }`}
            >
              {option.name}
              {#if value === option.value}
                <Check size={20} color="#7C7D3F" />
              {/if}
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
