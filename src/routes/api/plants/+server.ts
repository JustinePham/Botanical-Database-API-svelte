import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { searchPlants } from '$lib/apis/trefle';

export const GET: RequestHandler = async ({ url }) => {
  const query = url.searchParams.get('q') ?? '';
  if (!query) {
    return json([]);
  }

  const plants = await searchPlants(query);
  return json(plants);
};

