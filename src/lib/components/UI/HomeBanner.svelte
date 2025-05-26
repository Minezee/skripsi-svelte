<script lang="ts">
  import { onMount } from 'svelte';
  import { register } from 'swiper/element/bundle';
  import { useFetch } from '$lib/hooks';

  // Register Swiper elements
  onMount(() => {
    register();
  });

  const products = useFetch('/products', 'products');

  interface ProductProps {
    id: number;
    image: string;
    rating: {
      rate: number;
    };
  }

  $: filteredProducts = $products?.data?.filter(
    (product: ProductProps) => product.rating.rate > 4.6,
  );
</script>

{#if !$products.isLoading}
  <swiper-container
    slides-per-view="1"
    space-between="10"
    autoplay-delay="3000"
    autoplay-disable-on-interaction="false"
    autoplay-pause-on-mouse-enter
    loop
    class="w-full z-10"
  >
    {#each filteredProducts as product (product.id)}
      <swiper-slide>
        <header
          class="relative w-full bg-gray-bg h-auto md:h-72 rounded-lg p-3 md:p-10 flex flex-col-reverse md:flex-row items-center md:items-start gap-4 justify-between"
        >
          <div
            class="flex flex-col justify-start md:justify-center h-full gap-3 md:gap-10"
          >
            <h2
              class="text-primary font-bold text-2xl md:text-5xl md:max-w-[600px] z-40"
            >
              Grab Up to 5% Off On Top Rating Products
            </h2>
            <a
              href={`/product/${product.id}`}
              class="px-4 py-2 bg-primary w-fit text-white rounded-full"
              >Buy Now</a
            >
          </div>
          <div
            class="md:absolute z-10 right-12 bottom-4 w-[150px] md:w-[250px] h-[150px] md:h-[250px] aspect-square bg-gray-bg flex justify-end"
          >
            <img
              src={product.image}
              width={290}
              height={290}
              alt="Product-Headphones"
              class="h-full w-auto mix-blend-multiply contrast-100 opacity-90"
            />
          </div>
        </header>
      </swiper-slide>
    {/each}
  </swiper-container>
{:else}
  <div class="h-[306px] md:h-72 w-full skeleton-load"></div>
{/if}
