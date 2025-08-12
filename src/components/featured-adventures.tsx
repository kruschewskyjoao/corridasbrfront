import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Race } from "@/lib/races";

interface FeaturedAdventuresProps {
  races: Race[];
}

export function FeaturedAdventures({ races }: FeaturedAdventuresProps) {

  return (
    <>
      <section className="w-full">
        <div className="w-full px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center pt-6">
            <Link
              href="/todas-corridas/1"
              className="inline-flex items-center justify-center rounded-md bg-green-500 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >
              Ver Todas as Corridas
            </Link>
          </div>
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
            {races.map((race, index) => (
              <Card key={`${race.name}-${index}`}>
                <Image
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
