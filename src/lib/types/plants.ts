
export interface Plant {
  id: number;
  common_name: string;
  scientific_name: string;
  family: string;
  image_url: string;
  family_common_name: string;
  genus: string;
  genus_id: number;
  links: {
    self: string;
    plant: string;
    observations: string;
  };
  rank: string;
  slug: string;
  year: number;
  synonyms: string[];
}