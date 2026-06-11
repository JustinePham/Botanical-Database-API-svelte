// src/lib/crops.ts
export interface Crop {
  id: string;
  name: string;
  variety: string;
  daysToHarvest: number;
  lightRequirement: 'low' | 'medium' | 'high';
}

export const crops: Crop[] = [
  {
    id: 'lettuce',
    name: 'Lettuce',
    variety: 'Butterhead',
    daysToHarvest: 35,
    lightRequirement: 'medium'
  },
  {
    id: 'basil',
    name: 'Basil',
    variety: 'Genovese',
    daysToHarvest: 50,
    lightRequirement: 'high'
  },
  {
    id: 'tomato',
    name: 'Tomato',
    variety: 'Cherry',
    daysToHarvest: 65,
    lightRequirement: 'high'
  }
];