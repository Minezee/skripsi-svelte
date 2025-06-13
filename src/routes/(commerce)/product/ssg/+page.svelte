<script lang="ts">
  // @Stores
  import { SvelteURLSearchParams } from 'svelte/reactivity';
  import { useFilters } from '$lib/hooks/useFilters';

  // @Components
  import ProductCard from '$lib/components/UI/ProductCard.svelte';
  import Select from '$lib/components/UI/Select.svelte';
  import Searchbar from '$lib/components/UI/Searchbar.svelte';

  // @Data
  import { sortOption } from '$lib/utils/data/sortOption';
  import { arrayToObject } from '$lib/utils/helpers/arrayToObject';
  import HomeBanner from '$lib/components/UI/HomeBanner.svelte';

  // Fetch data
  export let data;
  const { products, categories } = data;
  const params = new SvelteURLSearchParams();

  // Get URL params
  $: categoryParam = params.get('category') || '';
  $: sortParam = params.get('sort') || '';

  // Initialize filters
  const {
    activeCategory,
    setActiveCategory,
    sortCriteria,
    setSortCriteria,
    applyFiltersAndSorting,
    searchQuery,
    setSearchQuery,
  } = useFilters(categoryParam, sortParam);

  // Apply filters
  $: filteredAndSortedProducts = applyFiltersAndSorting(products || []);
</script>

<main class="container pb-10">
  <!-- @Banner -->
  <HomeBanner />

  <div class="mt-10">
    <div class="w-full flex flex-row justify-between items-center">
      <!-- @Category -->
      <div class="lg:flex flex-row gap-4 items-center hidden">
        {#each categories as category}
          <button
            on:click={() =>
              setActiveCategory(category === $activeCategory ? '' : category)}
            class={`px-4 py-2 text-xl rounded-full ${$activeCategory === category ? 'bg-gray-500 text-white' : 'bg-white text-gray-500'} border-2 border-gray-500 hover:scale-110 transition-all duration-150`}
          >
            {category}
          </button>
        {/each}
      </div>

      <!-- @Mobile Filter -->
      <div class="block lg:hidden">
        <Select
          onSelect={setActiveCategory}
          options={arrayToObject(categories)}
          value={$activeCategory}
          label="Filter"
        />
      </div>

      <!-- @Sorting -->
      <Select
        onSelect={setSortCriteria}
        options={sortOption}
        value={$sortCriteria}
        label="Sort"
      />
    </div>

    <!-- @Search (Mobile) -->
    <div class="lg:hidden mt-5 w-full flex items-end justify-end">
      <Searchbar
        value={$searchQuery}
        on:change={(e) => setSearchQuery(e.detail)}
        placeholder="Search product..."
      />
    </div>

    <!-- @List Product -->
    <div
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 xl:gap-10 mt-10 lg:mt-20"
    >
      {#each $filteredAndSortedProducts as product}
        <ProductCard {product} />
      {/each}
    </div>
  </div>
</main>
