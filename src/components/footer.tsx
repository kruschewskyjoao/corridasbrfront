"use client";

import Link from "next/link";
import { useState, useEffect } from 'react';
import racesData from '../../public/corridas_detalhadas.json';

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
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

export function Footer() {
  const [raceTypes, setRaceTypes] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const uniqueTypes = [...new Set(racesData.map(race => race.type).filter(Boolean))];
    setRaceTypes(uniqueTypes as string[]);
    const uniqueCountries = [...new Set(racesData.map(race => race.country).filter(Boolean))];
    setCountries(uniqueCountries as string[]);
  }, []);

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link href="/" className="flex items-center">
            <MountainIcon className="h-6 w-6 text-green-500" />
            <span className="ml-2 text-lg font-bold">CorridaEmFoco</span>
          </Link>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Sua fonte completa para corridas e trilhas de aventura.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; 2024. Todos os direitos reservados.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Navegação</h4>
          <ul className="space-y-2">
            <li><Link href="/todas-corridas/1" className="text-xs hover:underline">Todas as Corridas</Link></li>
            <li><Link href="#" className="text-xs hover:underline">Sobre Nós</Link></li>
            <li><Link href="#" className="text-xs hover:underline">Contato</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Corridas por Tipo</h4>
          <ul className="space-y-2">
            {raceTypes.slice(0, 4).map(type => (
              <li key={type}>
                <Link href={`/tipo/${slugify(type)}`} className="text-xs hover:underline">
                  {type}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Corridas por País</h4>
          <ul className="space-y-2">
            {countries.map(country => (
              <li key={country}>
                <Link href={`/pais/${slugify(country)}`} className="text-xs hover:underline">
                  {country}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <div className="flex gap-4">
          <Link href="#" className="text-xs hover:underline">Termos de Serviço</Link>
          <Link href="#" className="text-xs hover:underline">Política de Privacidade</Link>
        </div>
        {/* Social media icons can be added here */}
      </div>
    </footer>
  );
}
