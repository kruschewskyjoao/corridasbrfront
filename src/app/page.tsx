import { Metadata } from 'next';
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { FeaturedAdventures } from "@/components/featured-adventures";
import { CallToAction } from "@/components/call-to-action";
import { getFeaturedRaces } from '@/lib/races';

export const metadata: Metadata = {
  title: 'Corridas e Trilhas de Aventura - Descubra Rotas Incríveis',
  description: 'Plataforma completa para amantes de corrida e trilhas. Encontre rotas desafiadoras, compartilhe suas aventuras e conecte-se com outros corredores e aventureiros. Dicas, mapas e muito mais!',
  keywords: ['corridas', 'trilhas', 'aventura', 'esportes ao ar livre', 'trekking', 'caminhada', 'corrida de rua', 'montanha', 'natureza'],
  openGraph: {
    title: 'Corridas e Trilhas de Aventura - Sua Próxima Aventura Começa Aqui',
    description: 'Descubra as melhores rotas para corrida e trilhas, compartilhe suas experiências e conecte-se com uma comunidade de aventureiros apaixonados por esportes ao ar livre.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default async function Home() {
  const featuredRaces = await getFeaturedRaces();
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Hero />
        <Features />
        <section id="aventuras-destaque" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Aventuras em Destaque</h2>
              <p className="max-w-[700px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Explore nossas rotas mais populares e descubra a próxima aventura perfeita para você. De trilhas leves a desafios extremos, temos opções para todos os níveis de experiência em corrida e caminhada ao ar livre.
              </p>
            </div>
            <FeaturedAdventures races={featuredRaces} />
          </div>
        </section>
        <CallToAction />
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4 mx-auto max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Sobre Nossa Comunidade</h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Nossa plataforma nasceu da paixão por corridas e trilhas na natureza. Acreditamos que cada aventura conta uma história e queremos ajudar você a viver as suas. Com mais de 1.000 rotas cadastradas e uma comunidade ativa de aventureiros, estamos construindo o maior acervo de trilhas e rotas de corrida do Brasil.
                </p>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Junte-se a milhares de entusiastas que já descobriram novas rotas, fizeram amigos e superaram seus limites conosco. Seja um corredor iniciante ou um aventureiro experiente, aqui você encontra o suporte e as ferramentas necessárias para sua próxima aventura.
                </p>
              </div>
              <div className="space-y-4 mx-auto max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Dicas para Iniciantes</h2>
                <ul className="space-y-2 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 list-disc list-inside">
                  <li>Comece com trilhas leves e vá aumentando a dificuldade gradualmente</li>
                  <li>Use calçados apropriados para o tipo de terreno</li>
                  <li>Leve água e lanches leves para repor as energias</li>
                  <li>Conheça seus limites e respeite seu corpo</li>
                  <li>Nunca vá sozinho para trilhas desconhecidas</li>
                  <li>Verifique a previsão do tempo antes de sair</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
