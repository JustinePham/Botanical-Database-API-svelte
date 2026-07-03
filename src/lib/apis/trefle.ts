import { env as publicEnv } from '$env/dynamic/public';
import { browser } from '$app/environment';

export const TREFLE_API_BASE_URL = 'https://trefle.io/api/v1';

interface FilterParams<T> {
    [key: string]: T;
};

// Function to fetch plants. Behavior depends on the caller environment:
// - If called with a full URL (starts with 'http') or a local path (starts with '/'), use it directly.
// - If called with a plain query string:
//   - In the browser: redirect to the local endpoint `/api/plants?q=...` to avoid CORS.
//   - On the server: call the remote Trefle API directly using the token.
export async function searchPlants(urlOrQuery: string = '', filters?: FilterParams<string>): Promise<any[]> {
    if (!urlOrQuery && !filters) return [];

    let url: string;

    if (filters) {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value], index) => {
            params.set(`${key}[${index}]`, value);
        });
        url = `${TREFLE_API_BASE_URL}/species?token=${publicEnv.PUBLIC_TREFLE_API_TOKEN}&filter${params}`;
    }
    
    if (urlOrQuery.startsWith('http') || urlOrQuery.startsWith('/')) {
        url = urlOrQuery;
    } else {
        if (browser) {
            // Client code: route through our server endpoint to avoid CORS
            url = `/api/plants?q=${encodeURIComponent(urlOrQuery)}`;
        } else {
            // Server code: call Trefle directly
            url = `${TREFLE_API_BASE_URL}/plants/search?token=${publicEnv.PUBLIC_TREFLE_API_TOKEN}&q=${encodeURIComponent(urlOrQuery)}`;
        }
    }

    console.log('Fetching plants with URL:', url);

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching plants: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Fetched plants:', data?.data ?? data);
    return data?.data ?? data;
}


export async function getPlantDetails(plantId: string): Promise<any> {
    if (!plantId) throw new Error('Plant ID is required');
    let url = '';
    if (browser) {
        // Client code: route through our server endpoint to avoid CORS
        url = `/api/plants/${encodeURIComponent(plantId)}`;
    } else {
        // Server code: call Trefle directly
        url = `${TREFLE_API_BASE_URL}/plants/${plantId}?token=${publicEnv.PUBLIC_TREFLE_API_TOKEN}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching plant details: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Fetched plant details:', data);
    return data;
}
