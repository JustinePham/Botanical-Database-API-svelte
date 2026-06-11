<script lang="ts">
    let {
      query = $bindable(),
      results = $bindable([]),
      onInputChange
    }: {
      query: string,
      results?: any[],
      onInputChange: (q: string) => any  
    } = $props();

    // can use effect() to track query but dont do that since we have limited search per minute
</script>

<input bind:value={query} />
<button onclick={() => onInputChange(query)}>Search</button>