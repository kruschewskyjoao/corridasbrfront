"use client"

import { useMemo, useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

export function FeaturedAdventures() {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Em produção, o arquivo está em /public, então podemos fazer fetch relativo
    fetch('/corridas_detalhadas.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Falha ao carregar dados');
        }
        return res.json();
      })
      .then(data => {
        setRaces(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao carregar corridas:', err);
        setLoading(false);
      });
  }, []);

  const racesWithSlugs = useMemo(
    () => races
      .map((race) => ({ ...race, slug: slugify(race.name) }))
      .slice(0, 6), // Mostra apenas as 6 primeiras
    [races]
  );

  if (loading) {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="w-full px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Carregando...</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="aventuras-destaque" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="w-full px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Aventuras em Destaque</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Descubra algumas das trilhas e corridas mais populares da nossa comunidade.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/todas-corridas/1"
                className="inline-flex items-center justify-center rounded-md bg-green-500 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
              >
                Ver Todas as Corridas
              </Link>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
            {racesWithSlugs.map((race, index) => (
              <Card key={`${race.name}-${index}`}>
                <img
                  src={race.images?.[0] || "/placeholder.svg"}
                  width="400"
                  height="225"
                  alt={race.name}
                  className="w-full aspect-video overflow-hidden rounded-t-xl object-cover"
                />
                <CardContent className="p-4 flex flex-col items-center space-y-2">
                  <h3 className="text-lg font-bold">{race.name}</h3>
                  {race.country && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">{race.country}</p>
                  )}
                  {(race.type || (race.distances && race.distances.length > 0)) && (
                    <div className="flex items-center gap-4">
                      {race.type && (
                        <Badge variant="secondary">{race.type}</Badge>
                      )}
                      {race.distances && race.distances.length > 0 && (
                        <div className="text-sm">{race.distances.join(", ")}</div>
                      )}
                    </div>
                  )}
                  {race.price && (
                    <p className="text-sm font-medium text-green-600">{race.price}</p>
                  )}
                  {race.date && (
                    <p className="text-sm text-gray-600">{race.date}</p>
                  )}
                  <Link href={`/corrida/${race.slug}`} className="mt-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                      Mais informações
                    </button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
