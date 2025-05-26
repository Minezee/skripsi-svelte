<script lang="ts">
  import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query';
  import { auth } from '$lib/store/auth';
  import '../../app.css';
  import { onMount } from 'svelte';
  import Navbar from '$lib/components/Layout/Navbar.svelte';

  const queryClient = new QueryClient();

  onMount(() => {
    auth.initialize();
  });
</script>

<QueryClientProvider client={queryClient}>
  <Navbar />
  <slot />
</QueryClientProvider>
