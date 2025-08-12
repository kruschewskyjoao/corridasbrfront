import fs from 'fs/promises';
import path from 'path';

export interface Race {
  name: string;
  type?: string;
  distances?: string[];
  price?: string;
  images?: string[];
  detailsUrl?: string;
  saleStatus?: string;
  date?: string;
  country?: string;
  description?: string;
  whatsapp?: string;
  slug?: string;
}

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}+/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function getFeaturedRaces(): Promise<Race[]> {
  const filePath = path.join(process.cwd(), 'public', 'corridas_detalhadas.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const races: Race[] = JSON.parse(jsonData);
  
  return races
    .map(race => ({ ...race, slug: slugify(race.name) }))
    .slice(0, 6);
}
