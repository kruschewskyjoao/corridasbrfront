import Image from "next/image";
import Link from "next/link";
import races from "../../../../public/corridas_detalhadas.json";

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

export async function generateStaticParams() {
  return (races as Race[]).map((race) => ({ slug: slugify(race.name) }));
}

export default async function RaceDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const race = (races as Race[]).find((r) => slugify(r.name) === slug);

  if (!race) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-2xl font-bold">Corrida não encontrada</h1>
        <Link href="/" className="text-blue-600 underline">Voltar</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 underline">← Voltar</Link>
      </div>
      <h1 className="text-3xl font-bold mb-2">{race.name}</h1>
      
      {(race.country || race.type || (race.distances && race.distances.length > 0)) && (
        <p className="text-gray-600 mb-4">
          {[race.country, race.type, race.distances?.join(", ")].filter(Boolean).join(" • ")}
        </p>
      )}

      {race.images && race.images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {race.images.map((src: string, i: number) => (
            <Image
              key={i}
              src={src}
              alt={`${race.name} imagem ${i + 1}`}
              width={800}
              height={450}
              className="w-full h-auto rounded-lg object-cover"
            />
          ))}
        </div>
      )}

      {(race.date || race.price || race.saleStatus) && (
        <div className="space-y-2 mb-6">
          {race.date && <p><span className="font-semibold">Data:</span> {race.date}</p>}
          {race.price && <p><span className="font-semibold">Preço:</span> {race.price}</p>}
          {race.saleStatus && <p><span className="font-semibold">Status:</span> {race.saleStatus}</p>}
        </div>
      )}

      {race.description && (
        <div className="prose dark:prose-invert max-w-none mb-6 whitespace-pre-line">
          {race.description}
        </div>
      )}

      <div className="flex gap-3">
        {race.whatsapp && (
          <a href={race.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-4 py-2 rounded-md">
            Contato no WhatsApp
          </a>
        )}
        {race.detailsUrl && (
          <a href={race.detailsUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Ver Detalhes
          </a>
        )}
      </div>
    </div>
  );
}
