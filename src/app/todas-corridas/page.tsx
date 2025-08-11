"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TodasCorridasRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/todas-corridas/1');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecionando...</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Você será redirecionado para a primeira página de corridas.
        </p>
      </div>
    </div>
  );
}
