<script lang="ts">
  import type { ProductProps } from '../../../types/product';
  import StarRating from './StarRating.svelte';
  import { cart } from '$lib/store/cart';
  import { auth } from '$lib/store/auth';
  import { toast } from 'svelte-sonner';
  import { formatPrice } from '../../utils/helpers/formatPrice';

  export let product: ProductProps;

  const handleAddToCart = (product: ProductProps) => {
    if ($auth.token) {
      toast.dismiss();
      toast.success('Product successfully added to cart!');
      cart.addToCart(product);
    } else {
      toast.dismiss();
      toast.error('Please login to add products.');
    }
  };
</script>

<div class="flex flex-col h-full justify-between">
  <a href={`/product/${product.id}`}>
    <div
      class="w-full aspect-square flex items-center justify-center bg-[#F5F6F6] p-5 rounded-xl group"
    >
      <img
        src={product.image}
        width={282}
        height={282}
        alt={product.title}
        class="scale-95 h-full w-auto mix-blend-multiply contrast-100 group-hover:scale-110 transition-all duration-300"
      />
    </div>
    <div class="flex flex-col">
      <h2
        class="font-semibold lg:font-bold text-sm lg:text-base line-clamp-2 mt-2 lg:mt-4 mb-1 lg:mb-2"
      >
        {product.title}
      </h2>
      <div class="flex items-start mb-1">
        <span class="lg:font-bold text-sm lg:text-base"
          >{formatPrice(product.price)}</span
        >
      </div>
      <p class="line-clamp-1 mb-2 text-xs lg:text-base">
        {product.description}
      </p>
      <div class="flex flex-row gap-1">
        <StarRating rating={product.rating.rate} />
        <span class="text-sm text-gray-500">({product.rating.count})</span>
      </div>
    </div>
  </a>
  <button
    class="w-fit rounded-full border border-black px-2 lg:px-4 py-1 lg:py-2 text-xs lg:text-sm mt-3 hover:bg-primary hover:text-white transition-all duration-500"
    on:click={() => handleAddToCart(product)}
  >
    Add to Cart
  </button>
</div>
