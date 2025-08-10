"use client";

import { usePathname } from 'next/navigation';
import Link from "next/link";

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

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById('aventuras-destaque');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-white shadow-sm dark:bg-gray-950">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <MountainIcon className="h-6 w-6 text-green-500" />
        <span className="ml-2 text-lg font-bold">CorridaEmFoco</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link 
          href={isHomePage ? '#aventuras-destaque' : '/'} 
          className="text-sm font-medium hover:underline underline-offset-4"
          onClick={handleScroll}
        >
          Ver Trilhas
        </Link>
      </nav>
    </header>
  );
}
