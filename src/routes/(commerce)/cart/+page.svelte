<script lang="ts">
  import { cart } from '$lib/store/cart';
  import CartCard from '$lib/components/UI/CartCard.svelte';
  import { formatPrice } from '$lib/utils/helpers/formatPrice';

  // Initialize state
  let isLoading = false;

  // Calculate total price
  $: totalPrice = $cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
</script>

<main>
  <div class="grid grid-cols-1 gap-3 relative container py-5">
    {#each $cart as product (product.id)}
      <CartCard {product} />
    {/each}
  </div>

  {#if $cart.length === 0}
    <div
      class="h-[70vh] w-full flex items-center justify-center text-2xl font-bold text-primary"
    >
      Your cart is empty
    </div>
  {/if}

  <!-- Total Price & Checkout -->
  {#if $cart.length > 0}
    <div
      class={`${$cart.length >= 5 ? 'sticky' : 'fixed'} bottom-0 right-0 left-0 bg-white/50 backdrop-blur-sm border-t border-gray-500 h-24 px-4 flex items-center justify-between`}
    >
      <div class="font-medium lg:font-bold text-sm lg:text-base">
        Total Price: <span class="font-medium">{formatPrice(totalPrice)}</span>
      </div>
      <button
        class="bg-gray-800 px-4 py-2 text-base lg:text-xl text-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? 'Please wait...' : 'Checkout'}
      </button>
    </div>
  {/if}
</main>
