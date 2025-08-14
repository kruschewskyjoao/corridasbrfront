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

export function Header() {
  const [raceTypes, setRaceTypes] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const uniqueTypes = [...new Set(racesData.map(race => race.type).filter(Boolean))];
    setRaceTypes(uniqueTypes as string[]);
    const uniqueCountries = [...new Set(racesData.map(race => race.country).filter(Boolean))];
    setCountries(uniqueCountries as string[]);
  }, []);

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-white shadow-sm dark:bg-gray-950 sticky top-0 z-50">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <MountainIcon className="h-6 w-6 text-green-500" />
        <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">CorridaEmFoco</span>
      </Link>
      <nav className="ml-auto flex items-center gap-6">
        <Link 
          href="/todas-corridas/1"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Todas as Corridas
        </Link>

        <div className="relative group">
          <button className="text-sm font-medium hover:underline underline-offset-4 flex items-center">
            País
            <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </button>
          <div className="absolute hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-md mt-2 py-2 w-40">
            {countries.map(country => (
              <Link key={country} href={`/pais/${slugify(country)}`} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                {country}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative group">
          <button className="text-sm font-medium hover:underline underline-offset-4 flex items-center">
            Tipos
            <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </button>
          <div className="absolute hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-md mt-2 py-2 w-48">
            {raceTypes.map(type => (
              <Link key={type} href={`/tipo/${slugify(type)}`} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                {type}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
