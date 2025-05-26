<!-- src/routes/login/+page.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms';
  import { toast } from 'svelte-sonner';
  import { goto } from '$app/navigation';

  import Input from '$lib/components/UI/Input.svelte';
  import Checkbox from '$lib/components/UI/Checkbox.svelte';

  let email = '';
  let username = '';
  let password = '';
  let remember = false;
  let isLoading = false;

  async function handleLogin() {
    isLoading = true;
    const loadingToast = toast.loading('Authenticating your credentials...');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error();

      const { token } = await response.json();

      // Set cookie (SvelteKit handles this differently)
      document.cookie = `token=${token}; path=/; max-age=${remember ? 2592000 : 3600}`;

      toast.dismiss(loadingToast);
      toast.success('Welcome back!');
      await goto('/product');
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Invalid credentials');
    } finally {
      isLoading = false;
    }
  }
</script>

<main class="w-full flex flex-row gap-20 min-h-screen p-5 lg:p-0">
  <div
    class="hidden flex-1 w-full lg:flex flex-col items-center justify-center rounded-lg bg-[url('/assets/images/login-banner.jpg')] bg-cover bg-center contrast-50"
  ></div>

  <div class="w-full lg:w-1/2 flex items-center justify-center">
    <div
      class="w-full h-full flex flex-col items-start justify-center max-w-[400px]"
    >
      <form
        class="w-full flex flex-col p-8 border border-gray-500 rounded-lg bg-white/50 backdrop-blur-xl"
      >
        <h1 class="font-semibold text-3xl">Daftar</h1>
        <p class="mt-2 text-sm text-gray-500">
          Selamat datang! Silakan masukkan detail Anda.
        </p>

        <div class="mt-5 w-full">
          <Input
            bind:value={email}
            placeholder="Masukkan email"
            label="Email"
          />
          <Input
            bind:value={username}
            placeholder="Masukkan username"
            label="Username"
          />
          <Input
            bind:value={password}
            type="password"
            placeholder="Masukkan password"
            label="Password"
          />

          <button
            on:click|preventDefault={handleLogin}
            disabled={isLoading}
            class="w-full py-2 text-white bg-primary rounded-lg mt-5 disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Daftar'}
          </button>

          <p class="text-gray-500 text-sm text-center mt-5">
            Sudah punya akun? <a href="/login" class="text-primary">Masuk</a>
          </p>
        </div>
      </form>
    </div>
  </div>
</main>

<style>
</style>
