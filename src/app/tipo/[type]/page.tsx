import { RaceList } from "@/components/race-list";
import racesData from "../../../../public/corridas_detalhadas.json";
import { Metadata } from "next";

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
  if (!text) return "";
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}+/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function generateStaticParams() {
  const types = [...new Set(racesData.map((race) => race.type).filter(Boolean))];
  return types.map((type) => ({
    type: slugify(type),
  }));
}

export async function generateMetadata({ params }: { params: { type: string } }): Promise<Metadata> {
  const typeName = params.type.charAt(0).toUpperCase() + params.type.slice(1).replace(/-/g, " ");
  return {
    title: `Corridas do tipo ${typeName} - Calendário de Provas`,
    description: `Encontre as melhores corridas do tipo ${typeName}. Lista de eventos, datas e informações para inscrição.`,
    keywords: ['corridas', 'trilhas', typeName, 'calendário de corridas'],
  };
}

export default async function TypePage({ params }: { params: { type: string } }) {
  const typeName = params.type.replace(/-/g, " ");

  const racesWithSlugs = (racesData as Race[])
    .filter((race) => race.type && slugify(race.type) === params.type)
    .map((race) => ({
      ...race,
      slug: slugify(race.name),
    }));

  const title = `Corridas do tipo "${typeName.charAt(0).toUpperCase() + typeName.slice(1)}"`;
  const description = `Lista de todas as corridas e eventos do tipo ${typeName}.`;

  return <RaceList races={racesWithSlugs} title={title} description={description} />;
}
