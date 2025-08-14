import { RaceList } from "@/components/race-list";
import racesData from "../../../../public/corridas_detalhadas.json";

interface Race {
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
}

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}+/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function generateStaticParams() {
  const racesPerPage = 12;
  const totalPages = Math.ceil(racesData.length / racesPerPage);
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
  return paths;
}

export default async function TodasCorridasPage() {
  const racesWithSlugs = (racesData as Race[]).map((race) => ({
    ...race,
    slug: slugify(race.name),
  }));

  return <RaceList races={racesWithSlugs} />;
}
