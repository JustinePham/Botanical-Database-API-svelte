<script lang="ts">
    import { searchPlants } from '$lib/apis/trefle';
    import CropDetails from '$lib/components/+CropDetails.svelte';
    import CropList from '$lib/components/+CropList.svelte';
    import SearchField from '$lib/components/+SearchField.svelte';
    import { crops, type Crop } from '$lib/types/crops';
    import type { Plant } from '$lib/types/plants';

    // State for selected crop and search results
    let selectedCrop = $state<Crop | null>(null);
    let searchResults = $state<Plant[]>([]);
    
    let onSelect = (crop: Crop) => {
        console.log('Selected crop:', crop);
        selectedCrop = crop;
    };

    let query = $state('')

    const handleSearch = async (q: string) => {
        if (q === query) return; // avoid duplicate searches
        query = q;
        // pass raw query; searchPlants will route to /api/plants in the browser
        searchResults = await searchPlants(query);
        console.log('Search results:', searchResults);
    };
</script>

<!-- <CropList {crops} {onSelect} /> -->
<SearchField {query} onInputChange={handleSearch} />

{#if searchResults.length}
    <h2>Search Results</h2>
    <ul>
        {#each searchResults as plant}
            <li>{plant.common_name ?? plant.scientific_name ?? 'Unknown plant'}</li>
        {/each}
    </ul>
{/if}

<!-- {#if selectedCrop}
    <CropDetails {...selectedCrop} />
{/if} -->