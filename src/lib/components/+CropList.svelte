<script lang="ts">
    import { type Crop } from '../types/crops.ts';
    let { 
      crops, 
      onSelect 
    }: { 
      crops: Crop[]; 
      onSelect: (crop: Crop) => void 
    } = $props(); // receive crops as a prop from the page
</script>

<div>
  {#each crops as crop}
    <button on:click={() => onSelect(crop)}>
      {crop.name}
    </button>
  {/each}
</div>

<style>
  button {
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
</style>
