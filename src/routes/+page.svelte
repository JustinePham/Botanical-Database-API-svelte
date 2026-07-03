<script lang="ts">
    import { searchPlants, getPlantDetails } from '$lib/apis/trefle';
    import SearchField from '$lib/components/+SearchField.svelte';
    import { type Crop } from '$lib/types/crops';
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
    const handleSelected = async (id: string | number) => {
        console.log('Selected plant:', id);
        // Fetch additional details if needed
        try {
            const details = await getPlantDetails(id as string);
            console.log('Plant details:', details);
            // You can update selectedCrop or any other state here
        } catch (error) {
            console.error('Error fetching plant details:', error);
        }
        
    };
</script>

<!-- <CropList {crops} {onSelect} /> -->
<SearchField {query} onInputChange={handleSearch} />

{#if searchResults.length}
    <h2>Search Results</h2>
    <ul>
        {#each searchResults as plant}
            <li onclick={() => handleSelected(plant.slug)}>
                {plant.common_name ?? plant.scientific_name ?? 'Unknown plant'}
            </li>
        {/each}
    </ul>
{/if}

<!-- {#if selectedCrop}
    <CropDetails {...selectedCrop} />
{/if} -->