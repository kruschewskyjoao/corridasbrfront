import { Card } from "@/components/ui/card";
import races from "@/races/corridas_detalhadas.json";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function TodasCorridas() {
  const racesWithSlugs = races.map((race) => ({
    ...race,
    slug: slugify(race.name),
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Todas as Corridas</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Confira nossa lista completa de corridas e encontre sua próxima aventura!
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {racesWithSlugs.map((race) => (
          <Card key={race.name} className="overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={race.images[0] || "/placeholder.svg"}
              alt={race.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{race.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{race.country}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-medium text-green-600">{race.price}</span>
                <a
                  href={`/corrida/${race.slug}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                >
                  Mais informações
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
