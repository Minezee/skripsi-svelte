<script lang="ts">
  export let value: string = '';
  export let type: string = 'text';
  export let placeholder: string = '';
  export let label: string = 'Email';
  //   export let onChange: (value: string) => void;
</script>

<label class="flex flex-col gap-1 mt-3 text-base w-full">
  {label}
  <input
    bind:value
    {type}
    {placeholder}
    class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-400"
  />
</label>
