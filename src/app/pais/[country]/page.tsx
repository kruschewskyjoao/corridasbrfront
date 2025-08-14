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
  const countries = [...new Set(racesData.map((race) => race.country).filter(Boolean))];
  return countries.map((country) => ({
    country: slugify(country),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const countryName = country.charAt(0).toUpperCase() + country.slice(1).replace(/-/g, " ");
  return {
    title: `Corridas no ${countryName} - Encontre Provas e Eventos`,
    description: `Lista completa de corridas e trilhas de aventura no ${countryName}. Encontre sua próxima maratona, meia maratona ou corrida de rua.`,
    keywords: ['corridas', 'trilhas', countryName, 'maratona', 'corrida de rua'],
  };
}


export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const countryName = country.replace(/-/g, " ");

  const racesWithSlugs = (racesData as Race[])
    .filter((race) => race.country && slugify(race.country) === country)
    .map((race) => ({
      ...race,
      slug: slugify(race.name),
    }));

  const title = `Corridas no ${countryName.charAt(0).toUpperCase() + countryName.slice(1)}`;
  const description = `Lista completa de corridas e trilhas de aventura no ${countryName}. Encontre sua próxima maratona, meia maratona ou corrida de rua.`;

  return <RaceList races={racesWithSlugs} title={title} description={description} />;
}
