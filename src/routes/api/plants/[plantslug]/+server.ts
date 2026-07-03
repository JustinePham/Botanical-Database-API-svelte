import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getPlantDetails } from '$lib/apis/trefle';

export const GET: RequestHandler = async ({ params }) => {
  const slug = params.plantslug;
  if (!slug) {
    return json({ error: 'Plant slug is required' }, { status: 400 });
  }

  try {
    const details = await getPlantDetails(slug);
    return json(details);
  } catch (error) {
    console.error('Error fetching plant details:', error);
    return json({ error: 'Failed to fetch plant details' }, { status: 502 });
  }
};
