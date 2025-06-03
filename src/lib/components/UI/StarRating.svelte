<script lang="ts">
  import { Star, StarHalf } from 'lucide-svelte';

  export let rating: number;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
</script>

<div class="flex flex-row gap-1 text-base">
  {#each Array(fullStars).fill(null) as _, index}
    <Star class="text-primary w-4 h-4" fill="currentColor" />
  {/each}

  {#if hasHalfStar}
    <div class="flex relative">
      <Star class="text-primary w-4 h-4" />
      <StarHalf
        class="text-primary w-4 h-4 absolute top-0"
        fill="currentColor"
      />
    </div>
  {/if}

  {#each Array(emptyStars).fill(null) as _, index}
    <Star class="text-gray-300 w-4 h-4" />
  {/each}
</div>
