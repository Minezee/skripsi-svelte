<script lang="ts">
  import { useFetch } from '$lib/hooks';
  import { cart } from '$lib/store/cart';
  import StarRating from '$lib/components/UI/StarRating.svelte';
  import { toast } from 'svelte-sonner';
  import { Minus, Plus } from 'lucide-svelte';
  import { formatPrice } from '$lib/utils/helpers/formatPrice';
  import { auth } from '$lib/store/auth';

  let currentPath = '';
  if (typeof window !== 'undefined') {
    currentPath = window.location.pathname;
  }
  export let data;
  const { slug } = data;

  const products = useFetch('/products', 'products');
  const productDetail = useFetch(`/products/${slug}`, `product-${slug}`);

  $: productInCart =
    slug && !isNaN(parseInt(slug, 10))
      ? $cart.find((item) => item.id === parseInt(slug, 10))
      : undefined;

  // Cart actions
  const handleIncrement = (id: number) => {
    if (productInCart) {
      cart.updateQuantity(id, productInCart.quantity + 1);
    } else if ($productDetail.data) {
      const priceInCart = $productDetail.data.price * 15836;
      cart.addToCart({
        ...$productDetail.data,
        price: priceInCart,
        quantity: 1,
      });
      toast.success('Product added to cart!');
    }
  };

  const handleDecrement = (id: number) => {
    const product = $cart.find((item) => item.id === id);
    if (product && product.quantity > 1) {
      cart.updateQuantity(id, product.quantity - 1);
    } else {
      cart.removeFromCart(id);
    }
  };
</script>

<main
  class="container mx-auto px-4 lg:px-16 pt-10 pb-20 flex items-center justify-center lg:h-[80vh]"
>
  {#if !$productDetail?.isLoading && $productDetail.data}
    <!-- Product Display -->
    <div class="flex flex-col lg:flex-row gap-5 lg:gap-20">
      <!-- Product Image -->
      <div
        class="w-full lg:w-[300px] aspect-square flex items-center justify-center bg-[#F5F6F6] p-5 rounded-xl"
      >
        <img
          src={$productDetail.data.image}
          width={282}
          height={282}
          alt={$productDetail.data.title}
          class="scale-95 h-full w-auto mix-blend-multiply contrast-100 transition-all duration-300"
        />
      </div>

      <!-- Product Details -->
      <div class="flex-1 w-full flex flex-col">
        <h1 class="text-2xl lg:text-3xl font-bold mb-4">
          {$productDetail.data.title}
        </h1>
        <p class="text-lg lg:text-xl text-gray-600 mb-4">
          {formatPrice($productDetail.data.price * 15836)}
        </p>

        <div class="flex items-center mb-4">
          <StarRating rating={$productDetail.data.rating.rate} />
          <span class="ml-2 text-sm text-gray-500">
            ({$productDetail.data.rating.count} reviews)
          </span>
        </div>

        <p class="text-gray-700 mb-6">{$productDetail.data.description}</p>

        {#if $auth.token}
          <div class="flex flex-row items-center gap-1 w-fit px-1 text-sm">
            <button
              on:click={() => handleDecrement($productDetail.data.id)}
              class="border border-gray-500 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>

            <div
              class="w-20 text-center text-lg border rounded-full border-gray-500"
            >
              {productInCart ? productInCart.quantity : 0}
            </div>

            <button
              on:click={() => handleIncrement($productDetail.data.id)}
              class="border border-gray-500 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
        {/if}
      </div>
    </div>
  {:else}
    <!-- Loading State -->
    <div class="flex flex-col lg:flex-row gap-5 lg:gap-20 w-full">
      <div
        class="w-full lg:w-[300px] aspect-square skeleton-load rounded-xl"
      ></div>

      <div class="flex-1 w-full flex flex-col">
        <div class="h-8 w-1/2 skeleton-load font-bold mb-4"></div>
        <div class="h-6 lg:h-7 w-1/5 skeleton-load mb-4"></div>
        <div class="h-5 skeleton-load w-1/4 mb-4"></div>

        <div class="flex flex-col gap-2">
          <div class="h-5 skeleton-load w-full"></div>
          <div class="h-5 skeleton-load w-full"></div>
          <div class="h-5 skeleton-load w-full"></div>
          <div class="h-5 skeleton-load w-1/2"></div>
        </div>
      </div>
    </div>
  {/if}
</main>
