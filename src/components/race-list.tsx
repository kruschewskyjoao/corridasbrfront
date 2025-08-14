"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
  slug: string;
}

interface RaceListProps {
  races: Race[];
  title?: string;
  description?: string;
}

export function RaceList({ races, title, description }: RaceListProps) {
  const params = useParams();
  const router = useRouter();
  const currentPage = parseInt(params.page as string) || 1;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const racesPerPage = 12;

  const filteredRaces = useMemo(() => {
    return races.filter(race => {
      const matchesSearch = race.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (race.country && race.country.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = !selectedType || race.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [races, searchTerm, selectedType]);

  const totalPages = Math.ceil(filteredRaces.length / racesPerPage);
  const currentRaces = filteredRaces.slice(
    (currentPage - 1) * racesPerPage,
    currentPage * racesPerPage
  );

  const uniqueTypes = useMemo(() => {
    const types = races.map(race => race.type).filter(Boolean);
    return [...new Set(types)];
  }, [races]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(/\/\d+$/, `/${newPage}`);
      router.push(newPath);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            {title || "Todas as Corridas"}
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            {description || "Encontre sua próxima aventura. Filtre por nome, local ou tipo de corrida."}
          </p>
        </div>

        <div className="sticky top-4 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-md p-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Buscar por nome ou local..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="">Todos os tipos</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          {filteredRaces.length} corridas encontradas • Página {currentPage || 1} de {totalPages}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {currentRaces.map((race, index) => (
            <motion.div
              key={`${race.slug}-${index}`}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden h-full flex flex-col group transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="relative">
                  <Image
                    src={race.images?.[0] || "/hero-run.jpg"}
                    width="400"
                    height="225"
                    alt={race.name}
                    className="w-full aspect-video object-cover group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {race.saleStatus &&
                    <Badge variant="destructive" className="absolute top-2 right-2 text-xs">{race.saleStatus}</Badge>
                  }
                </div>
                <CardContent className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold mb-2 line-clamp-2 text-gray-900 dark:text-white">{race.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                    {race.country || 'Local não informado'}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {race.type && (
                      <Badge variant="secondary" className="text-xs">{race.type}</Badge>
                    )}
                    {race.distances && race.distances.length > 0 && (
                      <Badge variant="outline" className=".text-xs">
                        {race.distances.slice(0, 2).join(", ")}
                      </Badge>
                    )}
                  </div>
                  <div className="flex-grow" />
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      {race.date && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{race.date}</p>
                      )}
                      {race.price && (
                        <p className="text-sm font-semibold text-green-600 dark:text-green-400">{race.price}</p>
                      )}
                    </div>
                    <Link href={`/corrida/${race.slug}`} className="ml-auto">
                      <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-transform transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2">
                        Detalhes
                        <svg className="ml-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                      </button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              Anterior
            </button>
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) pageNum = i + 1;
                else if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = currentPage - 2 + i;

                return (
                  <Link
                    key={pageNum}
                    href={`/todas-corridas/${pageNum}`}
                    className={`px-4 py-2 border rounded-lg ${
                      currentPage === pageNum
                        ? 'bg-green-600 text-white border-green-600'
                        : 'border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800'
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              Próxima
            </button>
          </div>
        )}

        {filteredRaces.length === 0 && (
          <div className="text-center py-16">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h3 className="mt-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
              Nenhuma corrida encontrada
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Tente ajustar os filtros de busca ou volte mais tarde.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
