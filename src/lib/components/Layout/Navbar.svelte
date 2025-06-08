<script lang="ts">
  import { onMount } from 'svelte';
  import { cart } from '$lib/store/cart';
  import { auth } from '$lib/store/auth';

  // Components
  import Searchbar from '../UI/Searchbar.svelte';

  // Lucide Icons
  import ShoppingCart from 'lucide-svelte/icons/shopping-cart';

  let searchQuery = '';

  function handleSearch(value: string) {
    searchQuery = value;
    // Add search logic here
  }

  function logout() {
    auth.logout;
  }

  // Initialize auth state on component mount
  onMount(() => {
    auth.initialize();
  });
</script>

<nav class="sticky z-50 right-0 left-0 top-0 bg-white/50 backdrop-blur-xl">
  <div class="container py-3 flex flex-row justify-between gap-4 items-center">
    <a
      href="/product"
      class="flex flex-row items-center text-primary text-lg font-bold h-[32px] lg:h-[73px]"
    >
      <img
        src="/assets/svg/logo.svg"
        width={60}
        height={60}
        alt="logo"
        class="w-9 lg:w-auto"
      />
      <span>Shopman</span>
    </a>

    <div class="flex flex-row items-center gap-3 lg:gap-5">
      <div class="hidden lg:block">
        <Searchbar
          value={searchQuery}
          on:change={(e) => handleSearch(e.detail)}
          placeholder="Search product..."
        />
      </div>

      {#if $auth.token}
        <a
          href="/cart"
          class="relative flex flex-row items-center gap-1 text-sm text-gray-500 hover:bg-gray-200 rounded-full p-1"
        >
          <ShoppingCart class="text-gray-500 text-3xl" />
          {#if $cart.length > 0}
            <div
              class="absolute right-0 top-0 bg-red-600 text-white rounded-full w-4 h-4 aspect-square flex items-center justify-center text-xs"
            >
              {$cart.length}
            </div>
          {/if}
        </a>
        <button
          on:click={logout}
          class="flex items-center justify-center gap-1 hover:bg-red-500 hover:text-white w-[90px] text-center py-2 text-red-400 text-sm font-semibold bg-transparent rounded-full border-2 border-red-400"
        >
          Logout
        </button>
      {:else}
        <a
          href="/signup"
          class="flex items-center justify-center gap-1 hover:opacity-90 w-[90px] text-center py-2 text-primary text-sm font-semibold bg-transparent rounded-full border-2 border-primary"
        >
          Sign Up
        </a>
        <a
          href="/login"
          class="hover:opacity-90 w-[90px] text-center py-2 text-white text-sm bg-primary rounded-full"
        >
          Login
        </a>
      {/if}
    </div>
  </div>
</nav>
