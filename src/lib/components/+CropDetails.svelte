<script lang="ts">
    const {
      id, 
      name, 
      variety, 
      daysToHarvest, 
      lightRequirement
    } = $props();
</script>

<section>
  <h2>{id}</h2>
  <p>{name}</p>
  <p>{variety}</p>
  <p>Days to Harvest: {daysToHarvest}</p>
  <p>Light Requirement: {lightRequirement}</p>
</section>

<style>
  button {
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
</style>
