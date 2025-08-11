"use client"

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";

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

export default function TodasCorridasPage() {
  const params = useParams();
  const router = useRouter();
  const currentPage = parseInt(params.page as string) || 1;
  
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const racesPerPage = 12;

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

  const racesWithSlugs = useMemo(() => 
    races.map((race) => ({ ...race, slug: slugify(race.name) })), 
    [races]
  );

  const filteredRaces = useMemo(() => {
    return racesWithSlugs.filter(race => {
      const matchesSearch = race.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (race.country && race.country.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = !selectedType || race.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [racesWithSlugs, searchTerm, selectedType]);

  const totalPages = Math.ceil(filteredRaces.length / racesPerPage);
  const currentRaces = filteredRaces.slice(
    (currentPage - 1) * racesPerPage,
    currentPage * racesPerPage
  );

  const uniqueTypes = useMemo(() => {
    const types = races.map(race => race.type).filter(Boolean);
    return [...new Set(types)];
  }, [races]);

  // Redirecionar se a página atual for inválida
  useEffect(() => {
    if (!loading && (currentPage < 1 || currentPage > totalPages)) {
      router.push('/todas-corridas/1');
    }
  }, [currentPage, totalPages, loading, router]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      router.push(`/todas-corridas/${newPage}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <h1 className="text-2xl font-bold">Carregando...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Todas as Corridas
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {filteredRaces.length} corridas encontradas • Página {currentPage} de {totalPages}
              </p>
            </div>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ← Voltar ao Início
            </Link>
          </div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Buscar por nome ou local..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Todos os tipos</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid de Corridas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {currentRaces.map((race, index) => (
            <Card key={`${race.name}-${index}`} className="hover:shadow-lg transition-shadow">
              <img
                src={race.images?.[0] || "/placeholder.svg"}
                width="400"
                height="225"
                alt={race.name}
                className="w-full aspect-video overflow-hidden rounded-t-xl object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2 line-clamp-2">{race.name}</h3>
                {race.country && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{race.country}</p>
                )}
                <div className="flex flex-wrap gap-2 mb-3">
                  {race.type && (
                    <Badge variant="secondary" className="text-xs">{race.type}</Badge>
                  )}
                  {race.distances && race.distances.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {race.distances.join(", ")}
                    </Badge>
                  )}
                </div>
                {race.price && (
                  <p className="text-sm font-medium text-green-600 mb-2">{race.price}</p>
                )}
                {race.date && (
                  <p className="text-sm text-gray-600 mb-3">{race.date}</p>
                )}
                <Link href={`/corrida/${race.slug}`}>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                    Ver Detalhes
                  </button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Anterior
            </button>
            
            {/* Números das páginas */}
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Link
                    key={pageNum}
                    href={`/todas-corridas/${pageNum}`}
                    className={`px-3 py-2 border rounded-lg ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700'
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
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Próxima
            </button>
          </div>
        )}

        {filteredRaces.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Nenhuma corrida encontrada
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Tente ajustar os filtros de busca
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
