<script lang="ts">
  import { Minus, Plus, Trash2 } from 'lucide-svelte';
  import { formatPrice } from '$lib/utils/helpers/formatPrice';
  import { cart } from '$lib/store/cart';

  export let product: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
  };

  const handleRemoveFromCart = (id: number) => {
    cart.removeFromCart(id);
  };

  const handleIncrement = (id: number) => {
    cart.updateQuantity(id, product.quantity + 1);
  };

  const handleDecrement = (id: number) => {
    if (product.quantity > 1) {
      cart.updateQuantity(id, product.quantity - 1);
    } else {
      cart.removeFromCart(id);
    }
  };
</script>

<!-- Desktop View -->
<div
  class="hidden lg:flex justify-between items-center border px-4 py-2 rounded-md"
>
  <a href={`/product/${product.id}`} class="flex items-center gap-4">
    <div
      class="max-w-20 min-w-20 aspect-square flex items-center justify-center bg-[#F5F6F6] p-1 rounded-sm"
    >
      <img
        src={product.image}
        alt={product.title}
        class="scale-95 h-full w-auto mix-blend-multiply contrast-100"
        width="282"
        height="282"
      />
    </div>
    <h2 class="font-bold text-base hidden lg:block">{product.title}</h2>
  </a>
  <div class="flex flex-col lg:flex-row items-center gap-10">
    <span class="text-gray-400 text-sm">{formatPrice(product.price)}</span>
    <div
      class="flex flex-row items-center gap-1 border border-gray-400 w-fit px-1 text-sm"
    >
      <button on:click={() => handleDecrement(product.id)} class="p-1">
        <Minus size={16} />
      </button>
      <div class="w-5 text-center text-base">{product.quantity}</div>
      <button on:click={() => handleIncrement(product.id)} class="p-1">
        <Plus size={16} />
      </button>
    </div>
    <span class="font-medium min-w-32 text-center">
      {formatPrice(product.price * product.quantity)}
    </span>
    <button
      on:click={() => handleRemoveFromCart(product.id)}
      class="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
    >
      <Trash2 size={16} />
    </button>
  </div>
</div>

<!-- Mobile View -->
<div class="flex flex-row lg:hidden w-full gap-4 pb-4 border-b border-gray-300">
  <a
    href={`/product/${product.id}`}
    class="max-w-[80px] min-w-[80px] aspect-square flex items-center justify-center bg-[#F5F6F6] p-1 rounded-sm"
  >
    <img
      src={product.image}
      alt={product.title}
      class="h-full w-auto mix-blend-multiply contrast-100"
      width="282"
      height="282"
    />
  </a>
  <div class="flex flex-col justify-between gap-2 w-full">
    <h2 class="text-sm line-clamp-2">{product.title}</h2>
    <div class="flex flex-row justify-between w-full items-center">
      <span class="text-gray-600 text-sm">{formatPrice(product.price)}</span>
      <div
        class="flex flex-row items-center gap-1 border border-gray-400 w-fit px-1 rounded"
      >
        <button on:click={() => handleDecrement(product.id)} class="p-1">
          <Minus size={14} />
        </button>
        <div class="w-5 text-center text-sm">{product.quantity}</div>
        <button on:click={() => handleIncrement(product.id)} class="p-1">
          <Plus size={14} />
        </button>
      </div>
    </div>
  </div>
</div>
